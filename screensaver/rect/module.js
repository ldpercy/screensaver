import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { Screensaver } from "../screensaver.js";
import * as maths from "../../[html-common]/module/Maths.js";
import { output } from "../../app/screensaver-output.js";


console.log('rect module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc



const ssg = document.getElementById('screensaver-group');
const r = document.createElementNS('http://www.w3.org/2000/svg','rect');

class RectScreensaver extends Screensaver {

	currentIndex = 0;

	constructor() {
		super();
		console.log('RectScreensaver constructor');
	}

	elementMap = {
		elementCount		: 'module-elementCount',
	};

	init() {
		//console.log('RectScreensaver init');
		//document.getElementById('screensaver-group').innerHTML = '<rect x="-400" y="-300" width="600" height="500"></rect>';
		this.element = HTMLApp.buildElementMap(document, this.elementMap);
		this.update();
	}



	play() {
		this.intervalId = setInterval(
			()=> { this.update() },
			1000
		);
		//console.log(this.intervalId);
	}


	pause() {
		//console.log('circle stop:', this.intervalId);
		clearInterval(this.intervalId);
		this.intervalId = undefined;
	}


	update() {

		while (ssg.childElementCount > this.elementCount)
		{
			ssg.lastElementChild.remove();
		}
		while (ssg.childElementCount < this.elementCount)
		{
			ssg.appendChild(this.newElement());
		}

		this.currentIndex = (this.currentIndex + 1) % this.elementCount;

		this.updateRect(/** @type {SVGElement} */ (ssg.children[this.currentIndex]), this.currentIndex);

	}/* update */

	/**
	 * @param {SVGElement} rectElement
	 * @param {number} index
	 */
	updateRect(rectElement, index) {

		const newX = output.randomX();
		const newY = output.randomY();
		const newWidth = maths.getRandomIntInclusive(10,1000);
		const newHeight = maths.getRandomIntInclusive(10,1000);
		const rotate = maths.getRandomIntInclusive(-360,360);

		const degrees = index * (360 / this.elementCount);
		rectElement.style.setProperty('--degrees', `${Math.round(degrees)}`);

		rectElement.setAttribute('x', `${newX}`);
		rectElement.setAttribute('y', `${newY}`);
		rectElement.setAttribute('width', `${newWidth}`);
		rectElement.setAttribute('height', `${newHeight}`);

		rectElement.style.setProperty('rotate', `${rotate}deg`);
	}


	newElement() {
		const result = 	document.createElementNS('http://www.w3.org/2000/svg','rect');
		this.updateRect(result, ssg.childElementCount||0);
		return result;
	}


	getForm() {
		const result = `
			<label for="module-elementCount">element count</label>
			<input id="module-elementCount" type="number" name="elementCount" title="element count" min="1" value="3" max="10"/>
		`;
		return result;
	}



	/**	@returns {number}	*/
	get elementCount() {
		return parseInt(this.element.elementCount.value);
	}


}/* RectScreensaver */


export const instance = new RectScreensaver();