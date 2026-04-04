
export class Screensaver {

	constructor(){
		console.log('Screensaver constructor')
	}

	init() {}
	play() {}
	pause() {}
	unload() {}


	settingChange() {
		//send signal to screensaver that it's parameters have changed
	}


	/** @returns {string} */
	getForm() {
		return '';
	}


}/* Screensaver */