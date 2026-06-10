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
			<!--
			<label>Update interval</label>
			<input type="number" name="updateInterval" value="7"/>
			-->

			<label>Number of motes</label>
			<input type="number" name="elementCount" value="7"/>

			<label>Max. Velocity</label>
			<input type="number" name="maxVelocity" value="50"/>

			<label>Attraction to cursor</label>
			<input type="number" name="cursorAttraction" value="6"/>

			<label>Repulsion from peers</label>
			<input type="number" name="peerRepulsion" value="5"/>
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


	/**	@returns {number}	*/
	get peerRepulsion() {
		return parseInt(this.form.peerRepulsion.value);
	}

	/**	@param {number} peerRepulsion	*/
	set peerRepulsion(peerRepulsion) {
		this.form.peerRepulsion.value = Math.round(peerRepulsion);
	}

}


export const form = new SwarmOfMotesForm();