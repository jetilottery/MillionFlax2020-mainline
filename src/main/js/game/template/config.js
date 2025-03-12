define({
	/* Default scratch options
	 * You probably don't want to change these unless you have a good reason
	 */
	//percentage of rectangles that must be collided with before the tile counts as scratched
	scratchMaskScratchedThreshold: 0.8,
	//scratch collision rectangle dimensions
	scratchRectWidth: 10,
	scratchRectHeight: 10,
	//minimum average opacity of an unscratched scratchRect for it to count as opaque (used when initialising the mask)
	scratchRectOpacityThreshold: 0.3,
	//distance between interpolated scratch points
	scratchLerpDist: 10,

	/**
	 * Game specific timings
	 */
	foilFlashDuration: 0.3,
	bigWinLevel1: 500000,
	scratchDuration: 0.6,

	/**
	 * NT scratch configs
	 */
	autoScratchDuration: 0.5,

	//use mock data instead of the scenario from RGS
	mockData: false,

	/*
	 * Game configuration options
	 * Anything defined here could be overwritten either based on the channel in
	 * assetPacks/CHANNEL/layout/gameConfig.js or at an operator level by gameConfig.json in i18n
	 */

	//Whether or not to have the scratch all confirmation dialogue (generally only used by multigames)
	skipScratchAllConfirmation: true,

	// The scale and bounciness of the number match tween
	matchAnimAmplitude: 4,
	matchAnimPeriod: 0.5,
	// Should the HowToPlay screen show when the game loads
	showHowToPlayOnLoad: false,
	// Use AutoPlay with toggle start/stop rather than single use RevealAll
	toggleAutoPlay: false,
	// Time between each number being revealed in autoplay. 0 for instant reaveal.
	autoPlayPlayerNumberInterval: 0.2,
	//delay between the last symbol and the prize in auto play
	autoPlayPrizeDelay: 0.1,

	// Time between the revealing the winning numbers section and the player numbers section
	autoPlayGameDelay: 0.1,

	autoPlayRowDelay : 0.2,

	autoPlaySingleSound:true,
	// Time between idle animations
	idleTimerValue: 5,

	idleFrequencyValue: 1,

	idleVariance: 0.2,

	resultMusicFadeOutDuration: 0,
	// Time between entering the result screen and the terminator audio starting
	resultTerminatorFadeInDelay: 0,
	// Time over which the terminator audio will fade in
	resultTerminatorFadeInDuration: 0.5,
	// Should the Result screen show when ticket is complete
	showResultScreen: true
});
