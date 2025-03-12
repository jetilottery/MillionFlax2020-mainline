define(function(require) {
	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
	const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");

	const ScratchSymbol = require("game/components/ScratchSymbol");
	const mainGame = require("game/components/mainGame");
	const bonusGame = require("game/components/bonusGame");
	const revealAll = require("game/revealAll");
	const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
	const resources = require("skbJet/component/resourceLoader/resourceLib");
	const displayList = require("skbJet/componentManchester/standardIW/displayList");
	const meterData = require('skbJet/componentManchester/standardIW/meterData');
	const config = require("skbJet/componentManchester/standardIW/gameConfig");

	require("com/gsap/TimelineLite");
	require("com/gsap/TweenMax");
	const Timeline = window.TimelineLite;
	const Tween = window.TweenMax;

	function intro() {
		new Timeline({
			onComplete: () => {
				displayList.brushButton.interactive = true;
				mainGame.setActive(true);
				bonusGame.setActive(true);
				ScratchSymbol.enableIdle();
				msgBus.publish("UI.updateButtons", {
					audioOn: {visible: true, enabled: true},
					audioOff: {visible: true, enabled: true},
					info: {visible: true, enabled: true},
					scratchAll: {visible: true, enabled: true},
					buy: false,
					try: false,
					left: false,
					right: false,
					back: false,
					hint: false,
					scratchAllConfirm: false,
					scratchAllCancel: false,
					playAgain: false,
					gamePips: false
				});
			}
		})
			.to(displayList.buyButton, 0.1, {alpha: 0}, 0)
			.to(displayList.tryButton, 0.1, {alpha: 0}, 0)
			.fromTo(displayList.purchase, 0.4177, {alpha: 1, ease: "Linear.easeNone"}, {alpha: 0}, 0.5833)
			.fromTo(displayList.introBigSquare, 0.4177, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 0.5833)
			.fromTo(displayList.introLogoBase, 1.0417, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 1.375)
			.fromTo(displayList.introLogoBase.scale, 1.0417, {x: 0.5, y: 0.5, ease: "Linear.easeNone"}, {x: 1, y: 1}, 1.375)
			.fromTo(displayList.introArrows, 1.0417, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 1.75)
			.fromTo(displayList.introArrows.scale, 1.0417, {x: 3, y: 3, ease: "Linear.easeNone"}, {x: 1, y: 1}, 1.75)
			.fromTo(displayList.introLogoText, 1.0417, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 1.375)
			.fromTo(displayList.introLogoText.scale, 1.0417, {x: 3, y: 3, ease: "Linear.easeNone"}, {x: 1, y: 1}, 1.375)
			.to(displayList.introBigSquare, 0.625, {alpha: 0, ease: "Linear.easeNone"}, 2.7083)
			.to(displayList.introLogoBase, 0.2917, {alpha: 0, ease: "Linear.easeNone"}, 3.6667)
			.to(displayList.introLogoBase.scale, 0.2917, {x: 0.3, y: 0.3, ease: "Linear.easeNone"}, 3.6667)
			.to(displayList.introArrows, 0.2917, {alpha: 0, ease: "Linear.easeNone"}, 3.75)
			.to(displayList.introArrows.scale, 0.2917, {x: 0.3, y: 0.3, ease: "Linear.easeNone"}, 3.75)
			.to(displayList.introLogoText, 0.2917, {alpha: 0, ease: "Linear.easeNone"}, 3.6667)
			.to(displayList.introLogoText.scale, 0.2917, {x: 0.3, y: 0.3, ease: "Linear.easeNone"}, 3.6667)
			.to(displayList.mainGame, 0, {alpha: 1, visible: true, ease: "Linear.easeNone"}, 3.6667)
			.to(displayList.bonusGame, 0, {alpha: 1, visible: true, ease: "Linear.easeNone"}, 3.6667)
			.fromTo(displayList.mainGameBG, 0.375, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 3.6667)
			.fromTo(displayList.mainGameBG.scale, 0.375, {x: 0.116, y: 1, ease: "Linear.easeNone"}, {x: 1, y: 1}, 3.6667)
			.fromTo(displayList.mainGameTile4, 0.1667, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 3.8333)
			.fromTo(displayList.mainGameTile1, 0.1667, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.0)
			.fromTo(displayList.mainGameTile3, 0.1667, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.0)
			.fromTo(displayList.mainGameTile5, 0.1667, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.0)
			.fromTo(displayList.mainGameTile7, 0.1667, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.0)
			.fromTo(displayList.mainGameTagLine, 0.4166, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.0417)
			.fromTo(displayList.mainGameTile0, 0.1667, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.1667)
			.fromTo(displayList.mainGameTile2, 0.1667, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.1667)
			.fromTo(displayList.mainGameTile6, 0.1667, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.1667)
			.fromTo(displayList.mainGameTile8, 0.1667, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.1667)
			.fromTo(displayList.bonusGameTile0, 0.2083, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.4167)
			.fromTo(displayList.bonusGameTile1, 0.2083, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.5)
			.fromTo(displayList.bonusGameTile2, 0.2083, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.5833)
			.fromTo(displayList.bonusGameTile3, 0.2083, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.6667)
			.fromTo(displayList.bonusGameTile4, 0.2083, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.75)
			.fromTo(displayList.bonusGameTile5, 0.2083, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.8333)
			.fromTo(displayList.mainGameTitle, 0.4166, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.9167)
			.fromTo(displayList.bonusGameTagLine, 0.4166, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.9167)
			.fromTo(displayList.bonusGameBG, 0.4166, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.9167)
			.fromTo(displayList.bonusGameTitle, 0.4166, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 4.9167);
	}
	msgBus.subscribe("Game.Intro", intro);

	async function startReveal() {
		// Listen for autoplay activation which triggers the remaining cards to reveal automatically
		msgBus.subscribe("Game.AutoPlayStart", revealAll.start);

		// Listen for autoplay deactivation which cancels the revealAll timeline
		msgBus.subscribe("Game.AutoPlayStop", revealAll.stop);

		msgBus.publish("Game.Intro");

		// Enable all of the winning numbers and player numbers, wait until they are all revealed
		await Promise.all([...mainGame.enable(), ...bonusGame.enable()]);
		/*if(autoPlay.enabled && gameConfig.autoPlaySingleSound) {
			msgBus.publish("singlePrizeReveal.reveal", revealAll);
			await singlePrizeReveal.complete;
		}*/

		ScratchSymbol.disableIdle();

		msgBus.publish("UI.updateButtons", {
			audioOn: {visible: true, enabled: true},
			audioOff: {visible: true, enabled: true},
			info: {visible: true, enabled: true},
			back: {enabled: false},
			scratchAll: {enabled: false}
		});
		displayList.brushButton.interactive = false;
		Tween.to(displayList.brushButton, 0.25, {alpha: 0});


		if(config.mockData) {
			meterData.win = meterData.totalWin;
		}

		gameFlow.next("REVEAL_COMPLETE");
	}

	msgBus.subscribe("MeterData.Balance", (data) => {
		displayList.balanceMeterNT.text = resources.i18n.game.Game.balanceMeter + SKBeInstant.formatCurrency(data).formattedAmount;
	});

	gameFlow.handle(startReveal, "START_REVEAL");
});
