define({
	// IMPLEMENT: Map SFX to channels

	/* 
	 * If audio assets are named nicely you can do:
	 * {
	 *	fileName: channelNumber
	 * }
	 * 
	 * Otherwise use a nice name for the keys and include the filename and channel as an array:
	 * {
	 *	soundName: ["Ugly_sound_file_V2-final", channelNumber]
	 * }
	 */

	music: ["", 0],
	winTerminator: ["MusicTermWin", 1],
	loseTerminator: ["MusicTermLose", 1],
	click: ["Click", 4],
	costDown: ["BetDown", 1],
	costDown_1: ["BetDown", 5],
	costUp: ["BetUp", 2],
	costUp_1: ["BetUp", 6],
	bonusWin: ["BonusWin", 2],
	bonusNoWin: ["BonusNoWin", 2],
	costMax: ["BetMax", 3],

	/*
	 * Audio groups
	 * A game can include multiple variations of each of these sounds. Ensure each variation starts
	 * with the same name plus some kind of ordered suffix. Each time a sound group plays the next 
	 * item in the group will be used.
	 */
	instantWin: ["InstantWin",6],
	winningNumber: ["MatchingSymbolSelect", 1],
	winningNumber_2: ["MatchingSymbolSelect_2", 2],
	winningNumber_3: ["MatchingSymbolSelect_3", 6],
	playerNumber: ["YourNumberSelect1", 3],
	playerNumber_2: ["YourNumberSelect2", 4],
	playerNumber_3: ["YourNumberSelect3", 5],
	prizeBox: ["PrizeBox",7],
	prizeBox_2: ["PrizeBox_2",8],
	prizeBox_3: ["PrizeBox_3",9],
	match: ["Match", 1],
	bonus: ["Bonus Reveal-win",2],
	singleReveal: ["MultiRevealSound",4],

	/*
	 * Optional audio
	 * The following audio is optional and will be ignored if not included
	 */

	buy: ["YourNumberSelect2", 4],
	revealAll: ["RevealAllButton", 4],

	/*
	 * Custom
	 */
	scratch: ["scratch", 10]
});
