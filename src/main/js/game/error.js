define(function(require) {
	const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");
	const revealAll = require("game/revealAll");

	function error() {
		// stop reveal all if active
		revealAll.stop();
	}

	gameFlow.handle(error, "ERROR");
});
