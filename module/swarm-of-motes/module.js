/*
**	Swarm of motes
**
**	from:	https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/Namespaces_crash_course/Example
*/


import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { ScreensaverBase } from "../screensaver-base.js";
import { output, outputSpace } from "../../app/output.js";
import { form  } from './form.js';
import { Mote } from './mote.js';

const ssg = document.getElementById('screensaver-group');



class SwarmOfMotesScreensaver extends ScreensaverBase {

	currentIndex = 0;
	moteSwarm = [];

	mousePosition = outputSpace.newCartesianCoordinates();


	elementMap = {
		// lineType			: 'setting-lineType',
		// elementCount		: 'setting-elementCount',
		// pathSections		: 'setting-pathSections',
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

		// while (ssg.childElementCount > form.elementCount)
		// {
		// 	ssg.firstElementChild.remove();
		// }
		// while (ssg.childElementCount < form.elementCount)
		// {
		// 	ssg.appendChild(document.createElementNS('http://www.w3.org/2000/svg','path'));
		// 	this.updateElement(ssg.childElementCount-1);
		// }


		//insert from orig


		// How many motes should there be?
		let num = form.elementCount;
		if (num < 0) {
			num = 0;
		}

		// Make sure we have exactly that many...
		// Too few?
		while (this.moteSwarm.length < num) {
			this.moteSwarm.push(new Mote());
		}

		// Or too many?
		if (num === 0) {
			this.moteSwarm = [];
		} else if (this.moteSwarm.length > num) {
			this.moteSwarm = this.moteSwarm.slice(0, num - 1);
		}

		// Move a random mote
		if (this.moteSwarm.length > 0) {
			this.moteSwarm[Rand(this.moteSwarm.length)].move();
		}
		//insert from orig


		this.updateSiblingIndices(ssg);

	}/* update */




	// Determine average (x,y) of the swarm
	averageMotePosition() {
		if (!this.moteSwarm || this.moteSwarm.length === 0) {
			return [0, 0];
		}

		let sum_x = 0;
		let sum_y = 0;
		for (const mote of this.moteSwarm) {
			sum_x += mote.x;
			sum_y += mote.y;
		}

		return [sum_x / this.moteSwarm.length, sum_y / this.moteSwarm.length];
	}



	onMouseMove(evt) {
		this.mousePosition.x = evt.clientX;
		this.mousePosition.y = evt.clientY;

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