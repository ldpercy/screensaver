//
//	form.js
//

import { FormBase } from "../screensaver-base.js";

class BezierForm extends FormBase {


	init() {
		super.init();
		console.debug(this);
	}


	get html() {
		const result = `
			<label for="setting-lineType">type</label>
			<select id="setting-lineType" name="lineType" title="line type" size="7">
				<option value="quadraticOpen">quadratic - open</option>
				<option value="quadraticClosed">quadratic - closed</option>
				<option value="smoothQuadraticOpen" selected>smooth quadratic - open</option>
				<option value="smoothQuadraticClosed">smooth quadratic - closed</option>

				<!-- <option>cubic</option> -->
			</select>


			<label for="setting-elementCount">element count</label>
			<input id="setting-elementCount" type="number" name="elementCount" title="path count" min="1" value="2" max="10"/>

			<label for="setting-pathSections">path sections</label>
			<input id="setting-pathSections" type="number" name="pathSections" title="path sections" min="1" value="2" max="10"/>
		`;
		return result;
	}


	//
	//	Accessors
	//


	/**	@returns {string}	*/
	get lineType() {
		return this.element.lineType.value;
	}

	/**	@param {number} lineType	*/
	set lineType(lineType) {
		this.element.lineType.value = lineType;
	}


	/**	@returns {number}	*/
	get elementCount() {
		return parseInt(this.element.elementCount.value);
	}

	/**	@param {number} elementCount	*/
	set elementCount(elementCount) {
		this.element.elementCount.value = Math.round(elementCount);
	}

	/**	@returns {number}	*/
	get pathSections() {
		return parseInt(this.element.pathSections.value);
	}

	/**	@param {number} pathSections	*/
	set pathSections(pathSections) {
		this.element.pathSections.value = Math.round(pathSections);
	}

}


export const form = new BezierForm();