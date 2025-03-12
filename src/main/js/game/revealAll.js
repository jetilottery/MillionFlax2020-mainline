define(require => {
	const Timeline = require("com/gsap/TimelineLite");
	const gameConfig = require("skbJet/componentManchester/standardIW/gameConfig");
	const displayList = require("skbJet/componentManchester/standardIW/displayList");
	const mainGame = require("game/components/mainGame");
	const bonusGame = require("game/components/bonusGame");
	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
	const ScratchSymbol = require("game/components/ScratchSymbol");

	let revealAllTimeline;

	function start() {
		const revealGame = mainGame.revealAll().concat(bonusGame.revealAll());

		ScratchSymbol.disableIdle();
		revealAllTimeline = new Timeline();

		// disable all interaction at the parent container level
		displayList.gameContainers.interactiveChildren = false;

		// Then the player numbers, with a delay between the winning and player numbers
		revealAllTimeline = new Timeline({
			tweens: revealGame,
			align: "sequence",
			stagger: gameConfig.autoPlayGameDelay,
		});

		msgBus.publish("UI.updateButtons", {
			info: {enabled: false}
		});

		return revealAllTimeline;
	}

	function stop() {
		// re-enable all interaction at the parent container level
		displayList.gameContainers.interactiveChildren = true;
		// kill the revealAll timeline if active
		if (revealAllTimeline) {
			revealAllTimeline.kill();
			revealAllTimeline = undefined;
		}

		ScratchSymbol.enableIdle();

		msgBus.publish("UI.updateButtons", {
			info: {enabled: true}
		});
	}

	return {
		start,
		stop,
	};
});
