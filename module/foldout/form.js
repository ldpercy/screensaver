//
//	form.js
//

import { FormBase } from "../screensaver-base.js";

class FoldoutForm extends FormBase {


	init() {
		super.init();
		//console.debug(this);
	}


	//
	//	form & accessors
	//


	get html() {
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

}


export const form = new FoldoutForm();