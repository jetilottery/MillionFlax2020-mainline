/* jshint esnext: true */
define(require => {
	const PIXI = require("com/pixijs/pixi");
	const app = require("skbJet/componentManchester/standardIW/app");
	const config = require("skbJet/componentManchester/standardIW/gameConfig");

	class ScratchMask {
		constructor(parent) {
			this._parent = parent;
			this._rectangles = [];
			this._scratched = [];
			this._debugDraw = false;

			let pB = parent.getBounds();
			let w = pB.width;
			let h = pB.height;
			let columns = Math.ceil(w / config.scratchRectWidth);
			let rows = Math.ceil(h / config.scratchRectHeight);
			let rWidth = Math.ceil(w / columns),
				rHeight = Math.ceil(h / rows);

			this._boundingRect = new PIXI.Rectangle(pB.left, pB.top, w, h);

			for(let yy = 0; yy < rows; yy++) {
				for(let xx = 0; xx < columns; xx++) {
					let l = this.left + (xx * rWidth);
					let t = this.top + (yy * rHeight);
					this._rectangles.push(new PIXI.Rectangle(l, t, rWidth, rHeight));
					this._scratched.push(false);
				}
			}

			this.avgAlpha = [];
		}

		get x() {
			return this.left;
		}

		set x(val) {
			let offset = val - this._boundingRect.left;
			for(let i = 0; i < this._rectangles.length; i++) {
				this._rectangles[i].x += offset;
			}
			this._boundingRect.x = val;
		}

		get y() {
			return this.top;
		}

		set y(val) {
			let offset = val - this._boundingRect.top;
			for(let i = 0; i < this._rectangles.length; i++) {
				this._rectangles[i].y += offset;
			}
			this._boundingRect.y = val;
		}

		get width() {
			return this._boundingRect.width;
		}

		get height() {
			return this._boundingRect.height;
		}

		get left() {
			return this._boundingRect.left;
		}

		get top() {
			return this._boundingRect.top;
		}

		get right() {
			return this._boundingRect.right;
		}

		get bottom() {
			return this._boundingRect.bottom;
		}

		get scratched() {
			let numScratched = 0;
			for(let i = 0; i < this._scratched.length; i++) {
				if(this._scratched[i]) {
					numScratched++;
				}
			}
			let scratchedRatio = numScratched /this._rectangles.length;
			return (scratchedRatio >= config.scratchMaskScratchedThreshold);
		}

		set scratched(val) {
			for(let i = 0; i < this._scratched.length; i++) {
				this._scratched[i] = val;
			}
		}

		get fullyScratched() {
			let numScratched = 0;
			for(let i = 0; i < this._scratched.length; i++) {
				if(this._scratched[i]) {
					numScratched++;
				}
			}
			return numScratched === this._rectangles.length;
		}

		static collidesWith(r1, r2) {
			return ((r1.right >= r2.left) && (r1.left <= r2.right) && (r1.bottom >= r2.top) && (r1.top <= r2.bottom));
		}

		get debugDraw() {
			return this._debugDraw;
		}

		set debugDraw(val) {
			if(this._debugG) {
				this._parent.removeChild(this._debugG);
			}

			if(val) {
				//Draw the rectangles to their positions on-screen. Red for unscratched, Green for scratched
				this._debugG =  new PIXI.Graphics();
				this._debugG.scale.set(1/this._parent.worldTransform.a, 1/this._parent.worldTransform.d); //account for scaling
				this._debugG.rotation = -this._parent.rotation;
				this._parent.addChild(this._debugG);
				PIXI.ticker.shared.add(this._debugUpdate, this);
			} else {
				this._debugG = null;
				this._parent.removeChild(this._debugG);
				PIXI.ticker.shared.remove(this._debugUpdate, this);
			}
			this._debugDraw = val;
		}

		_debugUpdate() {
			this._debugG.clear();
			this._debugG.lineColor = 0x000000;
			this._debugG.lineWidth = 2;
			for(let i = 0; i < this._rectangles.length; i++) {
				this._debugG.beginFill(this._scratched[i] ? 0x15b309 : 0xf40303, 0.5);
				this._debugG.drawRect(
					this._rectangles[i].left - this._boundingRect.left - (this._boundingRect.width / 2),
					this._rectangles[i].top - this._boundingRect.top - (this._boundingRect.height / 2),
					this._rectangles[i].width,
					this._rectangles[i].height
				);
				this._debugG.endFill();
			}
		}

		//Remove rectangles that mostly cover transparent pixels
		//SLOW - try to use once per tile group, then clone the result to the other tiles using cloneTransparent
		removeTransparent(ref) {
			var rectMap = new Array(this._rectangles.length);
			this._rectangles = this._rectangles.filter((v, i) => {
				let tempTex = app.renderer.generateTexture(ref, undefined, undefined, v);
				let pixels = app.renderer.extract.pixels(tempTex).filter((vv, ii) => {return ii % 4 === 3;}); //only need alpha values
				tempTex.destroy(true);
				rectMap[i] = (pixels.reduce((prev, next) => {return prev + next;}) / pixels.length / 255) >= config.scratchRectOpacityThreshold;
				return rectMap[i];
			});
			return rectMap; //map the useable rectangles to allow cloning of the map
		}

		//Copy the removeTransparent result from another mask and apply it to this one
		cloneTransparent(rectMap) {
			this._rectangles = this._rectangles.filter((v, i) => {return rectMap[i];});
		}

		//Test a rectangle or scratchmask against this one, return all this masks rectangles which collide with "other"
		collisionRects(other) {
			let i, intersection,
				collideRects = [];

			//First do a basic check using the bounding rectangle
			if(!ScratchMask.collidesWith(this._boundingRect, other)) {
				return [];
			} else {
				intersection = new PIXI.Rectangle(
					Math.max(this.left, other.left),
					Math.max(this.top, other.top),
					Math.abs(Math.min(this.right, other.right) - Math.max(this.left, other.left)),
					Math.abs(Math.min(this.bottom, other.bottom) - Math.max(this.top, other.top))
				);
			}

			if(other._rectangles) {
				//other is a collisionMask
				let otherRects = other.collisionRects(intersection);
				for(i = 0; i < otherRects.length; i++) {
					collideRects = collideRects.concat(this.collisionRects(otherRects[i]));
				}
			} else {
				//other is a single rectangle
				for(i = 0; i < this._rectangles.length; i++) {
					if(!this._scratched[i] && ScratchMask.collidesWith(this._rectangles[i], intersection)) {
						collideRects.push(this._rectangles[i]);
						this._scratched[i] = true;
					}
				}
			}
			return collideRects;
		}

		//Return true if the point is contained in the mask
		//Set unscratchedOnly to true if you want to test only against unscratched collisionRects
		containsPoint(point, unscratchedOnly) {
			for(let i = 0; i < this._rectangles.length; i++) {
				if(this._rectangles[i].left < point.x && this._rectangles[i].right > point.x && this._rectangles[i].top < point.y && this._rectangles[i].bottom > point.y) {
					if(!unscratchedOnly || !this._scratched[i]) {
						return true;
					}
				}
			}
			return false;
		}
	}

	return ScratchMask;
});