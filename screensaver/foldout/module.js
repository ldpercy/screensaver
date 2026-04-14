import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import * as planarSpace from "../../[html-common]/module/PlanarSpace.js";
import { Screensaver } from "../screensaver.js";
import { output } from "../../app/screensaver-output.js";


//console.log('foldout module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc



const ssg = document.getElementById('screensaver-group');

const intervalTime	= 1000;



class FoldoutScreensaver extends Screensaver {

	currentIndex = 0;

	space = new planarSpace.Space();

	/** @type {Array<planarSpace.Point>} */
	head = [];



	elementMap = {
		//settings			: 'form-moduleSettings',
		elementCount		: 'module-elementCount',
		headSize			: 'module-headSize',
		segments			: 'module-segments',
		output				: 'screensaver-output',
		svg					: 'screensaver-svg',
	};


	constructor() {
		super();
		//console.log('FoldoutScreensaver constructor');
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


	init() {
		//console.log('FoldoutScreensaver init');
		this.element = HTMLApp.buildElementMap(document, this.elementMap);

		this.form = document.forms['moduleSettings'];

		this.update();
	}







	update() {

		while (ssg.childElementCount > this.segments)
		{
			//ssg.lastElementChild.remove();
			ssg.firstElementChild.remove();
		}
		while (ssg.childElementCount < this.segments)
		{
			this.addSegment();
		}

		//this.currentIndex = (this.currentIndex + 1) % this.segments;
		this.updateElement(this.currentIndex);

	}/* update */



	addSegment() {
			ssg.appendChild(document.createElementNS('http://www.w3.org/2000/svg','path'));
			this.updateElement(ssg.childElementCount-1);


			let pathString = '';


			for (let i = 1; i <= this.headSize; i++) {
				pathString += ` ${output.randomPoint()}`
			}

	}


	/**
	 * @param {number} index
	 */
	updateElement(index) {
		const element = /** @type {SVGElement} */ (ssg.children[index]);




		element.setAttribute('d', this.newPathString(2));
		element.style.setProperty('--sibling-index', `${index+1}`);
		element.style.setProperty('--sibling-count', `${this.segments}`);
	}



	/** @param {number} segments */
	newPathString(segments) {
		const startPoint = output.randomPoint();
		let linepoints = '';

		for (let i = 1; i <= segments; i++) {
			linepoints += ` ${output.randomPoint()}`
		}

		const result = `M ${startPoint} ${linepoints}`;
		return result;
	}





	settingChange() {
		this.update();
	}



	getForm() {
		const result = `
			<!--
			<label for="module-elementCount">element count</label>
			<input id="module-elementCount" type="number" name="elementCount" title="path count" min="1" value="1" max="10"/>
			-->


			<label for="module-headSize">head size</label>
			<input id="module-headSize" type="number" name="headSize" title="headSize" min="1" value="1" max="5"/>

			<label for="module-segments">segments</label>
			<input id="module-segments" type="number" name="segments" title="segments" min="1" value="4" max="10"/>
		`;
		return result;
	}


	//
	//	Accessors
	//


	/**	@returns {number}	*/
	get elementCount() {
		return parseInt(this.form.elementCount.value);
	}

	/**	@param {number} elementCount	*/
	set elementCount(elementCount) {
		this.form.elementCount.value = Math.round(elementCount);
	}


	/**	@returns {number}	*/
	get headSize() {
		return this.element.headSize.value;
	}

	/**	@param {number} headSize	*/
	set headSize(headSize) {
		this.form.headSize.value = Math.round(headSize);
	}



	/**	@returns {number}	*/
	get segments() {
		return parseInt(this.form.segments.value);
	}

	/**	@param {number} segments	*/
	set segments(segments) {
		this.form.segments.value = Math.round(segments);
	}



}/* FoldoutScreensaver */


export const instance = new FoldoutScreensaver();