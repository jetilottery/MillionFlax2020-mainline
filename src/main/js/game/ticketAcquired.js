define((require) => {
	const scenarioData = require("skbJet/componentManchester/standardIW/scenarioData");
	const config = require("skbJet/componentManchester/standardIW/gameConfig");

	let scenarioCounter = 0;
	let debugData = [{
		scenario: {
			prizes0: [
				1000000,
				100000,
				10000,
				10000,
				10000,
				40000,
				50000,
				60000,
				70000
			],
			prizes1: [
				100000,
				10000,
				2000,
				3300,
				4000,
				5000
			],
			win: 10000
		}
	}, {
		scenario: {
			prizes0: [
				1000000,
				100000,
				10000,
				20000,
				1000000,
				40000,
				50000,
				1000000,
				70000
			],
			prizes1: [
				100000,
				2000,
				2000,
				2000,
				4000,
				5000
			],
			win: 1002000
		}
	}, {
		scenario: {
			prizes0: [
				1000000,
				100000,
				10000,
				20000,
				30000,
				40000,
				50000,
				60000,
				70000
			],
			prizes1: [
				100000,
				2000,
				1000,
				2000,
				4000,
				5000
			],
			win: 0
		}
	}];

	const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");
	const audio = require("skbJet/componentManchester/standardIW/audio");
	const mainGame = require("game/components/mainGame");
	const bonusGame = require("game/components/bonusGame");

	function ticketAcquired() {
		if(config.mockData) {
			scenarioCounter %= debugData.length;
			mainGame.populate(debugData[scenarioCounter].scenario.prizes0);
			bonusGame.populate(debugData[scenarioCounter].scenario.prizes1);
			window.fakeMeterWin = debugData[scenarioCounter].scenario.win;
			scenarioCounter++;
		} else {
			mainGame.populate(scenarioData.scenario.prizes0);
			bonusGame.populate(scenarioData.scenario.prizes1);
		}

		if (!audio.isPlaying("music")) {
			audio.fadeIn("music", 0.5, true);
		}
		
		gameFlow.next("START_REVEAL");
	}

	gameFlow.handle(ticketAcquired, "TICKET_ACQUIRED");
});
