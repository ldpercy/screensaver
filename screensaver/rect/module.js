
import { Screensaver } from "../screensaver.js";
import * as maths from "../../[html-common]/module/Maths.js";



console.log('rect module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc



const ssg = document.getElementById('screensaver-group');
const r = document.createElementNS('http://www.w3.org/2000/svg','rect');

class RectScreensaver extends Screensaver {


	constructor() {
		super();
		console.log('RectScreensaver constructor');
	}

	init() {
		console.log('RectScreensaver init');
		//document.getElementById('screensaver-group').innerHTML = '<rect x="-400" y="-300" width="600" height="500"></rect>';
		this.moveRect();
		ssg.appendChild(r);
	}



	play() {
		this.intervalId = setInterval(
			()=> { this.moveRect() },
			2000
		);
		//console.log(this.intervalId);
	}


	pause() {
		//console.log('circle stop:', this.intervalId);
		clearInterval(this.intervalId);
		this.intervalId = undefined;
	}



	moveRect() {

		const newX = maths.getRandomIntInclusive(-100,100);
		const newY = maths.getRandomIntInclusive(-100,100);
		const newWidth = maths.getRandomIntInclusive(10,1000);
		const newHeight = maths.getRandomIntInclusive(10,1000);
		const rotate = maths.getRandomIntInclusive(0,360);

		r.setAttribute('x', `${newX}vw`);
		r.setAttribute('y', `${newY}vh`);
		r.setAttribute('width', `${newWidth}px`);
		r.setAttribute('height', `${newHeight}px`);

		r.setAttribute('style', `rotate:${rotate}deg`);
	}




}/* RectScreensaver */


export const instance = new RectScreensaver();