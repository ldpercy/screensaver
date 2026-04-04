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
			this.currentModule.instance.pause();
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
			this.animationPlay();
		// }
		// catch (error) {
		// 	console.error(`Error for '${name}'`, error);
		// 	this.page.element.container.innerHTML = `<h2 class="themeError">${error}</h2>`;
		// }

	}/* loadScreensaver */



	animationPlay() {
		this.currentModule.instance.play();
		this.state = 'playing';
	}

	animationPause() {
		this.currentModule.instance.pause();
		this.state = 'paused';
	}

	animationPlayPause() {
		//console.log('animationPlayPause',this.state);
		if (this.state === 'stopped') {
			this.animationPlay();
		}
		else {
			this.animationPause();
		}
	}/* animationPlayPause */


	settingChange() {
		this.currentModule.instance.settingChange();
	}



}/* ScreensaverApp */



export const screensaverApp = new ScreensaverApp();

