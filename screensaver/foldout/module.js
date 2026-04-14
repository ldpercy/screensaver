import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import * as planarSpace from "../../[html-common]/module/PlanarSpace.js";
import { ScreensaverBase } from "../screensaver-base.js";
import { output } from "../../app/screensaver-output.js";


//console.log('foldout module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc



const ssg = document.getElementById('screensaver-group');

const intervalTime	= 1000;



class FoldoutScreensaver extends ScreensaverBase {

	currentIndex = 0;


	/** @type {Array<planarSpace.CartesianCoordinates>} */
	headSegment = [];



	elementMap = {
		//settings			: 'form-moduleSettings',
		elementCount		: 'module-elementCount',
		headPoints			: 'module-headPoints',
		segments			: 'module-segments',
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

		while (ssg.childElementCount >= this.segments)
		{
			ssg.firstElementChild.remove();
		}
		while (ssg.childElementCount < this.segments)
		{
			this.headSegment = this.addSegment(this.headSegment, this.headPoints, this.copyPoints);
		}

		this.updateSiblingIndices(ssg);
	}/* update */


	/**
	 * @param {Array<planarSpace.CartesianCoordinates>} segment
	 * @param {number}	length
	 * @param {number}	retainPoints
	 * @returns {Array<planarSpace.CartesianCoordinates>}
	*/
	addSegment(segment, length, retainPoints) {
		//console.debug(arguments);

		const newElement = document.createElementNS('http://www.w3.org/2000/svg','path');

		ssg.appendChild(newElement);
		// let pathString = '';

		newElement.style.setProperty('--sibling-count', `${this.segments}`);

		const newSegment = this.newSegment(segment, length, retainPoints)
		//console.log(newSegment);

		newElement.setAttribute('d', this.getSegmentPath(newSegment));

		return newSegment;
	}


	/** @param {Array<planarSpace.CartesianCoordinates>} segment */
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
	 * @param {Array<planarSpace.CartesianCoordinates>} segment
	 * @param {number}	length
	 * @param {number}	retainPoints
	 * @returns {Array<planarSpace.CartesianCoordinates>}
	 */
	newSegment(segment, length, retainPoints) {
		// need to check if this is pass-by-value or a mutation

		let result = segment.slice(-retainPoints);

		while (result.length < length) {
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


			<label for="module-segments">segments</label>
			<input id="module-segments" type="number" name="segments" title="segments" min="1" value="4" max="10"/>


			<label for="module-headPoints">head points</label>
			<input id="module-headPoints" type="number" name="headPoints" title="head points" min="2" value="3" max="5"/>

			<label for="module-copyPoints">copy points</label>
			<input id="module-copyPoints" type="number" name="copyPoints" title="copy points" min="1" value="2" max="4"/>

		`;
		return result;
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
	get headPoints() {
		return parseInt(this.element.headPoints.value);
	}

	/**	@param {number} headPoints	*/
	set headPoints(headPoints) {
		this.form.headPoints.value = Math.round(headPoints);
	}



	/**	@returns {number}	*/
	get segments() {
		return parseInt(this.form.segments.value);
	}

	/**	@param {number} segments	*/
	set segments(segments) {
		this.form.segments.value = Math.round(segments);
	}


	/**	@returns {number}	*/
	get copyPoints() {
		return parseInt(this.form.copyPoints.value);
	}

	/**	@param {number} copyPoints	*/
	set copyPoints(copyPoints) {
		this.form.copyPoints.value = Math.round(copyPoints);
	}



}/* FoldoutScreensaver */


export const instance = new FoldoutScreensaver();