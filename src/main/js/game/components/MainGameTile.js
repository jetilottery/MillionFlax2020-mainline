define((require) => {
	const FittedText = require("skbJet/componentManchester/standardIW/components/fittedText");
	const TextStyles = require("skbJet/componentManchester/standardIW/textStyles");
	const PIXI = require("com/pixijs/pixi");
	const nokFormat = require("skbJet/componentLondon/utils/nokFormat");
	const utils = require("skbJet/componentManchester/standardIW/layout/utils");
	
	require("com/gsap/TweenMax");
	require("com/gsap/TimelineLite");

	const Tween = window.TweenMax;
	const Timeline = window.TimelineLite;

	//const ScratchSymbol = require("skbJet/componentLondon/customIW/components/ScratchSymbol");
	const ScratchSymbol = require("./ScratchSymbol");

	class MainGameTile extends ScratchSymbol {
		constructor() {
			let foil = new PIXI.Container();
			let foilBase = PIXI.Sprite.fromFrame("game1ScratchOffBase");
			let foilArrows = PIXI.Sprite.fromFrame("game1ScratchOffArrows");
			let foilFlash = PIXI.Sprite.fromFrame("game1ScratchOffLogo");
			foil.addChild(foilBase, foilArrows, foilFlash);
			foilBase.anchor.set(0.5);
			foilArrows.anchor.set(0.5);
			foilArrows.alpha = 0;
			foilFlash.anchor.set(0.5);
			super(143, 186, {
				background: "game1BaseLose",
				win: "game1BaseWin",
				lose: "none",
				foil: foil,
				gutter: 200
			});
			
			this.foilBase = foilBase;
			this.foilArrows = foilArrows;
			this.foilFlash = foilFlash;
			this.valueSprite = new FittedText("XXX XXX,-");
			this.valueSprite.y = -3;
			this.valueSprite.anchor.set(0.5);
			this.valueSprite.style = TextStyles.parse("prizeValueNoWin");
			this.resultContainer.addChild(this.valueSprite);

			this.winParticles = new PIXI.extras.AnimatedSprite(utils.findFrameSequence("particles").map(frame => {return PIXI.Texture.fromFrame(frame);}));
			this.winParticles.loop = false;
			this.winParticles.alpha = 0;
			this.winParticles.anchor.set(0.5);
			this.winParticles.scale.set(0.4);

			this.reset();
		}

		async scratch() {
			if(this.idleTimeline !== null) {
				this.idleTimeline.seek(this.idleTimeline.duration, false);
			}
			if(this.scratchedOnce) {
				await super.scratch();
			} else {
				return new Promise(resolve => {
					new Timeline({
						onComplete: () => {
							this._revealed = true;
							resolve();
						}, onCompleteScope: this
					})
						.fromTo(this.foilArrows, 0.5833, {alpha: 1, visible: true}, {alpha: 0, visible: false}, 0)
						.fromTo(this.foilArrows.scale, 0.5833, {x: 1, y: 1}, {x: 2, y: 2}, 0)
						.to(this.foilBase, 0.5833, {alpha: 0, visible:0}, 0)
						.to(this.resultContainer.scale, 0.5833, {x: 1, y: 1}, 0)
						.to(this.foilFlash.scale, 0.2917, {x: 0.8, y: 0.8}, 0)
						.to(this.foilFlash, 0.5, {alpha: 0, visible: 0})
						.to(this.foilFlash.scale, 0.5, {x: 2, y: 2}, 0.2917);

					this.resultContainer.visible = true;
				});
			}
		}

		populate(value) {
			this.value = value;
			this.valueSprite.text = nokFormat(value);
		}

		reset() {
			this.foilBase.alpha = 1;
			this.foilBase.visible = true;
			this.foilArrows.alpha = 0;
			this.foilArrows.visible = false;
			this.foilArrows.scale.set(1);
			this.foilFlash.alpha = 1;
			this.foilFlash.visible = true;
			this.foilFlash.scale.set(1);
			super.reset();
			this.value = -1;
			this.valueSprite.text = "XXX XXX,-";
			this.valueSprite.style = TextStyles.parse("prizeValueNoWin");
			this.win.alpha = 0;
			this.win.visible = 0;
			this.winParticles.alpha = 0;
			this.scratchedOnce = false;
		}

		match() {
			this.matched = true;
			Tween.fromTo(this.win, 0.25, {alpha: 0, visible: 0}, {alpha: 1, visible: 1});
			this.valueSprite.style = TextStyles.parse("prizeValueWin");
		}

		presentWin() {

			this.winParticles.onComplete = () => {
				this.winParticles.alpha = 0;
				this.reveal();
			};
			this.winParticles.alpha = 1;
			this.winParticles.animationSpeed = 0.5;
			this.winParticles.gotoAndPlay(0);
			return new Promise(resolve => this.reveal = resolve);
		}

		idle() {
			this.idleTimeline = new Timeline({
				onComplete: () => {
					this.idleTimeline = null;
				}
			})
				.fromTo(this.foilArrows, 0.5833, {alpha: 1, visible: true}, {alpha: 0, visible: false}, 0)
				.fromTo(this.foilArrows.scale, 0.5833, {x: 1, y: 1}, {x: 2, y: 2}, 0)
				.to(this.container, 1, { ease: this.idleWiggle, rotation: -Math.PI/8 });
		}

		static fromContainer(main, particles) {
			const tile = new MainGameTile();
			tile.container = main;
			tile.particleContainer = particles;

			main.addChild(tile.background, tile.resultContainer, tile.foil);
			particles.addChild(tile.winParticles);

			return tile;
		}
	}

	return MainGameTile;
});