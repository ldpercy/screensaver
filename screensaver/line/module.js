import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { Screensaver } from "../screensaver.js";
import * as maths from "../../[html-common]/module/Maths.js";



console.log('line module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc



const ssg = document.getElementById('screensaver-group');

const intervalTime	= 1000;
const xMin			= -2400;
const xMax			= +2400;
const yMin			= -1200;
const yMax			= +1200;


class LineScreensaver extends Screensaver {




	elementMap = {
		lineType			: 'setting-lineType',
		lineCount			: 'setting-lineCount',
		lineSegments		: 'setting-lineSegments',
		output				: 'screensaver-output',
		svg					: 'screensaver-svg',
	};


	constructor() {
		super();
		console.log('LineScreensaver constructor');
	}




	init() {
		console.log('LineScreensaver init');
		this.element = HTMLApp.buildElementMap(document, this.elementMap);
		//document.getElementById('screensaver-group').innerHTML = '<line x="-400" y="-300" width="600" height="500"></line>';
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

		let d = '';

		const newElement = document.createElementNS('http://www.w3.org/2000/svg','path');

		if (ssg.hasChildNodes()) {
			newElement.setAttribute('d', ssg.lastElementChild.getAttribute('d'));
		}

		//ssg.appendChild(newElement);
		ssg.prepend(newElement);
		//ssg.prepend(newElement);

		//console.log(newElement);

		const startPoint = this.randomPoint();

		let linepoints = '';

		for (let i = 1; i <= this.lineSegments; i++) {
			linepoints += ` ${this.randomPoint()}`
		}

		while (ssg.childElementCount > this.lineCount)
		{
			ssg.lastElementChild.remove();
		}

		d = `M ${startPoint} ${linepoints}`;

		ssg.lastElementChild.setAttribute('d', d);


		// trying to get the viewport in svg units:
		//console.log('output.getBoundingClientRect', this.element.output.getBoundingClientRect());
		//console.log('output.getBBox', this.element.output.getBBox());
		//console.log('svg.getBoundingClientRect', this.element.svg.getBoundingClientRect());
		//console.log('svg.getBBox', this.element.svg.getBBox());

	}/* update */


	/** @return {string}  */
	randomPoint() {
		return `${maths.getRandomIntInclusive(xMin,xMax)},${maths.getRandomIntInclusive(yMin,yMax)}`;
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

			<label for="setting-lineCount">line count</label>
			<input id="setting-lineCount" type="number" name="lineCount" title="line count" min="1" value="1" max="10"/>

			<label for="setting-lineSegments">line segments</label>
			<input id="setting-lineSegments" type="number" name="lineSegments" title="line segments" min="1" value="1" max="10"/>
		`;
		return result;
	}


	//
	//	Acessors
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
	get lineCount() {
		return parseInt(this.element.lineCount.value);
	}

	/**	@param {number} lineCount	*/
	set lineCount(lineCount) {
		this.element.lineCount.value = Math.round(lineCount);
	}

	/**	@returns {number}	*/
	get lineSegments() {
		return parseInt(this.element.lineSegments.value);
	}

	/**	@param {number} lineSegments	*/
	set lineSegments(lineSegments) {
		this.element.lineSegments.value = Math.round(lineSegments);
	}



}/* LineScreensaver */


export const instance = new LineScreensaver();