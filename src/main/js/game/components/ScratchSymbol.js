define(require => {
	const PIXI = require("com/pixijs/pixi");
	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
	const app = require("skbJet/componentManchester/standardIW/app");
	const ScratchMask = require("./ScratchMask");
	const maths = require("skbJet/componentLondon/utils/maths");
	const autoPlay = require("skbJet/componentManchester/standardIW/autoPlay");
	const config = require("skbJet/componentManchester/standardIW/gameConfig");
	const audio = require("skbJet/componentManchester/standardIW/audio");

	require("com/gsap/TweenMax");
	require("com/gsap/TimelineLite");
	require("com/gsap/easing/CustomEase");

	const Tween = window.TweenMax;
	const Timeline = window.TimelineLite;
	const Ease = window.CustomEase;

	const filterStyles = require("game/template/filterStyles");

	class ScratchSymbol {
		constructor(WIDTH = 128, HEIGHT = 128, {
			background = "PH_BG",
			win = "PH_WIN",
			lose = "PH_LOSE",
			foil = "PH_FOIL",
			idleFilter = filterStyles.idleAll,
			gutter = 0
		}) {
			/*
			 * STATIC
			 */
			ScratchSymbol.symbols = ScratchSymbol.symbols || [];
			ScratchSymbol.idleTween = ScratchSymbol.idleTween ||
				Tween.to({}, config.idleTimerValue, {
					onComplete: ScratchSymbol.idleRandom,
					paused: true
				});
			ScratchSymbol.minScratchTimer = new Date().getTime();
			ScratchSymbol.idleEnabled = true;
			/*
			 * INSTANCE
			 */
			ScratchSymbol.symbols.push(this);
			this.WIDTH = WIDTH;
			this.HEIGHT = HEIGHT;
			this.idleFilter = idleFilter;

			// Create all the empty sprites
			if(background !== "none") {
				this.background = PIXI.Sprite.fromFrame(background);
			} else {
				this.background = new PIXI.Sprite();
			}
			if(win !== "none") {
				this.win = PIXI.Sprite.fromFrame(win);
			} else {
				this.win = new PIXI.Sprite();
			}
			if(lose !== "none") {
				this.lose = PIXI.Sprite.fromFrame(lose);
			} else {
				this.lose = new PIXI.Sprite();
			}
			if(typeof foil === "object") {
				this.foil = foil;
			} else if(foil !== "none") {
				this.foil = PIXI.Sprite.fromFrame(foil);
			} else {
				this.foil = new PIXI.Sprite();
			}
			this.gutter = gutter;
			this.antiFoilTex = PIXI.RenderTexture.create(this.foil.width + this.gutter, this.foil.height + this.gutter);
			this.antiFoil = new PIXI.Sprite(this.antiFoilTex);
			this.scratchMask = null;
			this.scratchedOnce = false;

			// Center everything
			this.background.anchor.set(0.5);
			this.win.anchor.set(0.5);
			this.lose.anchor.set(0.5);
			if(this.foil.anchor) {
				this.foil.anchor.set(0.5);
			}
			this.antiFoil.anchor.set(0.5);

			// Add all the result elements to a container
			this.resultContainer = new PIXI.Container();
			this.resultContainer.addChild(this.win, this.lose);
			this.resultContainer.visible = false;
			this.resultContainer.name = "resultContainer";

			//Idle
			this.idleTimeline = null;
			this.idleWiggle = Ease.create("custom", "M0,0 C0,0.03 0.053,0.156 0.1,0.126 0.172,0.078 0.115,-0.081 0.2,-0.1 0.273,-0.118 0.231,0.094 0.304,0.116 0.362,0.133 0.343,-0.05 0.4,-0.072 0.441,-0.089 0.455,0.046 0.5,0.05 0.541,0.052 0.56,-0.026 0.6,-0.04 0.627,-0.051 0.671,0 0.7,0 0.778,0 0.958,0 1,0");

			// State
			this._revealed = false;
			this._active = false;
			this._fRect = this.foil.getBounds();
			this._beingScratched = false;
			this._scratchDuration = config.scratchDuration !== undefined ? config.scratchDuration : 0.3;

			msgBus.subscribe("Game.Scratch", this.scratchFoil.bind(this));
			msgBus.subscribe("Game.Change", this.hideResult.bind(this));
			msgBus.subscribe("UI.GameReady", this.showResult.bind(this));

			function endScratch() {
				if(audio.isPlaying("scratch")) {
					audio.stop("scratch");
				}
				this._beingScratched = false;
			}
			msgBus.subscribe("Game.endScratch", endScratch);
		}
		/*
		 * STATIC
		 */

		static idleRandom() {
			let unrevealed = ScratchSymbol.symbols.filter(symbol => !symbol._revealed);
			if(unrevealed.length) {
				unrevealed[Math.floor(Math.random() * unrevealed.length)].idle();
			}
			if(ScratchSymbol.idleEnabled) {
				ScratchSymbol.idleTween.play(0);
			}
		}
		static cancelIdle() {
			ScratchSymbol.idleTween.play(0);
		}
		static enableIdle() {
			ScratchSymbol.idleTween.play(0);
			ScratchSymbol.idleEnabled = true;
			app.stage.on("pointerdown", ScratchSymbol.cancelIdle);
		}
		static disableIdle() {
			app.stage.off(ScratchSymbol.cancelIdle);
			ScratchSymbol.idleEnabled = false;
			ScratchSymbol.idleTween.seek(ScratchSymbol.idleTween.duration(), false);
		}

		/*
		 * INSTANCE
		 */
		idle() {
			this.idleTimeline = new Timeline({
				onComplete: () => {
					this.idleTimeline = null;
				}
			})
				.to(this.container, 1, { ease: this.idleWiggle, rotation: -Math.PI/8 });
		}

		hideResult() {
			if(!this._revealed) {
				this.resultContainer.visible = false;
			}
		}

		showResult() {
			this.resultContainer.visible = true;
		}

		//sets foil size and rotation, also clears the scratches
		clearScratches() {
			if(!this.foil.parent) {
				return;
			}

			//Size antifoil to cover whole foil (accounting for rotation of the tile)
			let b = maths.rotatedBounds(this.foil.getLocalBounds(), this.foil.parent.rotation, 10);
			this.antiFoilTex.resize(b.width + this.gutter, b.height + this.gutter);

			//Fill with white alpha 1
			let g = new PIXI.Graphics();
			g.beginFill(0xFFFFFF, 1);
			g.drawRect(0, 0, this.antiFoilTex.width, this.antiFoilTex.height);
			app.renderer.render(g, this.antiFoilTex);

			this.foil.mask = this.antiFoil;
			this.foil.parent.addChild(this.antiFoil);
			this._fRect = this.foil.getBounds();
		}

		enable() {
			return new Promise(resolve => {
				this.reveal = resolve;
				this.foil.interactive = true;
			});
		}

		populate() {
			//Override in child
		}

		disable() {
			this.foil.interactive = false;
			this.reveal = undefined;
		}

		reset() {
			this.foil.interactive = false;
			this.foil.visible = true;
			this.foil.alpha = 1;
			this.clearScratches();
			this.lose.visible = false;
			this.win.visible = false;
			this.resultContainer.visible = false;
			this._revealed = false;
			this.matched = false;
			this.number = undefined;
			this.scratchMask = null;
			this.scratchedOnce = false;
		}

		get active() {
			return this._active;
		}

		set active(val) {
			this._active = val;
			if(val) {
				if(this.scratchMask === null) {
					this.scratchMask = new ScratchMask(this.foil);
				}
				this.clearScratches();
				if(this.resultContainer.width + 10 > this.foil.width || this.resultContainer.height + 10 > this.foil.height) {
					this.resultContainer.scale.set(this.foil.width / (this.resultContainer.width + 10));
				}
			}
			msgBus.publish("Game.TileActive", this);
		}

		get scratchDuration() {
			return this._scratchDuration;
		}

		set scratchDuration(val) {
			this._scratchDuration = val;
		}

		static get anyBeingScratched() {
			for(let i = 0; i < ScratchSymbol.symbols.length; i++) {
				if(ScratchSymbol.symbols[i]._beingScratched) {
					return true;
				}
			}
			return false;
		}

		scratchFoil(data) {
			if(data.force || (this._active && !this._revealed && !autoPlay._enabled)) {
				if(data.type === "reveal") {
					for(let i = 0; i < data.points.length; i++) {
						if(this.scratchMask.containsPoint(data.points[i])) {
							this.scratchMask.scratched = true;
						}
					}
				} else {
					let d = new Date();
					this._beingScratched = false;
					for(let i = 0; i < data.points.length; i++) {
						let bRect = new PIXI.Rectangle(
							data.points[i].x - (data.brushSprite.width / 2),
							data.points[i].y - (data.brushSprite.height / 2),
							data.brushSprite.width,
							data.brushSprite.height
						);
						if(ScratchMask.collidesWith(bRect, this._fRect)) {
							this.scratchedOnce = true;
							if(this.scratchMask.collisionRects(bRect).length) {
								this._beingScratched = true;
								ScratchSymbol.minScratchTimer = d.getTime();
							}
							this.resultContainer.visible = true;
							let wt = this.antiFoil.worldTransform;
							let p = wt.applyInverse(data.points[i]);
							data.brushSprite.x = p.x + this.antiFoil.width / 2;
							data.brushSprite.y = p.y + this.antiFoil.height / 2;
							data.brushSprite.scale.set(1/wt.a, 1/wt.d);
							app.renderer.render(data.brushSprite, this.antiFoilTex, false, false, false);
							data.brushSprite.scale.set(1);
						}
					}
					if(!audio.isPlaying("scratch")) {
						audio.play("scratch");
					} else if(!ScratchSymbol.anyBeingScratched && (d.getTime() - ScratchSymbol.minScratchTimer > 500)) {
						audio.stop("scratch");
					}
				}

				if(this.scratchMask.scratched) {
					this.reveal();
					if(audio.isPlaying("scratch")) {
						audio.stop("scratch");
					}
				}
			}
		}

		async scratch() {
			return new Promise(resolve => {
				let brushSprite = new PIXI.Sprite.fromFrame("wipeBrush");
				let gp = this.foil.getGlobalPosition();
				let brushPos = {x: gp.x + (this.foil.width / 2) + brushSprite.width, y: gp.y};
				let brushPosPrev = {x: brushPos.x, y: brushPos.y};
				brushSprite.anchor.set(0.5);
				brushSprite.position.set(brushPos.x, brushPos.y);
				app.stage.addChildAt(brushSprite);

				Tween.to(brushPos, this.scratchDuration, {
					x: -(this.foil.width / 2) - brushSprite.width,
					onUpdate: function () {
						let dist =  maths.pointDistance(brushPosPrev, brushPos);
						let points = [];
						for(let i = 0; i < dist; i += 10) {
							points.push(maths.lerp(brushPosPrev, brushPos, (i / dist)));
						}
						this.scratchFoil({
							brushSprite: brushSprite,
							type: "scratch",
							points: points,
							force: true
						});
						brushPosPrev.x = brushPos.x;
						brushPosPrev.y = brushPos.y;
					},
					onUpdateScope: this,
					onComplete: function() {
						this._revealed = true;
						resolve();
					},
					onCompleteScope: this
				});
				Tween.to(this.resultContainer.scale, this.scratchDuration, {x: 1, y: 1});

				this.resultContainer.visible = true;
			});
		}

		match() {
			this.matched = true;
			this.win.visible = true;
			this.lose.visible = false;
		}

		presentWin() {
			return new Promise(resolve => Tween.fromTo(
				this.resultContainer.scale,
				0.5,
				{
					x: 0.666,
					y: 0.666
				},
				{
					x: 1,
					y: 1,
					ease: window.Elastic.easeOut.config(2, 0.75),
					onComplete: resolve
				}
			));
		}
	}

	return ScratchSymbol;
});
