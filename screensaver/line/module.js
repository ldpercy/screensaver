import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { Screensaver } from "../screensaver.js";
import * as maths from "../../[html-common]/module/Maths.js";



console.log('line module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc



const ssg = document.getElementById('screensaver-group');
const l = document.createElementNS('http://www.w3.org/2000/svg','path');

class LineScreensaver extends Screensaver {

	elementMap = {
		lines			: 'input-lines',
		copies			: 'input-copies',
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
		ssg.appendChild(l);
	}



	play() {
		this.intervalId = setInterval(
			()=> { this.update() },
			1000
		);
		//console.log(this.intervalId);
	}


	pause() {
		//console.log('circle pause:', this.intervalId);
		clearInterval(this.intervalId);
		this.intervalId = undefined;
	}



	update() {

		const newNode = document.createElementNS('http://www.w3.org/2000/svg','path');
		ssg.appendChild(newNode);
		newNode.setAttribute('d', l.getAttribute('d'));


		const x1 = maths.getRandomIntInclusive(-1200,+1200);
		const y1 = maths.getRandomIntInclusive(-1200,+1200);

		let linepoints = '';

		for (let i = 1; i <= this.lines; i++) {
			linepoints += ` ${maths.getRandomIntInclusive(-1200,+1200)},${maths.getRandomIntInclusive(-1200,+1200)}`
		}

		newNode.setAttribute('d', `M ${x1},${y1} ${linepoints}`);


		if (ssg.childElementCount > this.copies)
		{
			ssg.firstElementChild.remove();
		}


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
			<label for="input-lines">line segments</label>
			<input id="input-lines" type="number" name="lines" title="lines" min="1" value="1" max="10"/>

			<label for="input-copies">copies</label>
			<input id="input-copies" type="number" name="copies" title="copies" min="1" value="1" max="10"/>
		`;
		return result;
	}


	//
	//	Acessors
	//

	/**	@returns {number}	*/
	get lines() {
		return parseInt(this.element.lines.value);
	}

	/**	@param {number} lines	*/
	set lines(lines) {
		this.element.lines.value = Math.round(lines);
	}

	/**	@returns {number}	*/
	get copies() {
		return parseInt(this.element.copies.value);
	}

	/**	@param {number} copies	*/
	set copies(copies) {
		this.element.copies.value = Math.round(copies);
	}



}/* LineScreensaver */


export const instance = new LineScreensaver();