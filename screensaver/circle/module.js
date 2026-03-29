import { Screensaver } from "../screensaver.js";
import * as maths from "../../[html-common]/module/Maths.js";


let intervalId;
const ssg = document.getElementById('screensaver-group');


console.log('circle module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc


const c = document.createElementNS('http://www.w3.org/2000/svg','circle');



class CircleScreensaver extends Screensaver {

	constructor() {
		super();

		console.log('CircleScreensaver constructor');

	}


	init() {

		//ssg.innerHTML = '<circle cx="30" cy="40" r="500"></circle>';

		ssg.appendChild(c);

		//moveCircle();

		// intervalId = setInterval(
		// 	()=> { moveCircle() },
		// 	1000
		// );

	}

	intervalAnimate() {

		const newX = maths.getRandomIntInclusive(-100,100);
		const newY = maths.getRandomIntInclusive(-100,100);
		const newR = maths.getRandomIntInclusive(10,1000);

		c.setAttribute('cx', `${newX}vw`);
		c.setAttribute('cy', `${newY}vh`);
		c.setAttribute('r', `${newR}`);

	}


	unload() {
		clearInterval(intervalId);
	}

}/* CircleScreensaver */




export const screensaverInstance = new CircleScreensaver();







