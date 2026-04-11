//
//	screensaver-output.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { screensaverApp } from "./screensaverApp.js";




class ScreensaverOutput {


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

