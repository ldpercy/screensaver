import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { Screensaver } from "../screensaver.js";
import * as maths from "../../[html-common]/module/Maths.js";



//console.log('bezier module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc



const ssg = document.getElementById('screensaver-group');

const intervalTime	= 1000;
const xMin			= -2400;
const xMax			= +2400;
const yMin			= -1200;
const yMax			= +1200;


class BezierScreensaver extends Screensaver {

	currentChild = 0;


	elementMap = {
		lineType			: 'setting-lineType',
		pathCount			: 'setting-pathCount',
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

		while (ssg.childElementCount > this.pathCount)
		{
			ssg.lastElementChild.remove();
		}
		while (ssg.childElementCount < this.pathCount)
		{
			ssg.appendChild(this.newElement());
		}

		this.currentChild = (this.currentChild + 1) % this.pathCount;

		ssg.children[this.currentChild].setAttribute('d', this.newPathString(this.pathSections));

	}/* update */


	newElement() {
		const result = 	document.createElementNS('http://www.w3.org/2000/svg','path');
		result.setAttribute('d', this.newPathString(this.pathSections));
		return result;
	}

	/** @param {number} pathSections */
	newPathString(pathSections) {
		let result = '';
		const startPoint = this.randomPoint();
		let linepoints = '';

		for (let i = 1; i <= pathSections; i++) {
			linepoints += ` ${this.pointPair()}`
		}

		if (this.lineType === "quadraticClosed") {
			result = `M ${startPoint} Q  ${linepoints} ${this.randomPoint()} ${startPoint} z`;
		}
		else if (this.lineType === "smoothQuadraticOpen") {
			result = `M ${startPoint} T  ${linepoints}`;
		}
		else if (this.lineType === "smoothQuadraticClosed") {
			result = `M ${startPoint} T  ${linepoints} ${this.randomPoint()} ${startPoint} z`;
		}
		else {
			result = `M ${startPoint} Q  ${linepoints}`;
		}

		return result;
	}


	/** @return {string}  */
	randomPoint() {
		return `${maths.getRandomIntInclusive(xMin,xMax)},${maths.getRandomIntInclusive(yMin,yMax)}`;
	}

	randomPointConservative() {
		return `${maths.getRandomIntInclusive(xMin/2,xMax/2)},${maths.getRandomIntInclusive(yMin/2,yMax/2)}`;
	}

	/** @return {string}  */
	pointPair() {
		return `${this.randomPointConservative()} ${this.randomPoint()}`;
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




			<label for="setting-pathCount">path count</label>
			<input id="setting-pathCount" type="number" name="pathCount" title="path count" min="1" value="2" max="10"/>

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
	get pathCount() {
		return parseInt(this.element.pathCount.value);
	}

	/**	@param {number} pathCount	*/
	set pathCount(pathCount) {
		this.element.pathCount.value = Math.round(pathCount);
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