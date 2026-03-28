//
//	screensaverApp.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { ui } from "./user-interface.js";
import * as polygon from "../screensaver/polygon/module.js";



class ScreensaverApp extends HTMLApp {

	appVersion = 'v0.0.0';
	projectColour = 'midnightblue';
	appInfo = [`%c
		Screensaver ${this.appVersion} by ldpercy
		https://github.com/ldpercy/screensaver/releases/tag/${this.appVersion}
		`.replace(/\n\t/g,'\n'),
		`color: light-dark(hsl(from ${this.projectColour} h s 30), hsl(from ${this.projectColour} h s 70));`,
	];


	currentScreeensaverModule = undefined;
	intervalId = undefined;


	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();
		this.setColourScheme(localStorage.polygon_colourScheme || 'light');

		// if (this.getUrlParameter('preset')) {
		// 	ui.loadPreset(this.getUrlParameter('preset'));
		// }

		ui.updateStyle();
		ui.update();
		//polygon.init();
		this.loadScreensaver(ui.selectedScreensaver);

	}/* documentDOMContentLoaded */





	/** loadScreensaver
	 * @param {string} name
	 */
	async loadScreensaver(name) {

		console.log('loadScreensaver', name);


		// unload the previous module if necessary
		if (this.currentScreeensaverModule && this.currentScreeensaverModule.unload) {
			this.currentScreeensaverModule.unload();
		}


		document.getElementById('screensaver-group').innerHTML = '';

		const moduleUrl = `../screensaver/${name}/module.js`;




		// need something like railroad-handling here, but can't remember how to implement the pattern

		//try {
			// this will overwrite the theme binding each time, might need to improve?
			this.currentScreeensaverModule = await import(moduleUrl);

			//console.log('screensaverModule',screensaverModule);

			this.currentScreeensaverModule.init();

		// }
		// catch (error) {
		// 	console.error(`Error for '${name}'`, error);
		// 	this.page.element.container.innerHTML = `<h2 class="themeError">${error}</h2>`;
		// }

	}/* drawClock */





	animationStartStop() {

		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = undefined;
		}
		else {
			this.intervalId = setInterval(
				()=> { this.currentScreeensaverModule.intervalAnimate() },
				100
			);
		}
	}/* animationStartStop */






}/* ScreensaverApp */



export const screensaverApp = new ScreensaverApp();

