//
//	polygonApp.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { ui } from "./user-interface.js";


class ScreensaverApp extends HTMLApp {

	appName	= "polygon";
	appInfo = ["Polygon by ldpercy"];




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

