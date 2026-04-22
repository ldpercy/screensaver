import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import * as planarSpace from "../../[html-common]/module/PlanarSpace.js";
import { ScreensaverBase } from "../screensaver-base.js";
import { output } from "../../app/screensaver-output.js";
import { form  } from './form.js';


//console.log('foldout module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc


/**
 * @typedef {Array<planarSpace.CartesianCoordinates>} Segment
 */


const ssg = document.getElementById('screensaver-group');



class FoldoutScreensaver extends ScreensaverBase {

	currentIndex = 0;


	/** @type Segment */
	headSegment = [];



	elementMap = {
		//settings			: 'form-moduleSettings',
		elementCount		: 'module-elementCount',
		output				: 'screensaver-output',
		svg					: 'screensaver-svg',
	};


	constructor() {
		super();
		//console.log('FoldoutScreensaver constructor');
	}

	init() {
		//console.log('FoldoutScreensaver init');
		this.element = HTMLApp.buildElementMap(document, this.elementMap);
		super.init();
		form.init();
		this.update();
	}

	getForm() {
		return form.html;
	}

	update() {

		let newElement;
		let newPath;
		let newSegment;
		let previousHead;

		while (ssg.childElementCount >= form.elementCount)
		{
			ssg.firstElementChild.remove();
		}
		while (ssg.childElementCount < form.elementCount)
		{

			previousHead = ssg.lastElementChild;
			newElement = document.createElementNS('http://www.w3.org/2000/svg','path');
			ssg.appendChild(newElement);

			newSegment = this.newSegment(this.headSegment, form.retainPoints, form.headPoints);
			newPath = this.getSegmentPath(newSegment);

			newElement.setAttribute('d', newPath);

			//this.headSegment = this.newElement(this.headSegment, this.headPoints, this.retainPoints);

			if (previousHead) {
				ssg.appendChild(previousHead);
				previousHead.setAttribute('d', newPath);
			}
			this.headSegment = newSegment;

		}

		this.updateSiblingIndices(ssg);
	}/* update */


	/** @param {Segment} segment */
	getSegmentPath(segment) {
		//const startPoint = output.randomCartesian();

		let pathpoints = segment.reduce(
			(str, point) =>
			{
				return str + ` ${point.x},${point.y}`;
			},
			''
		);

		//console.log('pathpoints',pathpoints);

		const result = `M ${pathpoints} z`;
		return result;
	}


	/**
	 * @param {Segment} sourceSegment
	 * @param {number}	retainPoints
	 * @param {number}	pointCount
	 * @returns {Segment}
	 */
	newSegment(sourceSegment, retainPoints, pointCount) {

		let result = sourceSegment.slice(-retainPoints);

		while (result.length < pointCount) {
			result.push(output.randomCartesian());
		}
		//console.log('newSegment', result);
		return result;
	}



	// settingChange() {
	// 	this.update();
	// }


}/* FoldoutScreensaver */


export const instance = new FoldoutScreensaver();