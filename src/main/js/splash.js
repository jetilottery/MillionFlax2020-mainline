define(["skbJet/component/resourceLoader/resourceLib", "skbJet/componentManchester/standardIW/splash/splashLoadController"], function(
	resLib,
	splashLoadController
) {
	var flaxLogoContainer = document.querySelector(".flaxLogoContainer");
	var progress = document.querySelector(".progress");
	var copyright = document.querySelector(".copyright");
	var spinner = document.querySelector(".spinner");

	var softId = window.location.search.match(/&?softwareid=(\d+.\d+.\d+)?/);
	var isSKB = softId && (softId[1].split("-")[2].charAt(0) !== "0");

	var bgSrc = "";

	function onMessage(msg) {
		if (msg.data && msg.data.loaded) {
			progress.textContent = msg.data.loaded + "%";
		}
	}

	function onResize() {
		let bgImg;
		if(window.innerWidth > window.innerHeight) {
			bgImg = resLib.splash.LoaderTitleLandscape;
		} else {
			bgImg = resLib.splash.LoaderTitlePortrait;
		}
		if (bgImg.src !== bgSrc) {
			bgSrc = bgImg.src;
			document.body.style.backgroundImage = "url(" + bgSrc + ")";
			document.body.style.backgroundSize = "100% auto";
		}

		var scale = 1;
		var wR = window.innerWidth / window.innerHeight;
		var splashR = bgImg.width / bgImg.height;

		if(wR > splashR) {
			scale = window.innerHeight / bgImg.height;
		} else {
			scale = window.innerWidth / bgImg.width;
		}

		if(window.innerWidth > window.innerHeight) {
			flaxLogoContainer.style.left = "6px";
			flaxLogoContainer.style.top = "16px";
			flaxLogoContainer.style.transform = "scale(" + scale * 0.68 + ")";
			document.body.style.backgroundSize = "cover";
		} else {
			flaxLogoContainer.style.transform = "scale(" + scale + ")";
		}
		spinner.style.transform = "scale(" + scale + ")";
		spinner.style.transformOrigin = "bottom";
	}

	function onLoadSplashDone(){
		var assetPack = window.location.search.match(/&?assetPack=(\w+)&?/)[1];

		if(assetPack === "mobile"){
			copyright.style.fontSize = "1.5em";
		}

		copyright.textContent = isSKB ? resLib.i18n.splash.splashScreen.footer.shortVersion : "";

		flaxLogoContainer.appendChild(resLib.splash.flaxLogo);
		resLib.splash.flaxLogo.className = "flaxLogo";
		onResize();

		document.body.classList.add("loaded");
		window.addEventListener("resize", onResize);
		progress.textContent = "0%";
		splashLoadController.loadGame();
	}

	function init(){
		window.addEventListener("message", onMessage, false);
		splashLoadController.loadSplash(onLoadSplashDone);
	}

	init();
	return {};
});
