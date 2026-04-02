//
//	screensaverApp.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { ui } from "./user-interface.js";




class ScreensaverApp extends HTMLApp {

	appVersion = 'v0.0.0';
	projectColour = 'midnightblue';
	appInfo = [`%c
		Screensaver ${this.appVersion} by ldpercy
		https://github.com/ldpercy/screensaver/releases/tag/${this.appVersion}
		`.replace(/\n\t/g,'\n'),
		`color: light-dark(hsl(from ${this.projectColour} h s 30), hsl(from ${this.projectColour} h s 70));`,
	];


	currentModule = undefined;
	state = 'stopped';


	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();
		this.setColourScheme(localStorage.screensaver_colourScheme || 'dark');

		this.init();

	}/* documentDOMContentLoaded */



	init() {

		// if (this.getUrlParameter('preset')) {
		// 	ui.loadPreset(this.getUrlParameter('preset'));
		// }

		ui.updateStyle();
		ui.update();
		this.loadScreensaver(ui.selectedScreensaver);

	}



	/** loadScreensaver
	 * @param {string} name
	 */
	async loadScreensaver(name) {
		console.log('loadScreensaver', name);

		// unload the previous module if necessary
		if (this.currentModule) {
			this.currentModule.instance.stop()
			this.currentModule.instance.unload();
		}

		document.getElementById('screensaver-group').innerHTML = '';

		const moduleUrl = `../screensaver/${name}/module.js`;

		// need something like railroad-handling here, but can't remember how to implement the pattern
		//try {
			// this will overwrite the theme binding each time, might need to improve?
			this.currentModule = await import(moduleUrl);

			//console.log('screensaverModule',screensaverModule);

			document.getElementById('form-screensaver-settings').innerHTML = this.currentModule.instance.getForm();

			this.currentModule.instance.init();
			this.animationStart();
		// }
		// catch (error) {
		// 	console.error(`Error for '${name}'`, error);
		// 	this.page.element.container.innerHTML = `<h2 class="themeError">${error}</h2>`;
		// }

	}/* loadScreensaver */



	animationStart() {
		this.currentModule.instance.start();
		this.state = 'started';
	}

	animationStop() {
		this.currentModule.instance.stop();
		this.state = 'stopped';
	}

	animationStartStop() {
		//console.log('animationStartStop',this.state);
		if (this.state === 'stopped') {
			this.animationStart();
		}
		else {
			this.animationStop();
		}
	}/* animationStartStop */


	settingsChanged() {
		this.currentModule.instance.redraw();
	}



}/* ScreensaverApp */



export const screensaverApp = new ScreensaverApp();

