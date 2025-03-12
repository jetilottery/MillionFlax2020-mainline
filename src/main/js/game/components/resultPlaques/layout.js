define({
    _BASE_RESULTPLAQUES: {
        children: ["resultPlaques"]
    },
    /*
     * INTRO
     */
    resultPlaques: {
        type: "rectangle",
        children: ["winPlaque", "losePlaque", "viewResultButton", "okButton"],
        x: 0,
        y: 0,
        width: 1024,
        height: 1136,
        fill: 0x000000,
        fillAlpha: 0.8
    },
        /*
         * Win
         */
        winPlaque: {
            type: "container",
            portrait: {
                x: 0,
                y: 0
            },
            landscape: {
                x: 0,
                y: 0
            },
            children: ["burst2", "burst3", "winPopUp"]
        },
            burst2: {
                type: "sprite",
				portrait: {
					x: 320,
					y: 568
				},
				landscape: {
					x: 400,
					y: 300
				},
                anchor: 0.5,
                texture: "burst2"
            },
			burst3: {
				type: "sprite",
				portrait: {
					x: 320,
					y: 568
				},
				landscape: {
					x: 400,
					y: 300
				},
				anchor: 0.5,
				texture: "burst2"
			},
            winPopUp: {
                type: "sprite",
				portrait: {
					x: 321,
					y: 510
				},
				landscape: {
					x: 400,
					y: 262,
				},
                anchor: 0.5,
                texture: "popUpWinPanel",
                children: ["popUpWinText", "popUpWinArrows", "popUpBigWin", "prizeRP"]
            },
				popUpWinArrows: {
					type: "sprite",
					texture: "popUpWinArrows",
					anchor: 0.5,
					x: 9,
					y: 10
				},
				popUpBigWin: {
					type: "container",
					x: 0,
					y: 0
				},
				popUpWinText: {
                    type: "sprite",
                    texture: "popUpWinText",
                    anchor: 0.5,
                    x: 0,
                    y: -45
                },
                prizeRP: {
                    type: "container",
                    x: 0,
                    y: 110
                },
        losePlaque: {
            type: "container",
            children: ["losePopUp"]
        },
            losePopUp: {
                type: "sprite",
                portrait: {
					x: 324,
					y: 514
				},
				landscape: {
					x: 404,
					y: 264
				},
                anchor: 0.5,
                texture: "popUpLosePanel",
                children: ["popUpLoseText"]
            },
				popUpLoseText: {
					type: "sprite",
					texture: "popUpLoseText",
					anchor: 0.5,
					x: -5,
					y: -6
				},
        viewResultButton: {
            type:           "button",
            portrait: {
                x:          226,
                y:          713,
                scale:		0.9
            },
            landscape: {
                x:          335,
                y:          514,
                scale:      0.67
            },
            string:         "button_viewResult",
            textures: {
                enabled:    "buttonBaseUp",
                over:       "buttonBaseOver",
                pressed:    "buttonBaseDown",
                disabled:   "buttonBaseDisabled"
            },
            style: {
                enabled:    "mainButtonEnabled",
                over:       "mainButtonOver",
                pressed:    "mainButtonPressed",
                disabled:   "mainButtonDisabled"
            }
        },
        okButton: {
            type:           "button",
            portrait: {
                x:          420,
                y:          713,
                scale: 		0.9
            },
            landscape: {
                x:          473,
                y:          513,
                scale:      0.67
            },
            string:         "button_ok",
            textures: {
                enabled:    "buttonBaseUp",
                over:       "buttonBaseOver",
                pressed:    "buttonBaseDown",
                disabled:   "buttonBaseDisabled"
            },
            style: {
                enabled:    "mainButtonEnabled",
                over:       "mainButtonOver",
                pressed:    "mainButtonPressed",
                disabled:   "mainButtonDisabled"
            }
        }
});