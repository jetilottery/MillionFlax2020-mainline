define({
    _BASE_INFO: {
        children: ["infoBase"]
    },
    infoBase: {
        type: "container",
        children: ["bgInfo", "scrollBar", "titleBar"]
    },

    /*
     * Background
     */
    titleBar: {
        type: "rectangle",
        children: ["titleBarTitle", "infoCloseButton"],
        fillAlpha: 1,
        fill: 0xb3ddc7,
        landscape: { width: 800 },
        portrait: { width: 640 },
        height: 50
    },
        titleBarTitle: {
            type: "text",
            style: "infoTitle",
            anchor: 0.5,
            landscape: { x: 400 },
            portrait: { x: 320 },
            y: 25,
            string: "infoTitle"
        },
        infoCloseButton: {
            type: "button",
            landscape:      { x: 775 },
            portrait:       { x: 615 },
            y: 25,
            textures: {
                enabled:    "infoClose",
                over:       "infoClose",
                pressed:    "infoClose",
                disabled:   "infoClose"
            }
        },
    scrollBar: {
        type: "rectangle",
        children: ["scrollPosition"],
        fillAlpha: 0.3,
        fill: 0xAAAAAA,
        landscape: {
            x: 785,
            width: 15,
            height: 550
        },
        portrait: {
            x: 625,
            width: 15,
            height: 1086
        },
        y: 50
    },
        scrollPosition: {
            type: "rectangle",
            fillAlpha: 0.3,
            fill: 0xAAAAAA,
            x: 0,
            y: 0,
            width: 15,
            height: 40
        },



	bgInfo: {
        type: "rectangle",
        children: ["bgInfo0", "bgInfo1"],
        fillAlpha: 1,
        fill: 0x91d2af,
        landscape: {
            width: 800,
            height: 600
        },
        portrait: {
            width: 640,
            height: 1136
        },
        x: 0,
        y: 0
    },

	bgInfo0: {
		type: "sprite",
		texture: "game2Panel",
		anchor: 0.5,
		landscape: { x: 400, y: 300 },
		portrait: { x: 320, y: 590 }
	},

	bgInfo1: {
		type: "container",
		children: ["gameVersion", "helpTitle", "help", "payTableTitle", "payTable", "oddsLabel0", "oddsLabel1", "oddsLabel2"]
	},
		gameVersion: {
			type: "text",
			style: "versionText",
				landscape: {
				x: 0,
				y: 51
			},
			portrait: {
				x: 0,
				y: 51
			},
			maxWidth: 60,
			alpha: 0.3
		},
        helpTitle: {
            type: "container",
            children: ["helpTitleIcon", "helpTitleText"],
            landscape:  { x: 280 },
            portrait:    { x: 205 },
            y: 75
        },
            helpTitleIcon: {
                type: "sprite",
                x: 0,
                y: 0,
                texture: "menu"
            },
            helpTitleText: {
                type: "text",
                style: "infoSubTitle",
                x: 55,
                y: 4,
                string: "helpTitle0"
            },
        help: {
            type: "rectangle",
            children: ["helpTitle0", "help0", "helpTitle1", "help1"],
            fillAlpha: 0.3,
            fill: 0x000000,
            lineWidth: 4,
            lineColor: 0xFFFFFF,
            radius: 6,
            landscape: {
                width: 764,
                height: 650
            },
            portrait: {
                width: 604,
                height: 600
            },
            x: 18,
            y: 143
        },
            helpTitle0: {
                type: "text",
                style: "helpHeader",
                x: 18,
                y: 24,
                string: ""
            },
			help0: {
				type: "text",
				style: "helpText",
				x: 18,
				y: 68,
				wordWrap: true,
				landscape: {
					string: "help0_landscape",
					wordWrapWidth: 728
				},
				portrait: {
					string: "help0_portrait",
					wordWrapWidth: 568
				}
			},
            helpTitle1: {
                type: "text",
                style: "helpHeader",
                landscape: {
					x: 18,
					y: 296
				},
                portrait: {
					x: 18,
					y: 290
				},
                string: "helpTitle1"
            },
            help1: {
                type: "text",
                style: "helpText",
                wordWrap: true,
                landscape: {
					x: 18,
                    y: 390,
                    wordWrapWidth: 728,
                    string: "help1_landscape"
                },
                portrait: {
					x: 18,
                    y: 380,
                    wordWrapWidth: 568,
                    string: "help1_portrait"
                }
            },
        payTableTitle: {
            type: "container",
            children: ["payTableTitleIcon", "payTableTitleText"],
            landscape:  { x: 270, y: 840},
            portrait:    { x: 195, y: 790}
        },
            payTableTitleIcon: {
                type: "sprite",
                x: 0,
                y: 0,
                texture: "cup"
            },
            payTableTitleText: {
                type: "text",
                style: "infoSubTitle",
                x: 55,
                y: 4,
                string: "payTableTitle"
            },
        payTable: {
            type: "rectangle",
            children: [
                "payTableBar0",
                "payTableBar1",
                "payTableBar2",
                "payTableBar3",
                "payTableBar4",
                "payTableBar5",
                "payTableVerticalBar",
                "payTableTitle0",
                "payTableTitle1",
                "payTableP0",
                "payTableP1",
                "payTableP2",
                "payTableP3",
                "payTableP4",
                "payTableP5",
                "payTableP6",
                "payTableP7",
                "payTableP8",
                "payTableP9",
                "payTableP10",
                "payTableV0",
                "payTableV1",
                "payTableV2",
                "payTableV3",
                "payTableV4",
                "payTableV5",
                "payTableV6",
                "payTableV7",
                "payTableV8",
                "payTableV9",
                "payTableV10"
            ],
            fillAlpha: 0.3,
            fill: 0x000000,
            lineWidth: 4,
            lineColor: 0xFFFFFF,
            radius: 6,
            landscape: {
				x: 99,
                y: 920,
                width: 764,
                height: 578,
				scale: 0.78
            },
            portrait: {
				x: 18,
                y: 884,
                width: 604,
                height: 576
            }
        },
            payTableBar0: {
                type: "rectangle",
                fillAlpha: 0.3,
                fill: 0x000000,
                x: 0,
                y: 50,
                landscape: { width: 764 },
                portrait: { width: 604 },
                height: 48
            },
            payTableBar1: {
                type: "rectangle",
                fillAlpha: 0.3,
                fill: 0x000000,
                x: 0,
                y: 146,
                landscape: { width: 764 },
                portrait: { width: 604 },
                height: 48
            },
            payTableBar2: {
                type: "rectangle",
                fillAlpha: 0.3,
                fill: 0x000000,
                x: 0,
                y: 242,
                landscape: { width: 764 },
                portrait: { width: 604 },
                height: 48
            },
            payTableBar3: {
                type: "rectangle",
                fillAlpha: 0.3,
                fill: 0x000000,
                x: 0,
                y: 338,
                landscape: { width: 764 },
                portrait: { width: 604 },
                height: 48
            },
            payTableBar4: {
                type: "rectangle",
                fillAlpha: 0.3,
                fill: 0x000000,
                x: 0,
                y: 434,
                landscape: { width: 764 },
                portrait: { width: 604 },
                height: 48
            },
			payTableBar5: {
				type: "rectangle",
				fillAlpha: 0.3,
				fill: 0x000000,
				x: 0,
				y: 530,
				landscape: { width: 764 },
				portrait: { width: 604 },
				height: 48
			},
            payTableVerticalBar: {
                type: "rectangle",
                fillAlpha: 0.3,
                fill: 0x000000,
                landscape: { x: 381 },
                portrait: { x: 301 },
                y: 0,
                width: 4,
                height: 578
            },
            payTableTitle0: {
                type: "text",
                style: "payTableHeader",
                anchor: 0.5,
                landscape: { x: 196 },
                portrait: { x: 154 },
                y: 26,
                string: "payTableHeader0"
            },
            payTableTitle1: {
                type: "text",
                style: "payTableHeader",
                anchor: 0.5,
                landscape: { x: 580 },
                portrait: { x: 456 },
                y: 26,
                string: "payTableHeader1"
            },
            payTableP0: {
                type: "text",
                style: "payTableText0",
                string: "payTableP0",
                anchor: 0.5,
                landscape: { x: 196 },
                portrait: { x: 154 },
                y: 76
            },
            payTableP1: {
                type: "text",
                style: "payTableText1",
                string: "payTableP1",
                anchor: 0.5,
                landscape: { x: 196 },
                portrait: { x: 154 },
                y: 124
            },
            payTableP2: {
                type: "text",
                style: "payTableText0",
                string: "payTableP2",
                anchor: 0.5,
                landscape: { x: 196 },
                portrait: { x: 154 },
                y: 172
            },
            payTableP3: {
                type: "text",
                style: "payTableText1",
                string: "payTableP3",
                anchor: 0.5,
                landscape: { x: 196 },
                portrait: { x: 154 },
                y: 220
            },
            payTableP4: {
                type: "text",
                style: "payTableText0",
                string: "payTableP4",
                anchor: 0.5,
                landscape: { x: 196 },
                portrait: { x: 154 },
                y: 268
            },
            payTableP5: {
                type: "text",
                style: "payTableText1",
                string: "payTableP5",
                anchor: 0.5,
                landscape: { x: 196 },
                portrait: { x: 154 },
                y: 316
            },
            payTableP6: {
                type: "text",
                style: "payTableText0",
                string: "payTableP6",
                anchor: 0.5,
                landscape: { x: 196 },
                portrait: { x: 154 },
                y: 364
            },
            payTableP7: {
                type: "text",
                style: "payTableText1",
                string: "payTableP7",
                anchor: 0.5,
                landscape: { x: 196 },
                portrait: { x: 154 },
                y: 412
            },
            payTableP8: {
                type: "text",
                style: "payTableText0",
                string: "payTableP8",
                anchor: 0.5,
                landscape: { x: 196 },
                portrait: { x: 154 },
                y: 460
            },
            payTableP9: {
                type: "text",
                style: "payTableText1",
                string: "payTableP9",
                anchor: 0.5,
                landscape: { x: 196 },
                portrait: { x: 154 },
                y: 508
            },
			payTableP10: {
				type: "text",
				style: "payTableText1",
				string: "payTableP10",
				anchor: 0.5,
				landscape: { x: 196 },
				portrait: { x: 154 },
				y: 556
			},
            payTableV0: {
                type: "text",
                style: "payTableText0",
                string: "payTableV0",
                anchor: 0.5,
                landscape: { x: 576 },
                portrait: { x: 456 },
                y: 76
            },
            payTableV1: {
                type: "text",
                style: "payTableText1",
                string: "payTableV1",
                anchor: 0.5,
                landscape: { x: 576 },
                portrait: { x: 456 },
                y: 124
            },
            payTableV2: {
                type: "text",
                style: "payTableText0",
                string: "payTableV2",
                anchor: 0.5,
                landscape: { x: 576 },
                portrait: { x: 456 },
                y: 172
            },
            payTableV3: {
                type: "text",
                style: "payTableText1",
                string: "payTableV3",
                anchor: 0.5,
                landscape: { x: 576 },
                portrait: { x: 456 },
                y: 220
            },
            payTableV4: {
                type: "text",
                style: "payTableText0",
                string: "payTableV4",
                anchor: 0.5,
                landscape: { x: 576 },
                portrait: { x: 456 },
                y: 268
            },
            payTableV5: {
                type: "text",
                style: "payTableText1",
                string: "payTableV5",
                anchor: 0.5,
                landscape: { x: 576 },
                portrait: { x: 456 },
                y: 316
            },
            payTableV6: {
                type: "text",
                style: "payTableText0",
                string: "payTableV6",
                anchor: 0.5,
                landscape: { x: 576 },
                portrait: { x: 456 },
                y: 364
            },
            payTableV7: {
                type: "text",
                style: "payTableText1",
                string: "payTableV7",
                anchor: 0.5,
                landscape: { x: 576 },
                portrait: { x: 456 },
                y: 412
            },
            payTableV8: {
                type: "text",
                style: "payTableText0",
                string: "payTableV8",
                anchor: 0.5,
                landscape: { x: 576 },
                portrait: { x: 456 },
                y: 460
            },
            payTableV9: {
                type: "text",
                style: "payTableText1",
                string: "payTableV9",
                anchor: 0.5,
                landscape: { x: 576 },
                portrait: { x: 456 },
                y: 508
            },
			payTableV10: {
				type: "text",
				style: "payTableText1",
				string: "payTableV10",
				anchor: 0.5,
				landscape: { x: 576 },
				portrait: { x: 456 },
				y: 556
			},
        oddsLabel0: {
            type: "text",
            style: "odds",
            string: "odds0",
            anchor: 0.5,
            landscape: { x: 400, y: 1398 },
            portrait: { x: 320, y: 1528 }
        },
        oddsLabel1: {
            type: "text",
            style: "odds",
            string: "odds1",
            anchor: 0.5,
            landscape: { x: 400, y: 1440 },
            portrait: { x: 320, y: 1570 }
        },
        oddsLabel2: {
            type: "text",
            style: "odds",
            string: "odds2",
            anchor: 0.5,
            landscape: { x: 400, y: 1482 },
            portrait: { x: 320, y: 1612 }
        }
});