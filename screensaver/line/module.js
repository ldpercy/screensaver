import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { Screensaver } from "../screensaver.js";
import * as maths from "../../[html-common]/module/Maths.js";



console.log('line module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc



const ssg = document.getElementById('screensaver-group');
const l = document.createElementNS('http://www.w3.org/2000/svg','path');

class LineScreensaver extends Screensaver {

	elementMap = {
		lines			: 'input-lines',
	};


	constructor() {
		super();
		console.log('LineScreensaver constructor');
	}




	init() {
		console.log('LineScreensaver init');
		this.element = HTMLApp.buildElementMap(document, this.elementMap);
		//document.getElementById('screensaver-group').innerHTML = '<line x="-400" y="-300" width="600" height="500"></line>';
		this.moveLine();
		ssg.appendChild(l);
	}



	play() {
		this.intervalId = setInterval(
			()=> { this.moveLine() },
			2000
		);
		//console.log(this.intervalId);
	}


	pause() {
		//console.log('circle pause:', this.intervalId);
		clearInterval(this.intervalId);
		this.intervalId = undefined;
	}



	moveLine() {

		const x1 = maths.getRandomIntInclusive(-1200,+1200);
		const y1 = maths.getRandomIntInclusive(-1200,+1200);

		let linepoints = '';

		for (let i = 1; i <= this.lines; i++) {
			linepoints += ` ${maths.getRandomIntInclusive(-1200,+1200)},${maths.getRandomIntInclusive(-1200,+1200)}`
		}

		l.setAttribute('d', `M ${x1},${y1} ${linepoints}`);

	}


	settingChange() {
		this.moveLine();
	}



	getForm() {
		const result = `
			<label for="input-lines">line segments</label>
			<input id="input-lines" type="number" name="lines" title="lines" min="1" value="1" max="10"/>
		`;
		return result;
	}




	/**	@returns {number}	*/
	get lines() {
		return parseInt(this.element.lines.value);
	}

	/**	@param {number} lines	*/
	set lines(lines) {
		this.element.lines.value = Math.round(lines);
	}



}/* LineScreensaver */


export const instance = new LineScreensaver();