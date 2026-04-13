import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { Screensaver } from "../screensaver.js";
import * as maths from "../../[html-common]/module/Maths.js";
import { output } from "../../app/screensaver-output.js";


console.log('circle module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc


/** @type {HTMLElement} */
const ssg = document.getElementById('screensaver-group');

const c = document.createElementNS('http://www.w3.org/2000/svg','circle');



class CircleScreensaver extends Screensaver {

	currentIndex = 0;

	constructor() {
		super();
		console.log('CircleScreensaver constructor');
	}/* constructor */


	elementMap = {
		elementCount		: 'module-elementCount',
	};



	init() {
		//console.log('CircleScreensaver init');
		this.element = HTMLApp.buildElementMap(document, this.elementMap);
		this.update();
	}



	play() {
		this.intervalId = setInterval(
			()=> { this.update() },
			1000
		);
		//console.log('intervalId',this.intervalId);
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
			ssg.appendChild(document.createElementNS('http://www.w3.org/2000/svg','circle'));
			this.updateElement(ssg.childElementCount-1);
		}

		this.currentIndex = (this.currentIndex + 1) % this.elementCount;
		this.updateElement(this.currentIndex);

	}/* update */



	/**
	 * @param {number} index
	 */
	updateElement(index) {

		const element = /** @type {SVGElement} */ (ssg.children[index]);

		const newX = output.randomX();
		const newY = output.randomY();
		const newR = maths.getRandomIntInclusive(10,1000);

		element.style.setProperty('--sibling-index', `${index+1}`);
		element.style.setProperty('--sibling-count', `${this.elementCount}`);

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
			<input id="module-elementCount" type="number" name="elementCount" title="element count" min="1" value="3" max="10"/>
		`;
		return result;
	}



	/**	@returns {number}	*/
	get elementCount() {
		return parseInt(this.element.elementCount.value);
	}


}/* CircleScreensaver */




export const instance = new CircleScreensaver();


