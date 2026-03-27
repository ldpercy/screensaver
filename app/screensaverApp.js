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




	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();
		this.setColourScheme(localStorage.polygon_colourScheme || 'light');

		// if (this.getUrlParameter('preset')) {
		// 	ui.loadPreset(this.getUrlParameter('preset'));
		// }

		ui.updateStyle();
		ui.update();
		//polygon.init();
		this.loadScreensaver('polygon');

	}/* documentDOMContentLoaded */





	/** loadScreensaver
	 * @param {string} name
	 */
	async loadScreensaver(name) {

		console.log('loadScreensaver', name);


		const moduleUrl = `../screensaver/${name}/module.js`;


		// need something like railroad-handling here, but can't remember how to implement the pattern

		//try {
			// this will overwrite the theme binding each time, might need to improve?
			const screensaverModule = await import(moduleUrl);

			//console.log('screensaverModule',screensaverModule);

			screensaverModule.init();

		// }
		// catch (error) {
		// 	console.error(`Error for '${name}'`, error);
		// 	this.page.element.container.innerHTML = `<h2 class="themeError">${error}</h2>`;
		// }

	}/* drawClock */








}/* ScreensaverApp */



export const screensaverApp = new ScreensaverApp();

