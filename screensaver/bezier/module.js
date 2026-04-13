import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { Screensaver } from "../screensaver.js";
import { output } from "../../app/screensaver-output.js";



//console.log('bezier module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc



const ssg = document.getElementById('screensaver-group');

const intervalTime	= 1000;


class BezierScreensaver extends Screensaver {

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
		//console.log('BezierScreensaver constructor');
	}




	init() {
		//console.log('BezierScreensaver init');
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
		//console.log(element);
		element.setAttribute('d', this.newPathString(this.pathSections));

		const degrees = index * (360 / this.elementCount);
		element.style.setProperty('--degrees', `${Math.round(degrees)}`);
	}





	// newElement() {
	// 	const result = 	document.createElementNS('http://www.w3.org/2000/svg','path');
	// 	result.setAttribute('d', this.newPathString(this.pathSections));
	// 	return result;
	// }

	/** @param {number} pathSections */
	newPathString(pathSections) {
		let result = '';
		const startPoint = output.randomPoint();
		let linepoints = '';

		for (let i = 1; i <= pathSections; i++) {
			linepoints += ` ${this.pointPair()}`
		}

		if (this.lineType === "quadraticClosed") {
			result = `M ${startPoint} Q  ${linepoints} ${output.randomPoint()} ${startPoint} z`;
		}
		else if (this.lineType === "smoothQuadraticOpen") {
			result = `M ${startPoint} T  ${linepoints}`;
		}
		else if (this.lineType === "smoothQuadraticClosed") {
			result = `M ${startPoint} T  ${linepoints} ${output.randomPoint()} ${startPoint} z`;
		}
		else {
			result = `M ${startPoint} Q  ${linepoints}`;
		}

		return result;
	}



	/** @return {string}  */
	pointPair() {
		return `${output.randomPointConservative()} ${output.randomPoint()}`;
	}


	settingChange() {
		this.update();
	}



	getForm() {
		const result = `
			<label for="setting-lineType">type</label>
			<select id="setting-lineType" name="lineType" title="line type" size="7">
				<option value="quadraticOpen">quadratic - open</option>
				<option value="quadraticClosed">quadratic - closed</option>
				<option value="smoothQuadraticOpen" selected>smooth quadratic - open</option>
				<option value="smoothQuadraticClosed">smooth quadratic - closed</option>

				<!-- <option>cubic</option> -->
			</select>




			<label for="setting-elementCount">element count</label>
			<input id="setting-elementCount" type="number" name="elementCount" title="path count" min="1" value="2" max="10"/>

			<label for="setting-pathSections">path sections</label>
			<input id="setting-pathSections" type="number" name="pathSections" title="path sections" min="1" value="2" max="10"/>
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



}/* BezierScreensaver */


export const instance = new BezierScreensaver();