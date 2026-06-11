/*
**	Swarm of motes
**
**	Adapted from:	https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/Namespaces_crash_course/Example
*/


import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { ScreensaverBase } from "../screensaver-base.js";
import { output, outputSpace } from "../../app/output.js";
import { form  } from './form.js';
import { Mote } from './mote.js';
import { CartesianCoordinates } from "../../[html-common]/module/PlanarSpace.js";

const ssg = document.getElementById('screensaver-group');



class SwarmOfMotesScreensaver extends ScreensaverBase {

	currentIndex = 0;
	/** @type {Array<Mote>} */
	moteSwarm = [];

	mousePosition = outputSpace.newCartesianCoordinates();


	elementMap = {
		output				: 'screensaver-output',
		svg					: 'screensaver-svg',
		group				: 'screensaver-group',
	};


	constructor() {
		super();
		//console.log('LineScreensaver constructor');
	}


	init() {
		//console.log('LineScreensaver init');
		this.element = HTMLApp.buildElementMap(document, this.elementMap);
		super.init();
		form.init();
		this.element.output.addEventListener(
			'mousemove',
			this.onMouseMove.bind(this)
		);
		this.update();
	}


	unload() {
		this.element.output.removeEventListener(
			'mousemove',
			this.onMouseMove.bind(this)
		);
	}

	getForm() {
		return form.html;
	}

	settingChange() {
		this.update();
	}


	update() {

		while (ssg.childElementCount > form.elementCount)
		{
			this.moteSwarm.pop();
			ssg.lastElementChild.remove();
		}
		while (ssg.childElementCount < form.elementCount)
		{
			this.moteSwarm.push(new Mote());
		}


		//insert from orig


		// // How many motes should there be?
		// let num = form.elementCount;
		// if (num < 0) {
		// 	num = 0;
		// }

		// // Make sure we have exactly that many...
		// // Too few?
		// while (this.moteSwarm.length < num) {
		// 	this.moteSwarm.push(new Mote());
		// }

		// // Or too many?
		// if (num === 0) {
		// 	this.moteSwarm = [];
		// } else if (this.moteSwarm.length > num) {
		// 	this.moteSwarm = this.moteSwarm.slice(0, num - 1);
		// }

		// Move a random mote
		if (this.moteSwarm.length > 0) {
			this.moteSwarm[Rand(this.moteSwarm.length)].move();
		}
		//insert from orig


		this.updateSiblingIndices(ssg);

	}/* update */



	/** Determine average (x,y) of the swarm
	 * @returns {CartesianCoordinates}
	 */
	averageMotePosition() {
		let result = outputSpace.newCartesianCoordinates();

		let sum_x = 0;
		let sum_y = 0;
		for (const mote of this.moteSwarm) {
			sum_x += mote.position.x;
			sum_y += mote.position.y;
		}

		result.x = sum_x / this.moteSwarm.length;
		result.y = sum_y / this.moteSwarm.length;

		return result;
	}


	/** @param {MouseEvent} event */
	onMouseMove(event) {

		const domPoint = new DOMPoint(event.clientX, event.clientY);
		// Get point in page SVG space
		const svgPoint = domPoint.matrixTransform(this.element.svg.getScreenCTM().inverse());
		this.mousePosition.x = svgPoint.x;
		this.mousePosition.y = svgPoint.y;

		// const widget = document.getElementById("cursor");
		// widget.setAttributeNS(null, "cx", mouse_x);
		// widget.setAttributeNS(null, "cy", mouse_y);
	}









}/* SwarmOfMotesScreensaver */


// A nicer, integer random
export function Rand(modulo) {
	return Math.round(Math.random() * (modulo - 1));
}



export const instance = new SwarmOfMotesScreensaver();