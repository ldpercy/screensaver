
import { Screensaver } from "../screensaver.js";



console.log('rect module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc


const c = document.createElementNS('http://www.w3.org/2000/svg','circle');


class RectScreensaver extends Screensaver {


	constructor() {
		super();
		console.log('RectScreensaver constructor');
	}

	init() {
		console.log('RectScreensaver init');
		document.getElementById('screensaver-group').innerHTML = '<rect x="-400" y="-300" width="600" height="500"></rect>';
	}


}/* RectScreensaver */


export const instance = new RectScreensaver();