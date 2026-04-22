import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import * as planarSpace from "../../[html-common]/module/PlanarSpace.js";
import { ScreensaverBase } from "../screensaver-base.js";
import { output } from "../../app/screensaver-output.js";


//console.log('foldout module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc


/**
 * @typedef {Array<planarSpace.CartesianCoordinates>} Segment
 */


const ssg = document.getElementById('screensaver-group');

const intervalTime	= 1000;



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
		this.update();
	}



	update() {

		let newElement;
		let newPath;
		let newSegment;
		let previousHead;

		while (ssg.childElementCount >= this.elementCount)
		{
			ssg.firstElementChild.remove();
		}
		while (ssg.childElementCount < this.elementCount)
		{

			previousHead = ssg.lastElementChild;
			newElement = document.createElementNS('http://www.w3.org/2000/svg','path');
			ssg.appendChild(newElement);

			newSegment = this.newSegment(this.headSegment, this.retainPoints, this.headPoints);
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




	settingChange() {
		this.update();
	}




	//
	//	form & accessors
	//


	getForm() {
		const result = `
			<!--
			<label for="module-elementCount">element count</label>
			<input id="module-elementCount" type="number" name="elementCount" title="path count" min="1" value="1" max="10"/>
			-->


			<label for="module-elementCount">element count</label>
			<input id="module-elementCount" type="number" name="elementCount" title="element count" min="1" value="4" max="10"/>


			<label for="module-headPoints">head points</label>
			<input id="module-headPoints" type="number" name="headPoints" title="head points" min="2" value="3" max="5"/>

			<label for="module-retainPoints">retain points</label>
			<input id="module-retainPoints" type="number" name="retainPoints" title="retain points" min="1" value="2" max="4"/>

		`;
		return result;
	}




	/**	@returns {number}	*/
	get headPoints() {
		return parseInt(this.form.headPoints.value);
	}

	/**	@param {number} headPoints	*/
	set headPoints(headPoints) {
		this.form.headPoints.value = Math.round(headPoints);
	}



	/**	@returns {number}	*/
	get elementCount() {
		return parseInt(this.form.elementCount.value);
	}

	/**	@param {number} elementCount	*/
	set elementCount(elementCount) {
		this.form.elementCount.value = Math.round(elementCount);
	}


	/**	@returns {number}	*/
	get retainPoints() {
		return parseInt(this.form.retainPoints.value);
	}

	/**	@param {number} retainPoints	*/
	set retainPoints(retainPoints) {
		this.form.retainPoints.value = Math.round(retainPoints);
	}



}/* FoldoutScreensaver */


export const instance = new FoldoutScreensaver();