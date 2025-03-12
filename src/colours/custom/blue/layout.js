define({
	// Optional display list in which to override elements from the template display list
	background: {
		type: "rectangle",
		children: ["bigSquare", "flaxLogo"],
		landscape: {
			x: 0,
			y: 0,
			width: 800,
			height: 600,
			fill: 0x19426F
		},
		portrait: {
			x: 0,
			y: 0,
			width: 640,
			height: 1136,
			fill: 0x19426F
		}
	}
});
