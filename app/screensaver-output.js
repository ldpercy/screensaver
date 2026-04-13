//
//	screensaver-output.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { screensaverApp } from "./screensaverApp.js";
import * as maths from "../[html-common]/module/Maths.js";



class ScreensaverOutput {


	xMin	= -1800;
	xMax	= +1800;
	yMin	= -900;
	yMax	= +900;
	// these are just rough starting vals until until I can figure out the geometry of the viewing area


	element = {};

	elementMap = {
		output			: 'screensaver-output',
		group			: 'screensaver-group',
	};



	constructor() {
		this.element = HTMLApp.buildElementMap(document, this.elementMap)
		//HTMLApp.addEventListeners(this.eventListeners, this);
		//this.keyboardHandler = HTMLApp.newKeyboardHandler(this.keyFunctionMap,this);
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


	//
	//	Accessors
	//

	/** @param {boolean} strokeDash	*/
	set strokeDash(strokeDash) {
		this.element.output.dataset.strokeDash = strokeDash;
	}

	/** @param {string} dashAnimation	*/
	set dashAnimation(dashAnimation) {
		this.element.output.dataset.dashAnimation = dashAnimation;
	}




}/* ScreensaverOutput */


export const output = new ScreensaverOutput();

