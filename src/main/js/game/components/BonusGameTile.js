define((require) => {
    const FittedText = require("skbJet/componentManchester/standardIW/components/fittedText");
    const TextStyles = require("skbJet/componentManchester/standardIW/textStyles");
    const PIXI = require("com/pixijs/pixi");
    const nokFormat = require("skbJet/componentLondon/utils/nokFormat");
	const utils = require("skbJet/componentManchester/standardIW/layout/utils");

	require("com/gsap/TweenMax");

	const Tween = window.TweenMax;

    //const ScratchSymbol = require("skbJet/componentLondon/customIW/components/ScratchSymbol");
    const ScratchSymbol = require("./ScratchSymbol");

    class BonusGameTile extends ScratchSymbol {
        constructor() {
			let foil = new PIXI.Container();
			let foilBase = PIXI.Sprite.fromFrame("game2ScratchOffBase");
			foilBase.anchor.set(0.5);
			foil.addChild(foilBase);
            super(152, 64, {
                background: "game2BaseLose",
                win: "game2BaseWin",
                lose: "none",
                foil: foil
			});

            this.valueSprite = new FittedText("XXX XXX,-");
            this.valueSprite.anchor.set(0.5);
			this.valueSprite.y = -3;
            this.valueSprite.style = TextStyles.parse("bonusPrizeValueNoWin");
            this.resultContainer.addChild(this.valueSprite);

			this.winParticles = new PIXI.extras.AnimatedSprite(utils.findFrameSequence("particles").map(frame => {return PIXI.Texture.fromFrame(frame);}));
			this.winParticles.loop = false;
			this.winParticles.alpha = 0;
			this.winParticles.anchor.set(0.5);
			this.winParticles.scale.set(0.35);

			this.reset();
        }

        populate(value) {
            this.value = value;
            this.valueSprite.text = nokFormat(value);
        }

        reset() {
            super.reset();
            this.value = -1;
            this.valueSprite.text = "XXX XXX,-";
            this.valueSprite.style = TextStyles.parse("bonusPrizeValueNoWin");
            this.win.alpha = 0;
            this.win.visible = 0;
			this.winParticles.alpha = 0;
		}

        match() {
            this.matched = true;
            Tween.fromTo(this.win, 0.25, {alpha: 0, visible: 0}, {alpha: 1, visible: 1});
            this.valueSprite.style = TextStyles.parse("bonusPrizeValueWin");
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

		static fromContainer(main, particles) {
			const tile = new BonusGameTile();
			tile.container = main;
			tile.particleContainer = particles;

			main.addChild(tile.background, tile.resultContainer, tile.foil);
			particles.addChild(tile.winParticles);

			return tile;
		}
    }

    return BonusGameTile;
});