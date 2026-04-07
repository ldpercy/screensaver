import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { Screensaver } from "../screensaver.js";
import * as maths from "../../[html-common]/module/Maths.js";



console.log('line module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc



const ssg = document.getElementById('screensaver-group');


class LineScreensaver extends Screensaver {


	intervalTime = 1000;


	elementMap = {
		lineCount			: 'setting-line-count',
		lineSegments		: 'setting-line-segments',
		output				: 'output',
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
			this.intervalTime
		);
		//console.log(this.intervalId);
	}


	pause() {
		//console.log('circle pause:', this.intervalId);
		clearInterval(this.intervalId);
		this.intervalId = undefined;
	}



	update() {

		const newElement = document.createElementNS('http://www.w3.org/2000/svg','path');

		if (ssg.hasChildNodes()) {
			newElement.setAttribute('d', ssg.lastElementChild.getAttribute('d'));
		}

		//ssg.appendChild(newElement);
		ssg.prepend(newElement);
		//ssg.prepend(newElement);

		console.log(newElement);


		const x1 = maths.getRandomIntInclusive(-2400,+2400);
		const y1 = maths.getRandomIntInclusive(-1200,+1200);

		let linepoints = '';

		for (let i = 1; i <= this.lineSegments; i++) {
			linepoints += ` ${maths.getRandomIntInclusive(-1200,+1200)},${maths.getRandomIntInclusive(-1200,+1200)}`
		}



		while (ssg.childElementCount > this.lineCount)
		{
			ssg.lastElementChild.remove();
		}

		ssg.lastElementChild.setAttribute('d', `M ${x1},${y1} ${linepoints}`);
		// trying to get the viewport in svg units:
		//console.log('output.getBoundingClientRect', this.element.output.getBoundingClientRect());
		//console.log('output.getBBox', this.element.output.getBBox());
		//console.log('svg.getBoundingClientRect', this.element.svg.getBoundingClientRect());
		//console.log('svg.getBBox', this.element.svg.getBBox());

	}/* update */


	settingChange() {
		this.update();
	}



	getForm() {
		const result = `
			<label for="setting-line-count">line count</label>
			<input id="setting-line-count" type="number" name="lineCount" title="line count" min="1" value="1" max="10"/>

			<label for="setting-line-segments">line segments</label>
			<input id="setting-line-segments" type="number" name="lineSegments" title="line segments" min="1" value="1" max="10"/>
		`;
		return result;
	}


	//
	//	Acessors
	//

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