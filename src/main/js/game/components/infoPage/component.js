define(function(require) {
    var msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    var app = require("skbJet/componentManchester/standardIW/app");
	require("com/gsap/TweenLite");

    var Tween = window.TweenLite;

    var swipingPage = false; //For dragging the page
    var lastYPage;
	var swipingBar = false; //For dragging the scrollbar

    return function infoPage(parts) {
        if (document.addEventListener)
        {
            // IE9, Chrome, Safari, Opera
            document.addEventListener("mousewheel", mouseWheelHandler, false);
            // Firefox
            document.addEventListener("DOMMouseScroll", mouseWheelHandler, false);
        }
        // IE 6/7/8 (irrelevant, tbh).
        else
        {
            document.attachEvent("onmousewheel", mouseWheelHandler);
        }

        function mouseWheelHandler(e)
        {
            // cross-browser wheel delta
            e = window.event || e; // old IE support
            var diff = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) * 30;
            var barB = parts.scrollBar.getLocalBounds();
            var markB = parts.scrollPosition.getLocalBounds();

            parts.bgInfo1.y = Math.max(Math.min(0, parts.bgInfo1.y + diff), app.renderer.height - parts.oddsLabel2.y - 25 - (parts.infoBase.y * 2));
            parts.scrollPosition.y = Math.min((barB.height - markB.height) * (parts.bgInfo1.y / (app.renderer.height - parts.oddsLabel2.y - 25 - (parts.infoBase.y * 2))), );
            return false;
        }


        // initial setup;
        parts.titleBar.alpha = 0;
        parts.titleBar.visible = 0;
        parts.scrollBar.alpha = 0;
        parts.scrollBar.visible = 0;
        parts.bgInfo.alpha = 0;
        parts.bgInfo.visible = 0;
        parts.bgInfo.interactive = false;
        parts.bgInfo.cursor = "normal";
		parts.gameVersion.text = (typeof window._cacheFlag === "object" ? "v" + window._cacheFlag.gameVersion : "");

        function beginSwipePage(e) {
            swipingPage = true;
            lastYPage = e.data.global.y.valueOf();
            e.stopPropagation(); //try to avoid starting a scratch on the elements below
        }

        function endSwipePage() {
            swipingPage = false;
            var barB = parts.scrollBar.getLocalBounds();
            var markB = parts.scrollPosition.getLocalBounds();

            parts.scrollPosition.y = Math.min((barB.height - markB.height) * (parts.bgInfo1.y / (app.renderer.height - parts.oddsLabel2.y - 25 - (parts.infoBase.y * 2))), );
        }

        function doSwipePage(e) {
            if(swipingPage && !swipingBar) {
                var diff = e.data.global.y - lastYPage;
                var barB = parts.scrollBar.getLocalBounds();
                var markB = parts.scrollPosition.getLocalBounds();

                parts.bgInfo1.y = Math.max(Math.min(0, parts.bgInfo1.y + diff), app.renderer.height - parts.oddsLabel2.y - 25 - (parts.infoBase.y * 2));
                parts.scrollPosition.y = Math.min((barB.height - markB.height) * (parts.bgInfo1.y / (app.renderer.height - parts.oddsLabel2.y - 25 - (parts.infoBase.y * 2))), );
                lastYPage = e.data.global.y.valueOf();
            }
        }

		function beginSwipeBar(e) {
			swipingBar = true;
			e.stopPropagation(); //try to avoid starting a scratch on the elements below, or firing the page listener
		}

		function endSwipeBar(e) {
			swipingBar = false;
			var barB = parts.scrollBar.getBounds();
			var markB = parts.scrollPosition.getBounds();

			parts.scrollPosition.y = Math.max(0, Math.min(barB.height - markB.height, (e.data.global.y.valueOf() - barB.top - (markB.height / 2))));
		}

		function doSwipeBar(e) {
			if(swipingBar && !swipingPage) {
				var barB = parts.scrollBar.getBounds();
				var markB = parts.scrollPosition.getBounds();

				parts.scrollPosition.y = Math.max(0, Math.min(barB.height - markB.height, (e.data.global.y.valueOf() - barB.top - (markB.height / 2))));
				parts.bgInfo1.y = (parts.scrollPosition.y / (barB.height - markB.height)) * (app.renderer.height - parts.oddsLabel2.y - 25 - (parts.infoBase.y * 2));
			}
		}

		function onClickBar(e) {
			var barB = parts.scrollBar.getBounds();
			var markB = parts.scrollPosition.getBounds();

			parts.scrollPosition.y = Math.max(0, Math.min(barB.height - markB.height, (e.data.global.y.valueOf() - barB.top - (markB.height / 2))));
			parts.bgInfo1.y = (parts.scrollPosition.y / (barB.height - markB.height)) * (app.renderer.height - parts.oddsLabel2.y - 25 - (parts.infoBase.y * 2));

			e.stopPropagation(); //try to avoid starting a scratch on the elements below
		}

        function show() {
            parts.infoCloseButton.interactive = true;

            Tween.to(parts.titleBar, 0.5, {alpha: 1, visible: 1});
            Tween.to(parts.scrollBar, 0.5, {alpha: 1, visible: 1});
            Tween.to(parts.bgInfo, 0.5, {alpha: 1, visible: 1});

            parts.bgInfo.on("pointerdown", beginSwipePage);
            parts.bgInfo.on("pointerup", endSwipePage);
            parts.bgInfo.on("pointerupoutside", endSwipePage);
            parts.bgInfo.on("pointermove", doSwipePage);
            parts.bgInfo.interactive = true;

			parts.scrollPosition.on("pointerdown", beginSwipeBar);
			parts.scrollPosition.on("pointerup", endSwipeBar);
			parts.scrollPosition.on("pointerupoutside", endSwipeBar);
			parts.scrollPosition.on("pointermove", doSwipeBar);
			parts.scrollPosition.interactive = true;

			parts.scrollBar.on("pointerdown", onClickBar);
			parts.scrollBar.interactive = true;

            //Scale and position page to avoid cropping the title and scroll bars.
            var mTop = Math.ceil(parseFloat(app.view.style.marginTop));
            var barH = parts.scrollBar.getLocalBounds().height;
            if(mTop < 0) {
                parts.infoBase.y = -mTop * (app.renderer.height / parseFloat(app.view.style.height));
                parts.scrollBar.scale.set(1, (barH - (2 * parts.infoBase.y)) / barH);
            }
        }

        function hide() {
            parts.infoCloseButton.interactive = false;

            Tween.to(parts.titleBar, 0.5, {alpha: 0, visible: 0});
            Tween.to(parts.scrollBar, 0.5, {alpha: 0, visible: 0});
            Tween.to(parts.bgInfo, 0.5, {alpha: 0, visible: 0});

            parts.bgInfo.off("pointerdown", beginSwipePage);
            parts.bgInfo.off("pointerup", endSwipePage);
            parts.bgInfo.off("pointerupoutside", endSwipePage);
            parts.bgInfo.off("pointermove", doSwipePage);
            parts.bgInfo.interactive = false;
            swipingPage = false;

			parts.scrollPosition.off("pointerdown", beginSwipeBar);
			parts.scrollPosition.off("pointerup", endSwipeBar);
			parts.scrollPosition.off("pointerupoutside", endSwipeBar);
			parts.scrollPosition.off("pointermove", doSwipeBar);
			parts.scrollPosition.interactive = false;
			swipingBar = false;

			parts.scrollBar.off("pointerdown", onClickBar);
			parts.scrollBar.interactive = false;
        }

        parts.infoCloseButton.on("press", hide);

        msgBus.subscribe("UI.toggleHelp", () => {
            if(parts.bgInfo.visible) {
                hide();
            } else {
                show();
            }
        });

        return parts.infoBase;
    };
});