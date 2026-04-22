//
//	form.js
//

import { FormBase } from "../screensaver-base.js";

class BezierForm extends FormBase {


	init() {
		super.init();
		//console.debug(this);
	}


	get html() {
		const result = `
			<label for="setting-lineType">type</label>
			<select id="setting-lineType" name="lineType" title="line type" size="7">
				<option value="quadraticOpen">quadratic - open</option>
				<option value="quadraticClosed">quadratic - closed</option>
				<option value="smoothQuadraticOpen">smooth quadratic - open</option>
				<option value="smoothQuadraticClosed">smooth quadratic - closed</option>

				<option value="smoothCubicClosed" selected>smooth cubic - closed</option>

				<!-- <option>cubic</option> -->
			</select>


			<label for="setting-elementCount">element count</label>
			<input id="setting-elementCount" type="number" name="elementCount" title="path count" min="1" value="2" max="10"/>

			<label for="setting-sectionCount">section count</label>
			<input id="setting-sectionCount" type="number" name="sectionCount" title="section count" min="1" value="2" max="10"/>
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
	get sectionCount() {
		return parseInt(this.element.sectionCount.value);
	}

	/**	@param {number} sectionCount	*/
	set sectionCount(sectionCount) {
		this.element.sectionCount.value = Math.round(sectionCount);
	}

}


export const form = new BezierForm();