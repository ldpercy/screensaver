//
//	screensaver-output.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { screensaverApp } from "./screensaverApp.js";
import * as maths from "../[html-common]/module/Maths.js";
import * as planarSpace from "../[html-common]/module/PlanarSpace.js";



export const outputSpace = new planarSpace.Space();

let xMin, xMax, yMin, yMax;


const testing = false;

class ScreensaverOutput {


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

		if (testing) {
			xMin	= -240;
			xMax	= +240;
			yMin	= -240;
			yMax	= +240;
		}
		else {
			xMin	= -1800;
			xMax	= +1800;
			yMin	= -1200;
			yMax	= +1200;
		}

	}

	/** @return {number}  */
	randomX() {
		return maths.getRandomIntInclusive(xMin, xMax);
	}

	/** @return {number}  */
	randomY() {
		return maths.getRandomIntInclusive(yMin, yMax);
	}

	/** @return {string}  */
	randomPoint() {
		return `${this.randomX()},${this.randomY()}`;
	}


	randomPointConservative() {
		return `${maths.getRandomIntInclusive(xMin/2, xMax/2)},${maths.getRandomIntInclusive(yMin/2, yMax/2)}`;
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

	/** @param {string} dashAnimation	*/
	set dashAnimation(dashAnimation) {
		this.element.output.dataset.dashAnimation = dashAnimation;
	}




}/* ScreensaverOutput */


export const output = new ScreensaverOutput();

