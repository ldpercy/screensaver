import { Screensaver } from "../screensaver.js";
import * as maths from "../../[html-common]/module/Maths.js";



console.log('circle module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc


const ssg = document.getElementById('screensaver-group');
const c = document.createElementNS('http://www.w3.org/2000/svg','circle');



class CircleScreensaver extends Screensaver {

	constructor() {
		super();
		console.log('CircleScreensaver constructor');
	}/* constructor */


	init() {
		console.log('CircleScreensaver init');
		//ssg.innerHTML = '<circle cx="30" cy="40" r="500"></circle>';
		this.moveCircle();
		ssg.appendChild(c);
	}



	start() {
		this.intervalId = setInterval(
			()=> { this.moveCircle() },
			1000
		);
		console.log(this.intervalId);
	}


	stop() {
		console.log('circle stop:', this.intervalId);
		clearInterval(this.intervalId);
		this.intervalId = undefined;
	}



	moveCircle() {

		const newX = maths.getRandomIntInclusive(-100,100);
		const newY = maths.getRandomIntInclusive(-100,100);
		const newR = maths.getRandomIntInclusive(10,1000);

		c.setAttribute('cx', `${newX}vw`);
		c.setAttribute('cy', `${newY}vh`);
		c.setAttribute('r', `${newR}`);
	}


	unload() {
		// any other necessary tidy up
	}

}/* CircleScreensaver */




export const instance = new CircleScreensaver();


