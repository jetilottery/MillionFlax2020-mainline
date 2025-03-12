define({
	_BASE_APP: {
		children: ["background", "gameContainers", "purchase", "intro", "balanceMeterNT"]
	},

	/*
	 * BACKGROUND
	 */
	background: {
		type: "rectangle",
		children: ["bigSquare", "flaxLogo"],
		landscape: {
			x: 0,
			y: 0,
			width: 800,
			height: 600,
			fill: 0x005017
		},
		portrait: {
			x: 0,
			y: 0,
			width: 640,
			height: 1136,
			texture: "backdropPortrait",
			fill: 0x005017
		}
	},

	bigSquare: {
		type: "sprite",
		texture: "game2Panel",
		anchor: 0.5,
		landscape: { x: 400, y: 300 },
		portrait: { x: 320, y: 590 }
	},

	flaxLogo: {
		type: "sprite",
		texture: "flaxLogo",
		anchor: 0,
		landscape: { x: 5, y: 13, scale: 0.68 },
		portrait: { x: 12, y: 142, scale: 1 }
	},

	/*
	 * GAME CONTAINERS
	 */
	gameContainers: {
		type: "container",
		children: ["bonusGame", "mainGame"]
	},

	mainGame: {
		type: "container",
		children: [
			"mainGameBG",
			"mainGameTitle",
			"mainGameTagLine",
			"mainGameTiles"
		],
		alpha: 0,
		visible: false,
		portrait: {scale: 1},
		landscape: {scale: 0.81}
	},

	mainGameBG: {
		type: "sprite",
		texture: "game1Panel1",
		anchor: 0.5,
		landscape: {
			x: 336,
			y: 338
		},
		portrait: {
			x: 318,
			y: 484
		}
	},

	mainGameTitle: {
		type: "sprite",
		anchor: 0.5,
		landscape: {
			x: 810,
			y: 144,
			texture: "VinnInntil1MillionLandscape",
			scale: 1.235
		},
		portrait: {
			x: 317,
			y: 228,
			texture: "VinnInntil1Million_",
			scale: 1
		}
	},

	mainGameTagLine: {
		type: "sprite",
		texture: "skrapHer1",
		anchor: 0.5,
		landscape: {
			x: 40,
			y: 350
		},
		portrait: {
			x: 21,
			y: 472
		}
	},

	mainGameTiles: {
		type: "container",
		children: [
			"mainGameTile0",
			"mainGameTile1",
			"mainGameTile2",
			"mainGameTile3",
			"mainGameTile4",
			"mainGameTile5",
			"mainGameTile6",
			"mainGameTile7",
			"mainGameTile8",
			"mainGameParticles0",
			"mainGameParticles1",
			"mainGameParticles2",
			"mainGameParticles3",
			"mainGameParticles4",
			"mainGameParticles5",
			"mainGameParticles6",
			"mainGameParticles7",
			"mainGameParticles8"
		],
		portrait: { x: 0, y: 484 },
		landscape: { x: 32, y: 342 }
	},

	mainGameTile0: {
		type: "container",
		x: 126,
		y: -144,
		alpha: 0
	},
	mainGameTile1: {
		type: "container",
		x: 315,
		y: -144,
		alpha: 0
	},
	mainGameTile2: {
		type: "container",
		x: 507,
		y: -144,
		alpha: 0
	},

	mainGameTile3: {
		type: "container",
		x: 126,
		y: -2,
		alpha: 0
	},
	mainGameTile4: {
		type: "container",
		x: 315,
		y: -2,
		alpha: 0
	},
	mainGameTile5: {
		type: "container",
		x: 507,
		y: -2,
		alpha: 0
	},
	
	mainGameTile6: {
		type: "container",
		x: 126,
		y: 138,
		alpha: 0
	},
	mainGameTile7: {
		type: "container",
		x: 315,
		y: 138,
		alpha: 0
	},
	mainGameTile8: {
		type: "container",
		x: 507,
		y: 138,
		alpha: 0
	},

	mainGameParticles0: {
		type: "container",
		x: 126,
		y: -144
	},
	mainGameParticles1: {
		type: "container",
		x: 315,
		y: -144
	},
	mainGameParticles2: {
		type: "container",
		x: 507,
		y: -144
	},

	mainGameParticles3: {
		type: "container",
		x: 126,
		y: -2
	},
	mainGameParticles4: {
		type: "container",
		x: 315,
		y: -2
	},
	mainGameParticles5: {
		type: "container",
		x: 507,
		y: -2
	},

	mainGameParticles6: {
		type: "container",
		x: 126,
		y: 138
	},
	mainGameParticles7: {
		type: "container",
		x: 315,
		y: 138
	},
	mainGameParticles8: {
		type: "container",
		x: 507,
		y: 138
	},

	bonusGame: {
		type: "container",
		children: [
			"bonusGameBG",
			"bonusGameTitle",
			"bonusGameTagLine",
			"bonusGameTiles"
		],
		alpha: 0,
		visible: false
	},


	bonusGameBG: {
		type: "sprite",
		anchor: 0.5,
		landscape: {
			texture: "bonusBorderLandscape",
			x: 661,
			y: 315
		},
		portrait: {
			x: 317,
			y: 818,
			texture: "bonusBorderPortrait",
		}
	},

	bonusGameTitle: {
		type: "sprite",
		texture: "Bonus",
		anchor: 0.5,
		landscape: {
			x: 662,
			y: 211,
			alpha: 0
		},
		portrait: {
			x: 320,
			y: 732,
			alpha: 0
		}
	},

	bonusGameTagLine: {
		type: "sprite",
		texture: "skrapHer2",
		anchor: 0.5,
		landscape: {
			x: 661,
			y: 440,
			alpha: 0
		},
		portrait: {
			x: 467,
			y: 886,
			alpha: 0
		}
	},

	bonusGameTiles: {
		type: "container",
		children: [
			"bonusGameTile0",
			"bonusGameTile1",
			"bonusGameTile2",
			"bonusGameTile3",
			"bonusGameTile4",
			"bonusGameTile5",
			"bonusGameParticles0",
			"bonusGameParticles1",
			"bonusGameParticles2",
			"bonusGameParticles3",
			"bonusGameParticles4",
			"bonusGameParticles5"
		]
	},

	bonusGameTile0: {
		type: "container",
		landscape: {
			x: 594,
			y: 259,
			scale: 0.81,
			alpha: 0
		},
		portrait: {
			x: 161,
			y: 771,
			scale: 1,
			alpha: 0
		}
	},

	bonusGameTile1: {
		type: "container",
		landscape: {
			x: 725,
			y: 259,
			scale: 0.81,
			alpha: 0
		},
		portrait: {
			x: 318,
			y: 792,
			scale: 1,
			alpha: 0
		}
	},

	bonusGameTile2: {
		type: "container",
		landscape: {
			x: 594,
			y: 328,
			scale: 0.81,
			alpha: 0
		},
		portrait: {
			x: 474,
			y: 771,
			scale: 1,
			alpha: 0
		}
	},

	bonusGameTile3: {
		type: "container",
		landscape: {
			x: 725,
			y: 328,
			scale: 0.81,
			alpha: 0
		},
		portrait: {
			x: 161,
			y: 843,
			scale: 1,
			alpha: 0
		}
	},

	bonusGameTile4: {
		type: "container",
		landscape: {
			x: 594,
			y: 397,
			scale: 0.81,
			alpha: 0
		},
		portrait: {
			x: 318,
			y: 864,
			scale: 1,
			alpha: 0
		}
	},

	bonusGameTile5: {
		type: "container",
		landscape: {
			x: 725,
			y: 397,
			scale: 0.81,
			alpha: 0
		},
		portrait: {
			x: 475,
			y: 843,
			scale: 1,
			alpha: 0
		}
	},

	bonusGameParticles0: {
		type: "container",
		landscape: {
			x: 594,
			y: 259,
			scale: 0.81,
			alpha: 0
		},
		portrait: {
			x: 161,
			y: 771,
			scale: 1,
			alpha: 0
		}
	},

	bonusGameParticles1: {
		type: "container",
		landscape: {
			x: 725,
			y: 259,
			scale: 0.81
		},
		portrait: {
			x: 318,
			y: 792,
			scale: 1
		}
	},

	bonusGameParticles2: {
		type: "container",
		landscape: {
			x: 594,
			y: 328,
			scale: 0.81
		},
		portrait: {
			x: 474,
			y: 771,
			scale: 1
		}
	},

	bonusGameParticles3: {
		type: "container",
		landscape: {
			x: 725,
			y: 328,
			scale: 0.81
		},
		portrait: {
			x: 161,
			y: 843,
			scale: 1
		}
	},

	bonusGameParticles4: {
		type: "container",
		landscape: {
			x: 594,
			y: 397,
			scale: 0.81
		},
		portrait: {
			x: 318,
			y: 864,
			scale: 1
		}
	},

	bonusGameParticles5: {
		type: "container",
		landscape: {
			x: 725,
			y: 397,
			scale: 0.81
		},
		portrait: {
			x: 475,
			y: 843,
			scale: 1
		}
	},

	/*
	 * PURCHASE SCREEN
	 */
	purchase: {
		type: "container",
		children: ["purchaseCard", "priceTag"]
	},

	purchaseCard: {
		type: "sprite",
		anchor: 0.5,
		landscape: {
			texture: "purchaseGameLandscape",
			x: 406,
			y: 248
		},
		portrait: {
			texture: "purchaseGamePortrait",
			x: 318,
			y: 565
		}
	},

	priceTag: {
		type: "sprite",
		anchor: 0.5,
		texture: "priceDiamond",
		children: ["ticketPrice"],
		landscape: {
			x: 223,
			y: 380
		},
		portrait: {
			x: 159,
			y: 789
		}
	},
	
	ticketPrice: {
		type: "text",
		string: "ticketCost",
		style: "ticketPriceStyle",
		anchor: 0.5,
		x: 0,
		y: -4,
		tint: 0xffffff,
		maxWidth: 100
	},

	brushButton: {
		type: "button",
		landscape: {
			x: 547,
			y: 37
		},
		portrait: {
			x: 0,
			y: -100
		},
		textures: {
			enabled:    "brushButtonEnabled",
			over:       "brushButtonOver",
			pressed:    "brushButtonPressed",
			disabled:   "brushButtonEnabled"
		},
		children: ["menu", "selected"]
	},
	menu: {
		type: "sprite",
		texture: "brushMenu",
		anchor: {
			x: 0.5,
			y: 0
		},
		x: 0,
		y: -26,
		children: ["coinButton", "keyButton", "wandButton"]
	},
	coinButton: {
		type: "button",
		x: 0,
		y: 69,
		anchor: 0.5,
		textures: {
			enabled:    "brushMenuSelector",
			over:       "brushMenuSelectorOver",
			pressed:    "brushMenuSelectorPressed",
			disabled:   "brushMenuSelector"
		},
		children: ["coin"]
	},
	coin: {
		type: "sprite",
		texture: "coin",
		x: -34,
		y: -20
	},
	keyButton: {
		type: "button",
		x: 0,
		y: 118,
		anchor: 0.5,
		textures: {
			enabled:    "brushMenuSelector",
			over:       "brushMenuSelectorOver",
			pressed:    "brushMenuSelectorPressed",
			disabled:   "brushMenuSelector"
		},
		children: ["key"]
	},
	key: {
		type: "sprite",
		texture: "key",
		x: -34,
		y: -20
	},
	wandButton: {
		type: "button",
		x: 0,
		y: 164,
		anchor: 0.5,
		textures: {
			enabled:    "brushMenuSelectorBottom",
			over:       "brushMenuSelectorBottomOver",
			pressed:    "brushMenuSelectorBottomPressed",
			disabled:   "brushMenuSelectorBottom"
		},
		children: ["wand"]
	},
	wand: {
		type: "sprite",
		texture: "wand",
		x: -34,
		y: -21
	},
	selected: {
		name: "selected",
		type: "sprite",
		x: -15,
		y: -2,
		anchor: 0.5,
		texture: "coin"
	},
	/*
	 * INTRO ASSETS
	 */
	intro: {
		type: "container",
		children: ["introBigSquare", "introLogoBase", "introArrows", "introLogoText"]
	},
	introBigSquare: {
		type: "sprite",
		texture: "largeLogoBaseGrey",
		anchor: 0.5,
		landscape: { x: 400, y: 300, alpha: 0 },
		portrait: { x: 320, y: 590, alpha: 0 }
	},
	introLogoBase: {
		type: "sprite",
		texture: "largeLogoBase",
		anchor: 0.5,
		landscape: { x: 400, y: 300, alpha: 0 },
		portrait: { x: 320, y: 590, alpha: 0 }
	},
	introArrows: {
		type: "sprite",
		texture: "popUpWinArrows",
		anchor: 0.5,
		landscape: { x: 400, y: 300, alpha: 0 },
		portrait: { x: 320, y: 590, alpha: 0 }
	},
	introLogoText: {
		type: "sprite",
		texture: "largeLogoText",
		anchor: 0.5,
		landscape: { x: 400, y: 300, alpha: 0 },
		portrait: { x: 320, y: 590, alpha: 0 }
	},

	/*
	 * BALANCE
	 */
	balanceMeterNT: {
		type: "text",
		style: "balanceMeterStyle",
		string: "",
		anchor: { x: 1, y: 0 },
		landscape: { x: 794, y: 12, maxWidth: 200 },
		portrait: { x: 634, y: 144, maxWidth: 380 }
	},


	/*
	 * ERROR
	 */
	errorContainer: {
		type: "container",
		children: [
			"errorOverlay",
			"errorBackground",
			"errorTitle",
			"errorMessage",
			"errorExit",
			"timeoutExit",
			"timeoutContinue"
		],
	},
	errorOverlay: {
		type: "rectangle",
		fillAlpha: 0.5,
		fill: 0x000000,
		anchor: 0,
		x: 0,
		y: 0,
		landscape: {
			width: 800,
			height: 600,
		},
		portrait: {
			width: 640,
			height: 1136,
		}
	},
	errorBackground: {
		type: "rectangle",
		fill: 0xBBBBBB,
		lineWidth: 2,
		lineColor: 0x000000,
		radius: 4,
		landscape: {
			x: 50,
			y: 80,
			width: 700,
			height: 400
		},
		portrait: {
			x: 30,
			y: 234,
			width: 580,
			height: 700
		}
	},
	errorTitle: {
		type: "text",
		style: "messageText",
		anchor: 0.5,
		x: 0,
		y: -300
	},
	errorMessage: {
		type: "text",
		style: "messageText",
		anchor: 0.5,
		wordWrap: true,
		landscape: { x: 400, y: 260, wordWrapWidth: 650 },
		portrait: { x: 320, y: 528, wordWrapWidth: 500 }
	},
	errorExit: {
		type: "button",
		string: "button_exit",
		landscape: { x: 400, y: 480, scale: 0.8 },
		portrait: { x: 320, y: 934 },
		style: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		},
		textures: {
			enabled: "buttonBaseUp",
			over: "buttonBaseOver",
			pressed: "buttonBaseDown",
			disabled: "buttonBaseDisabled"
		}
	},
	timeoutExit: {
		type: "button",
		string: "button_exit",
		landscape: { x: 503, y: 480, scale: 0.8 },
		portrait: { x: 450, y: 934 },
		style: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		},
		textures: {
			enabled: "buttonBaseUp",
			over: "buttonBaseOver",
			pressed: "buttonBaseDown",
			disabled: "buttonBaseDisabled"
		}
	},
	timeoutContinue: {
		type: "button",
		string: "button_continue",
		landscape: { x: 297, y: 480, scale: 0.8 },
		portrait: { x: 190, y: 934 },
		style: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		},
		textures: {
			enabled: "buttonBaseUp",
			over: "buttonBaseOver",
			pressed: "buttonBaseDown",
			disabled: "buttonBaseDisabled"
		}
	}
});
