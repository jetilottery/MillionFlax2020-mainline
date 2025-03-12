function mainEntry(){
	"use strict";
	
	// Game Namespace - edit here and in webapp/game_settings.json
	var NAMESPACE = "MillionFlax2020";

	require.onError = function (err) {
		if (err.requireType === 'timeout') {
			console.log('modules: ' + err.requireModules);
		}

		throw err;
	};

	function onResize() {
		//Pass frame size to Loader iframe
		if(window.loadPage) {
			window.loadPage.width = window.innerWidth;
			window.loadPage.height = window.innerHeight;
		}
	}
	onResize();
	window.addEventListener("resize", onResize);
	setInterval(onResize, 1000); //poll image size every second during loading

	window.game = window.game || {};
	window.game[NAMESPACE] = window.game[NAMESPACE] || {};
	window.game[NAMESPACE].lib = {Main:function(){}};
	window.game[NAMESPACE].lib.Main.prototype.init = function(config){
		if(config&&config.urlGameFolder){
			require.config({ baseUrl: config.urlGameFolder });
		}
		var _game = this;
		/*eslint-disable */
		requirejs.onResourceLoad = function (context, map, depArray) {
			if (!window.loadedRequireArray) {
					window.loadedRequireArray = [];
			}
			window.loadedRequireArray.push(map.name);
		};
		/*eslint-enable */
		require([
			"skbJet/component/SKBeInstant/SKBeInstant",
			"skbJet/componentManchester/standardIW/loadController",
			"game/bitmapFontLoader/BitmapFontSubLoader",
			"skbJet/componentManchester/standardIW/gameSize",
			"game/gameEntry"
		], function(SKBeInstant, loadController, BitmapFontSubLoader){
			loadController.registerSubLoader("bitmapFonts", new BitmapFontSubLoader({type: "bitmapFonts"}));
			SKBeInstant.init(config, _game);
		});
	};
	//if there is software id in URL parameters then it should be SKB/RGS env
	if(window.location.pathname.match(/launcher\.html$/)){
		require(["skbJet/component/gameMsgBus/PlatformMsgBusAdapter"], function(){
			var gameInstance = new window.game[NAMESPACE].lib.Main();
			gameInstance.init();
		});
	}
}
mainEntry();