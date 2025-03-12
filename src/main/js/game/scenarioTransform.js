define((require) => {
	const prizeData = require("skbJet/componentManchester/standardIW/prizeData");
	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");

	return function scenarioTransform(scenarioString) {
		msgBus.publish("Game.started", scenarioString);
		
		// example sstring: "BAFACBCIE,IBBEIE"
		let game0, game1, prizes0, prizes1;
		[game0, game1] = scenarioString.split(',').map(elem => elem.split(''));

		prizes0 = game0.map(elem => prizeData.prizeTable[elem]);
		prizes1 = game1.map(elem => prizeData.prizeTable[elem]);
		
		return {
			prizes0: prizes0,
			prizes1: prizes1
		};
	};
});
