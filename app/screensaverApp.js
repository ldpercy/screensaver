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




	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();
		this.setColourScheme(localStorage.polygon_colourScheme || 'light');

		if (this.getUrlParameter('preset')) {
			ui.loadPreset(this.getUrlParameter('preset'));
		}

		ui.updateStyle();
		ui.redraw();

	}/* documentDOMContentLoaded */


}/* ScreensaverApp */



export const screensaverApp = new ScreensaverApp();

