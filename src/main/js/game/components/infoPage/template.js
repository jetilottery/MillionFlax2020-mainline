define(function(require) {
	var msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
	var layoutEngine = require("skbJet/componentManchester/standardIW/layout/engine");
	var layout = require("skbJet/componentManchester/standardIW/layout");
	var orientation = require("skbJet/componentManchester/standardIW/orientation");
	var isMobileOrTablet = require("skbJet/componentLondon/utils/isMobileOrTablet");
	var infoLayout = require("game/components/infoPage/layout");
	var infoComponent = require("game/components/infoPage/component");
	
	layout.register(infoLayout);

    return function infoTemplate() {
		var displayList = layoutEngine.createFromTree(
            infoLayout._BASE_INFO,
            null,
            layout.layouts,
            isMobileOrTablet ? "portrait" : orientation.get()
        );

		function updateLayout() {
			layoutEngine.update(
				infoLayout._BASE_INFO,
				layout.layouts,
				isMobileOrTablet ? "portrait" : orientation.get()
			);
		}

		msgBus.subscribe("GameSize.OrientationChange", updateLayout);

        return infoComponent({
            infoBase:               displayList.infoBase,
            titleBar:               displayList.titleBar,
            bgInfo:                 displayList.bgInfo,
            bgInfo0:                displayList.bgInfo0,
            bgInfo1:                displayList.bgInfo1,
			gameVersion:			displayList.gameVersion,
            titleBarTitle:          displayList.titleBarTitle,
            scrollBar:              displayList.scrollBar,
            scrollPosition:         displayList.scrollPosition,
            infoCloseButton:        displayList.infoCloseButton,
            helpTitle:              displayList.helpTitle,
            help:                   displayList.help,
            payTableTitle:          displayList.payTableTitle,
            payTable:               displayList.payTable,
            oddsLabel0:             displayList.oddsLabel0,
            oddsLabel1:             displayList.oddsLabel1,
            oddsLabel2:             displayList.oddsLabel2,
            helpTitleIcon:          displayList.helpTitleIcon,
            helpTitleText:          displayList.helpTitleText,
            helpTitle0:             displayList.helpTitle0,
            help0:                  displayList.help0,
            helpTitle1:             displayList.helpTitle1,
            help1:                  displayList.help1,
            payTableTitleIcon:      displayList.payTableTitleIcon,
            payTableTitleText:      displayList.payTableTitleText,
            payTableBar0:           displayList.payTableBar0,
            payTableBar1:           displayList.payTableBar1,
            payTableBar2:           displayList.payTableBar2,
            payTableBar3:           displayList.payTableBar3,
            payTableBar4:           displayList.payTableBar4,
            payTableVerticalBar:    displayList.payTableVerticalBar,
            payTableTitle0:         displayList.payTableTitle0,
            payTableTitle1:         displayList.payTableTitle1,
            payTableP0:             displayList.payTableP0,
            payTableP1:             displayList.payTableP1,
            payTableP2:             displayList.payTableP2,
            payTableP3:             displayList.payTableP3,
            payTableP4:             displayList.payTableP4,
            payTableP5:             displayList.payTableP5,
            payTableP6:             displayList.payTableP6,
            payTableP7:             displayList.payTableP7,
            payTableP8:             displayList.payTableP8,
            payTableP9:             displayList.payTableP9,
            payTableV0:             displayList.payTableV0,
            payTableV1:             displayList.payTableV1,
            payTableV2:             displayList.payTableV2,
            payTableV3:             displayList.payTableV3,
            payTableV4:             displayList.payTableV4,
            payTableV5:             displayList.payTableV5,
            payTableV6:             displayList.payTableV6,
            payTableV7:             displayList.payTableV7,
            payTableV8:             displayList.payTableV8,
            payTableV9:             displayList.payTableV9
        });
    };
});
