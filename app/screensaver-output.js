//
//	screensaver-output.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { screensaverApp } from "./screensaverApp.js";
import * as maths from "../[html-common]/module/Maths.js";



class ScreensaverOutput {


	xMin	= -2400;
	xMax	= +2400;
	yMin	= -1200;
	yMax	= +1200;


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


	/** @return {string}  */
	randomPoint() {
		return `${maths.getRandomIntInclusive(this.xMin, this.xMax)},${maths.getRandomIntInclusive(this.yMin, this.yMax)}`;
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

