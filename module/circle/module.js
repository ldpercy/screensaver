import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { ScreensaverBase } from "../screensaver-base.js";
import * as maths from "../../[html-common]/module/Maths.js";
import { output } from "../../app/screensaver-output.js";


//console.log('circle module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc


/** @type {HTMLElement} */
const ssg = document.getElementById('screensaver-group');

const c = document.createElementNS('http://www.w3.org/2000/svg','circle');



class CircleScreensaver extends ScreensaverBase {

	currentIndex = 0;

	constructor() {
		super();
		//console.log('CircleScreensaver constructor');
	}/* constructor */


	elementMap = {
		elementCount		: 'module-elementCount',
	};



	init() {
		//console.log('CircleScreensaver init');
		this.element = HTMLApp.buildElementMap(document, this.elementMap);
		this.update();
	}




	update() {

		while (ssg.childElementCount > this.elementCount)
		{
			ssg.firstElementChild.remove();
		}
		while (ssg.childElementCount < this.elementCount)
		{
			ssg.appendChild(document.createElementNS('http://www.w3.org/2000/svg','circle'));
			this.updateElement(ssg.childElementCount-1);
		}

		this.currentIndex = (this.currentIndex + 1) % this.elementCount;
		this.updateElement(this.currentIndex);

		this.updateSiblingIndices(ssg);
	}/* update */



	/**
	 * @param {number} index
	 */
	updateElement(index) {

		const element = /** @type {SVGElement} */ (ssg.children[index]);

		const newX = output.randomX();
		const newY = output.randomY();
		const newR = maths.getRandomIntInclusive(10,1000);

		element.setAttribute('cx', `${newX}`);
		element.setAttribute('cy', `${newY}`);
		element.setAttribute('r', `${newR}`);
	}



	unload() {
		// any other necessary tidy up
	}


	getForm() {
		const result = `
			<label for="module-elementCount">element count</label>
			<input id="module-elementCount" type="number" name="elementCount" title="element count" min="1" value="5" max="10"/>
		`;
		return result;
	}



	/**	@returns {number}	*/
	get elementCount() {
		return parseInt(this.element.elementCount.value);
	}


}/* CircleScreensaver */




export const instance = new CircleScreensaver();


