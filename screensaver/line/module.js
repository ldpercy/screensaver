
import { Screensaver } from "../screensaver.js";
import * as maths from "../../[html-common]/module/Maths.js";



console.log('line module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc



const ssg = document.getElementById('screensaver-group');
const l = document.createElementNS('http://www.w3.org/2000/svg','line');

class LineScreensaver extends Screensaver {


	constructor() {
		super();
		console.log('LineScreensaver constructor');
	}

	init() {
		console.log('LineScreensaver init');
		//document.getElementById('screensaver-group').innerHTML = '<line x="-400" y="-300" width="600" height="500"></line>';
		this.moveLine();
		ssg.appendChild(l);
	}



	start() {
		this.intervalId = setInterval(
			()=> { this.moveLine() },
			2000
		);
		console.log(this.intervalId);
	}


	stop() {
		console.log('circle stop:', this.intervalId);
		clearInterval(this.intervalId);
		this.intervalId = undefined;
	}



	moveLine() {

		const newX1 = maths.getRandomIntInclusive(-100,100);
		const newY1 = maths.getRandomIntInclusive(-100,100);

		const newX2 = maths.getRandomIntInclusive(-100,100);
		const newY2 = maths.getRandomIntInclusive(-100,100);

		l.setAttribute('x1', `${newX1}vw`);
		l.setAttribute('y1', `${newY1}vh`);
		l.setAttribute('x2', `${newX2}vw`);
		l.setAttribute('y2', `${newY2}vw`);

	}




}/* LineScreensaver */


export const instance = new LineScreensaver();