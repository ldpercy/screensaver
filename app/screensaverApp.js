//
//	screensaverApp.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { mainPanel } from "./panel-main.js";
import { stylePanel } from "./panel-style.js";
import { output } from "./screensaver-output.js";



class ScreensaverApp extends HTMLApp {

	appVersion = 'v0.🔧🪛';
	projectColour = 'midnightblue';
	appInfo = [`%c
		Screensaver ${this.appVersion} by ldpercy
		https://github.com/ldpercy/screensaver/releases/tag/${this.appVersion}
		`.replace(/\n\t/g,'\n'),
		`color: light-dark(hsl(from ${this.projectColour} h s 30), hsl(from ${this.projectColour} h s 70));`,
	];

	testing = true;

	/** @type {string} */
	defaultScreensaver = 'bezier';
	/** @type {string} */
	#playState = 'playing';
	/** @type {number} */
	#interval = 1000;
	/** @type {module} */			// no idea if this is correct type here, but it's working for now
	currentModule = undefined;

	/** @type {number} */
	#intervalId = undefined




	/** @type {array} */
	eventListeners = [
		{
			element: document,
			type: 'visibilitychange',
			listener: () => { this.visibilitychangeListener(); }
		},
	];


	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();
		HTMLApp.addEventListeners(this.eventListeners, this);
		this.setColourScheme(localStorage.screensaver_colourScheme || 'dark');

		this.init();

	}/* documentDOMContentLoaded */



	init() {

		// if (this.getUrlParameter('preset')) {
		// 	ui.loadPreset(this.getUrlParameter('preset'));
		// }

		stylePanel.updateStyle();
		mainPanel.selectedScreensaver = this.defaultScreensaver;
		this.loadScreensaver(this.defaultScreensaver);

	}



	/** loadScreensaver
	 * @param {string} name
	 */
	async loadScreensaver(name) {
		//console.log('loadScreensaver', name);
		this.clearInterval();
		const previousPlayState = this.playState;

		// unload the previous module if necessary
		if (this.currentModule) {
			this.currentModule.instance.unload();
		}

		document.getElementById('screensaver-group').innerHTML = '';

		const moduleUrl = `../module/${name}/module.js`;

		// need something like railroad-handling here, but can't remember how to implement the pattern
		//try {
			// this will overwrite the theme binding each time, might need to improve?
			this.currentModule = await import(moduleUrl);
			//console.debug(this.currentModule);

			document.getElementById('form-moduleSettings').innerHTML = this.currentModule.instance.getForm();

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
		//console.debug('set playState', arguments);
		if (state === 'playing') {
			//this.currentModule.instance.play();
			this.#playState = 'playing';
			output.animationPlayState = 'running';
			this.play();
		}
		else if (state === 'paused') {
			//this.currentModule.instance.pause();
			this.#playState = 'paused';
			output.animationPlayState = 'paused';
			this.clearInterval();
		}
		mainPanel.playState = this.#playState;
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

	stepForward() {
		this.playState = 'paused';
		this.currentModule.instance.update();
	}




	play() {
		this.currentModule.instance.update();

		this.#intervalId = setInterval(
			()=> { this.currentModule.instance.update(); },
			this.mainInterval
		);
		//console.log('play', this.#intervalId, this.mainInterval);
	}


	clearInterval() {
		//console.log('pause:', this.intervalId);
		clearInterval(this.#intervalId);
		this.#intervalId = undefined;
	}



	settingChange() {
		this.currentModule.instance.settingChange();
	}


	visibilitychangeListener() {
		//console.debug('visibilitychangeListener', arguments);
		// console.debug('document.visibilityState', document.visibilityState);
		if (document.visibilityState === 'hidden')
		{
			this.playState = 'paused';
		}
		// else {
		// 	this.playState = 'playing';
		// }
	}



	//
	//	accessors
	//

	/** @param {number} intervalMs  */
	set mainInterval(intervalMs) {

		// setting the maininterval should clear any current intervals, and if playing resume at the new interval
		// make it so!
		this.clearInterval();
		this.#interval = intervalMs;
		if (this.playState === 'playing') {
			this.play();
		}
		output.mainInterval = intervalMs;
	}


	/** @returns {number} */
	get mainInterval() {
		return this.#interval;
	}


}/* ScreensaverApp */



export const screensaverApp = new ScreensaverApp();

