//
//	form.js
//

import { FormBase } from "../screensaver-base.js";

class SwarmOfMotesForm extends FormBase {

	init() {
		super.init();
		console.debug(this);
	}


	//
	//	form & accessors
	//


	get html() {
		const result = `
			<label>Number of motes</label>
			<input name="elementCount" value="5"/>

			<label>Max. Velocity</label>
			<input name="maxVelocity" value='15'/>


			<label>Attraction to cursor</label>
			<input name="cursorAttraction" value='6'/>

			<label>Repulsion from peers</label>
			<input name="repel_peer" value='5'/>
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
	get maxVelocity() {
		return parseInt(this.form.maxVelocity.value);
	}

	/**	@param {number} maxVelocity	*/
	set maxVelocity(maxVelocity) {
		this.form.maxVelocity.value = Math.round(maxVelocity);
	}



	/**	@returns {number}	*/
	get cursorAttraction() {
		return parseInt(this.form.cursorAttraction.value);
	}

	/**	@param {number} cursorAttraction	*/
	set cursorAttraction(cursorAttraction) {
		this.form.cursorAttraction.value = Math.round(cursorAttraction);
	}

}


export const form = new SwarmOfMotesForm();