import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { ScreensaverBase } from "../screensaver-base.js";
import * as maths from "../../[html-common]/module/Maths.js";
import { output } from "../../app/screensaver-output.js";


//console.log('rect module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc



const ssg = document.getElementById('screensaver-group');
const r = document.createElementNS('http://www.w3.org/2000/svg','rect');

class RectScreensaver extends ScreensaverBase {

	currentIndex = 0;

	constructor() {
		super();
		//console.log('RectScreensaver constructor');
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




	update() {

		while (ssg.childElementCount > this.elementCount)
		{
			ssg.firstElementChild.remove();
		}
		while (ssg.childElementCount < this.elementCount)
		{
			ssg.appendChild(document.createElementNS('http://www.w3.org/2000/svg','rect'));
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

		const x = output.randomX();
		const y = output.randomY();
		const width = maths.getRandomIntInclusive(10,1000);
		const height = maths.getRandomIntInclusive(10,1000);
		const rotate = maths.getRandomIntInclusive(-360,360);

		element.setAttribute('x', `${x}`);
		element.setAttribute('y', `${y}`);
		element.setAttribute('width', `${width}`);
		element.setAttribute('height', `${height}`);

		//element.style.setProperty('rotate', `${rotate}deg`);
		element.setAttribute('transform',`rotate(${rotate},${x},${y})`);
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


}/* RectScreensaver */


export const instance = new RectScreensaver();