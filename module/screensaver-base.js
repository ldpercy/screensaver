
export class ScreensaverBase {

	constructor(){
		//console.log('Screensaver constructor')
	}

	init() {
		/** @type {HTMLFormElement} */
		this.form = document.forms['moduleSettings'];
	}

	update() {}
	unload() {}


	settingChange() {
		//send signal to screensaver that it's parameters have changed
	}

	/** @returns {string} */
	getForm() {
		return this.form.html;
	}

	/** @param {SVGElement|HTMLElement} element */
	updateSiblingIndices(element) {
		let currentElement;
		for (let i = 0; i < element.childElementCount; i++) {
			currentElement = /** @type {SVGElement|HTMLElement} */ (element.children[i]);
			currentElement.style.setProperty('--sibling-index', `${i+1}`);
			currentElement.style.setProperty('--sibling-count', `${element.childElementCount}`);
		}
	}

}/* ScreensaverBase */



export class FormBase {


	constructor(){
		//console.log('Screensaver constructor')
	}

	init() {
		this.form = document.forms['moduleSettings'];
	}

	/** @returns {string} */
	getForm() {
		return '';
	}


}/* FormBase */

