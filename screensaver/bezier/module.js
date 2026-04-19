import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { ScreensaverBase } from "../screensaver-base.js";
import { output } from "../../app/screensaver-output.js";
import { form  } from './form.js';




//console.log('bezier module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc



const ssg = document.getElementById('screensaver-group');

const intervalTime	= 1000;


class BezierScreensaver extends ScreensaverBase {

	currentIndex = 0;


	elementMap = {
		lineType			: 'setting-lineType',
		elementCount		: 'setting-elementCount',
		pathSections		: 'setting-pathSections',
		output				: 'screensaver-output',
		svg					: 'screensaver-svg',
	};


	constructor() {
		super();
		//console.log('BezierScreensaver constructor');
	}


	getForm() {
		return form.html;
	}


	init() {
		//console.log('BezierScreensaver init');
		super.init();
		this.element = HTMLApp.buildElementMap(document, this.elementMap);
		form.init();
		this.update();
	}



	play() {
		this.intervalId = setInterval(
			()=> { this.update() },
			intervalTime
		);
		//console.log(this.intervalId);
	}


	pause() {
		//console.log('circle pause:', this.intervalId);
		clearInterval(this.intervalId);
		this.intervalId = undefined;
	}


	update() {

		while (ssg.childElementCount > form.elementCount)
		{
			ssg.lastElementChild.remove();
		}
		while (ssg.childElementCount < form.elementCount)
		{
			ssg.appendChild(document.createElementNS('http://www.w3.org/2000/svg','path'));
			this.updateElement(ssg.childElementCount-1);
		}

		this.currentIndex = (this.currentIndex + 1) % form.elementCount;

		this.updateElement(this.currentIndex);

		this.updateSiblingIndices(ssg);

	}/* update */


	/**
	 * @param {number} index
	 */
	updateElement(index) {
		const element = /** @type {SVGElement} */ (ssg.children[index]);
		//console.log(element);
		element.setAttribute('d', this.newPathString(form.pathSections));
	}





	// newElement() {
	// 	const result = 	document.createElementNS('http://www.w3.org/2000/svg','path');
	// 	result.setAttribute('d', this.newPathString(this.pathSections));
	// 	return result;
	// }

	/** @param {number} pathSections */
	newPathString(pathSections) {
		let result = '';
		const startPoint = output.randomPoint();
		let linepoints = '';

		for (let i = 1; i <= pathSections; i++) {
			linepoints += ` ${this.pointPair()}`
		}

		console.log(form.lineType);

		switch (form.lineType) {
			case "quadraticOpen":
				result = `M ${startPoint} Q  ${linepoints}`;
				break;
			case "quadraticClosed":
				result = `M ${startPoint} Q  ${linepoints} ${output.randomPoint()} ${startPoint} z`;
				break;
			case "smoothQuadraticOpen":
				result = `M ${startPoint} T  ${linepoints}`;
				break;
			case "smoothQuadraticClosed":
				result = `M ${startPoint} T  ${linepoints} ${output.randomPoint()} ${startPoint} z`;
				break;
			default:
				break;
		}

		return result;
	}

	/**  */
	quadraticOpen(sections) {

	}


	/** @return {string}  */
	pointPair() {
		return `${output.randomPointConservative()} ${output.randomPoint()}`;
	}


	settingChange() {
		this.update();
	}


}/* BezierScreensaver */


export const instance = new BezierScreensaver();