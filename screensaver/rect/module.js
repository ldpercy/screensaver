
import { Screensaver } from "../screensaver.js";



console.log('rect module');	// this only runs the _first_ time the module is loaded - not sure what the stipulations around that are though, whether it's possible to unload etc


class RectScreensaver extends Screensaver {


	init() {
		//console.log(starPath);
		document.getElementById('screensaver-group').innerHTML = '<rect x="-400" y="-300" width="600" height="500"></rect>';
	}


}/* RectScreensaver */


export const instance = new RectScreensaver();