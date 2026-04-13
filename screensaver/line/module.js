import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { Screensaver } from "../screensaver.js";
import { output } from "../../app/screensaver-output.js";


console.log('line module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc



const ssg = document.getElementById('screensaver-group');

const intervalTime	= 1000;



class LineScreensaver extends Screensaver {

	currentIndex = 0;


	elementMap = {
		lineType			: 'setting-lineType',
		elementCount		: 'setting-elementCount',
		pathSections		: 'setting-pathSections',
		output				: 'screensaver-output',
		svg					: 'screensaver-svg',
	};


	constructor() {
		super();
		//console.log('LineScreensaver constructor');
	}




	init() {
		//console.log('LineScreensaver init');
		this.element = HTMLApp.buildElementMap(document, this.elementMap);
		this.update();
	}



	play() {
		this.intervalId = setInterval(
			()=> { this.update() },
			intervalTime
		);
		//console.log(this.intervalId);
	}


	pause() {
		//console.log('circle pause:', this.intervalId);
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
			ssg.appendChild(document.createElementNS('http://www.w3.org/2000/svg','path'));
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

		element.setAttribute('d', this.newPathString(this.pathSections));
		element.style.setProperty('--sibling-index', `${index+1}`);
		element.style.setProperty('--sibling-count', `${this.elementCount}`);
	}



	/** @param {number} pathSections */
	newPathString(pathSections) {
		const startPoint = output.randomPoint();
		let linepoints = '';

		for (let i = 1; i <= pathSections; i++) {
			linepoints += ` ${output.randomPoint()}`
		}

		const result = `M ${startPoint} ${linepoints}`;
		return result;
	}





	settingChange() {
		this.update();
	}



	getForm() {
		const result = `
			<!--
			<label for="setting-lineType">type</label>
			<select id="setting-lineType" name="lineType" title="line type" size=3">
				<option selected>straight</option>
				<option>quadratic</option>
				<option>cubic</option>
			</select>
			-->

			<label for="setting-elementCount">element count</label>
			<input id="setting-elementCount" type="number" name="elementCount" title="path count" min="1" value="2" max="10"/>

			<label for="setting-pathSections">line sections</label>
			<input id="setting-pathSections" type="number" name="pathSections" title="line sections" min="1" value="2" max="10"/>
		`;
		return result;
	}


	//
	//	Accessors
	//


	/**	@returns {string}	*/
	get lineType() {
		return this.element.lineType.value;
	}

	/**	@param {number} lineType	*/
	set lineType(lineType) {
		this.element.lineType.value = lineType;
	}


	/**	@returns {number}	*/
	get elementCount() {
		return parseInt(this.element.elementCount.value);
	}

	/**	@param {number} elementCount	*/
	set elementCount(elementCount) {
		this.element.elementCount.value = Math.round(elementCount);
	}

	/**	@returns {number}	*/
	get pathSections() {
		return parseInt(this.element.pathSections.value);
	}

	/**	@param {number} pathSections	*/
	set pathSections(pathSections) {
		this.element.pathSections.value = Math.round(pathSections);
	}



}/* LineScreensaver */


export const instance = new LineScreensaver();