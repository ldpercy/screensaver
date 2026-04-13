//
//	screensaverApp.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { appPanel } from "./panel-app.js";
import { stylePanel } from "./panel-style.js";




class ScreensaverApp extends HTMLApp {

	appVersion = 'v0.1.0';
	projectColour = 'midnightblue';
	appInfo = [`%c
		Screensaver ${this.appVersion} by ldpercy
		https://github.com/ldpercy/screensaver/releases/tag/${this.appVersion}
		`.replace(/\n\t/g,'\n'),
		`color: light-dark(hsl(from ${this.projectColour} h s 30), hsl(from ${this.projectColour} h s 70));`,
	];

	defaultScreensaver = 'bezier';
	currentModule = undefined;
	#playState = 'playing';


	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();
		this.setColourScheme(localStorage.screensaver_colourScheme || 'dark');

		this.init();

	}/* documentDOMContentLoaded */



	init() {

		// if (this.getUrlParameter('preset')) {
		// 	ui.loadPreset(this.getUrlParameter('preset'));
		// }

		stylePanel.updateStyle();
		appPanel.selectedScreensaver = this.defaultScreensaver;
		this.loadScreensaver(this.defaultScreensaver);

	}



	/** loadScreensaver
	 * @param {string} name
	 */
	async loadScreensaver(name) {
		console.log('loadScreensaver', name);

		const previousPlayState = this.playState;

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
			this.playState = previousPlayState;
		// }
		// catch (error) {
		// 	console.error(`Error for '${name}'`, error);
		// 	this.page.element.container.innerHTML = `<h2 class="themeError">${error}</h2>`;
		// }

	}/* loadScreensaver */


	/** @param {string} state*/
	set playState(state) {

		if (state === 'playing') {
			this.currentModule.instance.play();
			this.#playState = 'playing';
		}
		else if (state === 'paused') {
			this.currentModule.instance.pause();
			this.#playState = 'paused';
		}
		appPanel.playState = this.#playState;
	}

	get playState()	{
		return this.#playState;
	}

	togglePlayState() {
		if (this.playState === 'paused') {
			this.playState = 'playing';
		}
		else {
			this.playState = 'paused';
		}
	}



	settingChange() {
		this.currentModule.instance.settingChange();
	}



}/* ScreensaverApp */



export const screensaverApp = new ScreensaverApp();

