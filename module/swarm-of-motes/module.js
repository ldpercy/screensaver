/*
**	Swarm of motes
**
**	from:	https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/Namespaces_crash_course/Example
*/


import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { ScreensaverBase } from "../screensaver-base.js";
import { output } from "../../app/output.js";
import { form  } from './form.js';
import { Mote } from './mote.js';

const ssg = document.getElementById('screensaver-group');



class SwarmOfMotesScreensaver extends ScreensaverBase {

	currentIndex = 0;
	moteSwarm = [];

	elementMap = {
		// lineType			: 'setting-lineType',
		// elementCount		: 'setting-elementCount',
		// pathSections		: 'setting-pathSections',
		output				: 'screensaver-output',
		svg					: 'screensaver-svg',
	};


	constructor() {
		super();
		//console.log('LineScreensaver constructor');
	}


	init() {
		//console.log('LineScreensaver init');
		this.element = HTMLApp.buildElementMap(document, this.elementMap);
		super.init();
		this.update();
	}



	update() {

		while (ssg.childElementCount > form.elementCount)
		{
			ssg.firstElementChild.remove();
		}
		while (ssg.childElementCount < form.elementCount)
		{
			ssg.appendChild(document.createElementNS('http://www.w3.org/2000/svg','path'));
			this.updateElement(ssg.childElementCount-1);
		}


		//insert from orig


		// How many motes should there be?
		let num = parseInt(document.getElementById("num_motes").value, 10);
		if (num < 0) {
			num = 0;
		}

		// Make sure we have exactly that many...
		// Too few?
		while (motes.length < num) {
			motes.push(new Mote());
		}

		// Or too many?
		if (num === 0) {
			motes = [];
		} else if (motes.length > num) {
			motes = motes.slice(0, num - 1);
		}

		// Move a random mote
		if (motes.length > 0) {
			motes[Rand(motes.length)].move();
		}
		//insert from orig


		this.updateSiblingIndices(ssg);

	}/* update */



	/**
	 * @param {number} index
	 */
	updateElement(index) {
		const element = /** @type {SVGElement} */ (ssg.children[index]);

		element.setAttribute('d', this.newPathString(form.pathSections));
	}



	/** @param {number} pathSections */
	newPathString(pathSections) {
		const startPoint = output.randomPoint();
		let linepoints = '';

		for (let i = 1; i <= pathSections; i++) {
			linepoints += ` ${output.randomPoint()}`
		}

		const result = `M ${startPoint} ${linepoints}`;
		return result;
	}





	settingChange() {
		this.update();
	}



	getForm() {
		return form.html;
	}






}/* SwarmOfMotesScreensaver */


export const instance = new SwarmOfMotesScreensaver();