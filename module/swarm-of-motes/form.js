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
			<input type="number" name="updateInterval" value="7" required/>
			-->

			<label>Number of motes</label>
			<input type="number" name="elementCount" min="1" value="7" required/>

			<label>Max. Velocity</label>
			<input type="number" name="maxVelocity" min="1" value="50" required/>

			<label>Attraction to cursor</label>
			<input type="number" name="attractionForce" min="1" value="8" required/>

			<label>Repulsion from peers</label>
			<input type="number" name="peerRepulsion" min="1" value="5" required/>
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
	get attractionForce() {
		return parseInt(this.form.attractionForce.value);
	}

	/**	@param {number} attractionForce	*/
	set attractionForce(attractionForce) {
		this.form.attractionForce.value = Math.round(attractionForce);
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