//
//	screensaver-output.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { screensaverApp } from "./screensaverApp.js";
import * as maths from "../[html-common]/module/Maths.js";
import * as planarSpace from "../[html-common]/module/PlanarSpace.js";



export const outputSpace = new planarSpace.Space();


const testing = false;

class ScreensaverOutput {


	// these are just rough starting vals until until I can figure out the geometry of the viewing area

	/** @type {number} */	xMin;
	/** @type {number} */	xMax;
	/** @type {number} */	yMin;
	/** @type {number} */	yMax;


	element = {};

	elementMap = {
		output			: 'screensaver-output',
		group			: 'screensaver-group',
	};



	constructor() {
		this.element = HTMLApp.buildElementMap(document, this.elementMap)
		//HTMLApp.addEventListeners(this.eventListeners, this);
		//this.keyboardHandler = HTMLApp.newKeyboardHandler(this.keyFunctionMap,this);

		if (testing) {
			this.xMin	= -240;
			this.xMax	= +240;
			this.yMin	= -240;
			this.yMax	= +240;
		}
		else {
			this.xMin	= -1800;
			this.xMax	= +1800;
			this.yMin	= -1200;
			this.yMax	= +1200;
		}

	}

	/** @return {number}  */
	randomX() {
		return maths.getRandomIntInclusive(this.xMin, this.xMax);
	}

	/** @return {number}  */
	randomY() {
		return maths.getRandomIntInclusive(this.yMin, this.yMax);
	}

	/** @return {string}  */
	randomPoint() {
		return `${this.randomX()},${this.randomY()}`;
	}


	randomPointConservative() {
		return `${maths.getRandomIntInclusive(this.xMin/2, this.xMax/2)},${maths.getRandomIntInclusive(this.yMin/2, this.yMax/2)}`;
	}

	/** @returns {planarSpace.CartesianCoordinates} */
	randomCartesian() {
		return outputSpace.newCartesianCoordinates(this.randomX(), this.randomY());
	}


	//
	//	Accessors
	//

	/** @param {boolean} strokeDash	*/
	set strokeDash(strokeDash) {
		this.element.output.dataset.strokeDash = strokeDash;
	}

	/** @param {string} animation	*/
	set animation(animation) {
		this.element.output.dataset.animation = animation;
	}


	/** @param {number} mainInterval	*/
	set mainInterval(mainInterval) {
		this.element.output.style.setProperty('--main-interval', `${mainInterval}ms`);
	}

	/** @param {string} playState	*/
	set animationPlayState(playState) {
		this.element.group.style.setProperty('animation-play-state', `${playState}`);
	}



}/* ScreensaverOutput */


export const output = new ScreensaverOutput();

