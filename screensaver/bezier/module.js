import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { ScreensaverBase } from "../screensaver-base.js";
import { output, outputSpace } from "../../app/screensaver-output.js";
import { form  } from './form.js';



//console.log('bezier module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc



const ssg = document.getElementById('screensaver-group');

const intervalTime	= 1000;


class BezierScreensaver extends ScreensaverBase {

	currentIndex = 0;


	elementMap = {
		lineType			: 'setting-lineType',
		elementCount		: 'setting-elementCount',
		sectionCount		: 'setting-sectionCount',
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
		element.setAttribute('d', this.newPathString(form.sectionCount));
	}





	// newElement() {
	// 	const result = 	document.createElementNS('http://www.w3.org/2000/svg','path');
	// 	result.setAttribute('d', this.newPathString(this.sectionCount));
	// 	return result;
	// }

	/** @param {number} sectionCount */
	newPathString(sectionCount) {
		let result = '';
		const startPoint = output.randomPoint();
		let linepoints = '';

		for (let i = 1; i <= sectionCount; i++) {
			linepoints += ` ${this.pointPair()}`
		}

		//console.log(form.lineType);

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
				result = this.smoothQuadraticClosed(sectionCount); //`M ${startPoint} T  ${linepoints} ${output.randomPoint()} ${startPoint} z`;
				break;
			case "smoothCubicClosed":
				result = this.smoothCubicClosed(sectionCount);
				break;
			default:
				break;
		}

		return result;
	}

	/** smoothQuadraticClosed
	 * TODO: this one is currently incorrect and needs fixing
	 * @param {number} sectionCount
	 * @returns {string}
	 */
	smoothQuadraticClosed(sectionCount) {
		let sectionPoints = '';
		const startPoint = output.randomCartesian();
		const firstControlPoint = output.randomCartesian();

		const lastControlPoint = outputSpace.newCartesianCoordinates();

		lastControlPoint.x = startPoint.x - (firstControlPoint.x - startPoint.x);
		lastControlPoint.y = startPoint.y - (firstControlPoint.y - startPoint.y);

		// the last control point here needs to be collinear with the end/start and the first control point

		for (let i = 0; i < sectionCount; i++) {
			sectionPoints += ` ${this.pointPair()}`
		}

		//console.debug('smoothQuadraticClosed');
		//console.debug('sp',startPoint,'fcp', firstControlPoint, 'lcp',lastControlPoint);

		const lastPair = `${startPoint} ${lastControlPoint}`;

		const result = `M ${startPoint} T  ${sectionPoints}  ${lastPair} z`;
		return result;
	}



	/** smoothCubicClosed
	 * @param {number} sectionCount
	 * @returns {string}
	 */
	smoothCubicClosed(sectionCount) {
		let sectionPoints = '';
		const startPoint = output.randomCartesian();
		const firstControlPoint = output.randomCartesian();

		const firstCubic = `C ${firstControlPoint} ${output.randomPoint()} ${output.randomPoint()}`;


		const lastControlPoint = outputSpace.newCartesianCoordinates();

		lastControlPoint.x = startPoint.x - (firstControlPoint.x - startPoint.x);
		lastControlPoint.y = startPoint.y - (firstControlPoint.y - startPoint.y);

		// the last control point here needs to be collinear with the end/start and the first control point

		for (let i = 1; i < sectionCount; i++) {
			sectionPoints += `S ${this.pointPair()}`
		}

		//console.debug('smooth cubic closed');
		//console.debug('sp',startPoint,'fcp', firstControlPoint, 'lcp',lastControlPoint);

		const lastPair = `S ${lastControlPoint} ${startPoint} `;

		const result = `M ${startPoint} ${firstCubic} ${sectionPoints} ${lastPair} z`;
		//console.debug(result);
		return result;
	}




	/** @return {string}  */
	pointPair() {
		return `${output.randomPoint()} ${output.randomPointConservative()}`;
	}


	/** @return {string}  */
	pointTriple() {
		return `${output.randomPoint()} ${output.randomPointConservative()}`;
	}


	settingChange() {
		this.update();
	}


}/* BezierScreensaver */


export const instance = new BezierScreensaver();