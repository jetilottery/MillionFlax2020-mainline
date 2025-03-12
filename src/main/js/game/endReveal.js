define(function(require) {
	const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");
	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
	//const meterData = require('skbJet/componentManchester/standardIW/meterData');

	async function endReveal() {
		// IMPLEMENT: Wait until the game is fully revealed before continuing
		// You may need to wait for a prizetable to animate, or for the user to reveal the remaining
		// non-winning items. Before continuing the user must have seen the whole reveal and be shown
		// the final win value. Definitely don"t set win meter to meterData.totalWin, that"s cheating.
		msgBus.publish("UI.updateButtons", {
			audioOn: {visible: true, enabled: true},
			audioOff: {visible: true, enabled: true},
			info: {visible: true, enabled: true},
			left: {enabled: false},
			right: {enabled: false},
			hint: {enabled: false},
			back: {enabled: false},
			scratchAll: {enabled: false}
		});
		
		//meterData.win = meterData.totalWin; //You're not the boss of me (DEBUG)

		gameFlow.next("REVEAL_COMPLETE");
	}

	gameFlow.handle(endReveal, "END_REVEAL");
});
