define(function (require) {
	const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");
	const meterData = require("skbJet/componentManchester/standardIW/meterData");
	const audio = require("skbJet/componentManchester/standardIW/audio");
	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
	
	function resultScreen() {
		msgBus.publish("Game.ShowResult");

		audio.stop("music");

		if (meterData.totalWin > 0) {
			// Play win terminator
			audio.crossFade("winTerminator", "music", 0.5, false);
		} else {
			// Play lose terminator
			audio.crossFade("loseTerminator", "music", 0.5, false);
		}
	}

	gameFlow.handle(resultScreen, "RESULT_SCREEN");
});
