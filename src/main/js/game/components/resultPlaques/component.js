define(function(require) {
	var PIXI = require("com/pixijs/pixi");
    var msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    var meterData = require("skbJet/componentManchester/standardIW/meterData");
    var isMobileOrTablet = require("skbJet/componentLondon/utils/isMobileOrTablet");
    var nokFormat = require("skbJet/componentLondon/utils/nokFormat");
    var config = require("skbJet/componentManchester/standardIW/gameConfig");
	var utils = require("skbJet/componentManchester/standardIW/layout/utils");

	require("com/gsap/TweenLite");
    require("com/gsap/TimelineLite");

    var Tween = window.TweenLite;

    return function resultPlaques(parts) {
        // initial setup;
        parts.resultPlaques.visible = false;
        parts.winPlaque.visible = false;
        parts.losePlaque.visible = false;
        window.parts = parts;

		var prizeTextRP = new PIXI.extras.BitmapText("", {font: "prizeRP", align: "center", tint: 0xFFFFFF});
		prizeTextRP.anchor.set(0.5);
		var winParticles = new PIXI.extras.AnimatedSprite(utils.findFrameSequence("particles").map(frame => {return PIXI.Texture.fromFrame(frame);}));
		winParticles.loop = false;
		winParticles.alpha = 0;
		winParticles.anchor.set(0.5);

		parts.prizeRP.addChild(prizeTextRP);
		parts.popUpBigWin.addChild(winParticles);

        function showPlaque() {
            parts.resultPlaques.interactive = true;
            parts.resultPlaques.interactiveChildren = true;
            msgBus.publish("UI.updateButtons", {
                audioOn: {enabled: false},
                audioOff: {enabled: false},
                info: {enabled: false},
                left: {enabled: false},
                right: {enabled: false},
                back: {enabled: false},
                hint: {enabled: false},
                scratchAll: {enabled: false},
                playAgain: {enabled: false}
            });

			var formattedWin, win;
			if(config.mockData) {
				formattedWin = nokFormat(window.fakeMeterWin);
				win = window.fakeMeterWin;
			} else {
				formattedWin = nokFormat(meterData.totalWin);
				win = meterData.totalWin;
			}

            if(win === 0) {
                parts.losePlaque.visible = true;
                parts.winPlaque.visible = false;
                parts.resultPlaques.visible = true;

                Tween.fromTo(parts.resultPlaques, 0.5, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone" });
            } else {
                parts.losePlaque.visible = false;
                parts.winPlaque.visible = true;
                parts.resultPlaques.visible = true;

                parts.prizeRP.children[0].text = formattedWin;

                Tween.killTweensOf(parts.burst2);
                Tween.killTweensOf(parts.burst3);

                Tween.fromTo(parts.resultPlaques, 0.5, {alpha: 0}, {alpha: 1, visible: 1});
                Tween.fromTo(parts.burst2, 10, {rotation: 0}, {rotation: Math.PI * 2, onComplete: function(t) {
                    t.restart();
                }, onCompleteParams: ["{self}"], ease: "Linear.easeNone" });
				Tween.fromTo(parts.burst3, 9, {rotation: 0}, {rotation: Math.PI * 2, onComplete: function(t) {
					t.restart();
				}, onCompleteParams: ["{self}"], ease: "Linear.easeNone" });

				if(win > config.bigWinLevel1) {
					winParticles.onComplete = () => {
						winParticles.alpha = 0;
					};
					winParticles.animationSpeed = 0.5;
					winParticles.alpha = 1;
					winParticles.gotoAndPlay(0);
				}

            }
        }

        parts.viewResultButton.on("press", function onPress() {
            if(!isMobileOrTablet) {
                msgBus.publish("UI.updateButtons", {
                    audioOn: {visible: true, enabled: true},
                    audioOff: {visible: true, enabled: true},
                    info: {visible: true, enabled: true},
                    left: {visible: false, enabled: false},
                    right: {visible: false, enabled: false},
                    hint: {visible: false, enabled: false},
                    back: {visible: false, enabled: false},
                    scratchAll: {visible: false, enabled: false},
                    gamePips: {visible: false},
                    buy: {visible: false, enabled: false},
                    try: {visible: false, enabled: false},
                    playAgain: {visible: true, enabled: true}
                });
            } else {
                msgBus.publish("UI.updateButtons", {
                    audioOn: {visible: true, enabled: true},
                    audioOff: {visible: true, enabled: true},
                    info: {visible: true, enabled: true},
                    left: {visible: true, enabled: true},
                    right: {visible: true, enabled: true},
                    hint: {visible: false, enabled: false},
                    back: {visible: false, enabled: false},
                    scratchAll: {visible: false, enabled: false},
                    gamePips: {visible: false},
                    buy: {visible: false, enabled: false},
                    try: {visible: false, enabled: false},
                    playAgain: {visible: true, enabled: true}
                });
            }
			msgBus.publish("Game.viewResult");

            parts.resultPlaques.interactive = false;
            parts.resultPlaques.interactiveChildren = false;
            Tween.fromTo(parts.resultPlaques, 0.5, {alpha: 1}, {alpha: 0, visible: 0});
        });

        parts.okButton.on("press", function onPress() {
            parts.resultPlaques.interactive = false;
            parts.resultPlaques.interactiveChildren = false;
            msgBus.publish("UI.updateButtons", {
                audioOn: {visible: true, enabled: true},
                audioOff: {visible: true, enabled: true},
                info: {visible: true, enabled: true},
                left: {visible: false, enabled: false},
                right: {visible: false, enabled: false},
                back: {visible: false, enabled: false},
                hint: {visible: false, enabled: false},
                scratchAll: {visible: false, enabled: false},
                playAgain: {visible: false, enabled: false},
                buy: {visible: false, enabled: false},
                try: {visible: false, enabled: false}
            });

            Tween.fromTo(parts.resultPlaques, 0.5, {alpha: 1}, {alpha: 0, visible: 0, onComplete: function (){
                msgBus.publish("Game.Finish");
            }});
        });

        msgBus.subscribe("Game.ShowResult", showPlaque);

        return parts.resultPlaques;
    };
});
