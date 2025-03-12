define(function(require) {
	var msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
	var layoutEngine = require("skbJet/componentManchester/standardIW/layout/engine");
	var layout = require("skbJet/componentManchester/standardIW/layout");
	var orientation = require("skbJet/componentManchester/standardIW/orientation");
	var isMobileOrTablet = require("skbJet/componentLondon/utils/isMobileOrTablet");
	var resultPlaquesLayout = require("game/components/resultPlaques/layout");
	var resultPlaquesComponent = require("game/components/resultPlaques/component");
	
	layout.register(resultPlaquesLayout);

    return function resultPlaquesTemplate() {
		var displayList = layoutEngine.createFromTree(
            resultPlaquesLayout._BASE_RESULTPLAQUES,
            null,
            layout.layouts,
            isMobileOrTablet ? "portrait" : orientation.get()
        );

		function updateLayout() {
			layoutEngine.update(
				resultPlaquesLayout._BASE_RESULTPLAQUES,
				layout.layouts,
				isMobileOrTablet ? "portrait" : orientation.get()
			);
		}

		msgBus.subscribe("GameSize.OrientationChange", updateLayout);

        return resultPlaquesComponent({
            resultPlaques: displayList.resultPlaques,
            winPlaque: displayList.winPlaque,
            losePlaque: displayList.losePlaque,
            viewResultButton: displayList.viewResultButton,
            okButton: displayList.okButton,
            burst2: displayList.burst2,
            burst3: displayList.burst3,
            winPopUp: displayList.winPopUp,
			popUpWinText: displayList.popUpWinText,
			popUpWinArrows: displayList.popUpWinArrows,
			popUpBigWin: displayList.popUpBigWin,
            prizeRP: displayList.prizeRP,
			losePopUp: displayList.losePopUp,
			popUpLoseText: displayList.popUpLoseText
        });
    };
});
