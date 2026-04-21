import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { screensaverApp } from "./screensaverApp.js";


class MainPanel {


	element = {};


	constructor() {
		//console.debug('user-interface constructor');
		this.element = HTMLApp.buildElementMap(document, this.elementMap)
		HTMLApp.addEventListeners(this.eventListeners, this);
		this.keyboardHandler = HTMLApp.newKeyboardHandler(this.keyFunctionMap,this);
	}

	/** @type {object}
	 * Note to self: like this typechecking on elements is totally sidestepped - need to find typesafe ways of doing this
	 */
	elementMap = {
		playPauseButton		: 'button-playPause',
		screensaverSelect	: 'select-screensaver',
		saveLink			: 'link-save',
		output				: 'screensaver-output',
		appInfoDialog		: 'dialog-appInfo',
	};





	eventListeners = [
		{
			query: '#select-screensaver',
			type: 'change',
			listener: (event)=> { this.selectScreensaver(event.target.value) }
		},
		{
			query: '#button-playPause',
			type: 'click',
			listener: (event)=> { screensaverApp.togglePlayState() }
		},
		{
			query: '#link-save',
			type: 'click',
			listener: this.saveListener
		},
		{
			query: '#dialog-appInfo',
			type: 'close',
			listener: this.appInfoDialogClose,
		},
		// {
		// 	query: '#input-screensaver-preset',
		// 	type: 'change',
		// 	listener: (event)=> { this.loadScreensaverPreset(event.target.value) }
		// },
		{
			query: '#form-moduleSettings',
			type: 'change',
			listener: this.settingChangeListener
		},
		{
			element: document,
			type: 'keydown',
			//listener: this.keyboardHandler							//	Use this for a local keyboard handler
			listener: (event) => { this.keyboardHandler(event); }		//	Use this for one generated from HTMLApp
		},
		{
			query: 'select,input',
			type: 'keydown',
			listener: (event)=>event.stopPropagation()
		},
		{
			query: '#button-showAppInfo',
			type: 'click',
			listener: this.showAppInfoDialog,
		},

	];



	keyFunctionMap = {
		'?'	: this.showAppInfoDialog,		// 'this' binding now being handled by the newKeyboardHandler from htmlApp
		' ' : this.playPauseHandler,
		'.' : this.stepForwardHandler,
	};




	selectScreensaver(screensaverName) {
		//this.element.screensaverSelect[screensaverName].selected = true;
		//console.debug(this.element.screensaverSelect);
		//console.debug(this.element.screensaverSelect.selectedIndex);
		this.selectedScreensaver = screensaverName;
		screensaverApp.loadScreensaver(screensaverName);
	}




	setUrlParameters() {

		//console.debug('setUrlParameters');

		const presetName = screensaverApp.getUrlParameter('preset');

		// if (polygonPreset[presetName]) {

		// 	this.loadPreset(polygonPreset[presetName]);
		// }

	}


	playPauseHandler() {
		screensaverApp.togglePlayState();
	}

	stepForwardHandler() {
		//this.playState = 'paused';
		screensaverApp.stepForward();
	}


	showAppInfoDialog() {
		// console.debug(this);
		screensaverApp.playState = 'paused';
		this.element.appInfoDialog.showModal();
	}

	appInfoDialogClose() {
		//screensaverApp.playState = this.screensaverState;
	}


	settingChangeListener(event) {
		screensaverApp.settingChange();
	}





	saveListener(event) {

		//this.element.saveLink.download = 'polygon.text';
		//this.element.saveLink.href = "data:text/plain;utf8,This is polygon.text";

		//	download="~/foo.text" href="data:text/plain;utf8,Some fantastic content to download"
		//event.preventDefault();

		// a very quick naive attempt that doesnb't quite work - needs some svg cleaning and rebuilding
		this.element.saveLink.download = `screensaver_${this.selectedScreensaver}.svg`;

		const screensaverGroup = document.getElementById('screensaver-group').innerHTML;

		const svg= `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1200 -1200 2400 2400" preserveAspectRatio="xMidYMid meet" >
				<title>screensaver - ${this.selectedScreensaver}</title>
				<g id="screensaver-group" style="stroke:black;fill:grey;fill-opacity:50%;">
					${screensaverGroup}
				</g>
			</svg>
		`;

		const url = new URL(`data:text/plain;utf8,${svg}`);
		this.element.saveLink.href = url.toString();

		//console.log(url.toString());
	}



	//
	//	Screensaver accessors
	//


	/**	@returns {string}	*/
	get selectedScreensaver() {
		return this.element.screensaverSelect.value;
	}

	/**	@param {string} screensaverName	*/
	set selectedScreensaver(screensaverName) {
		this.element.screensaverSelect.value = screensaverName;
	}/* set selectedScreensaver */


	/** @param {string} state*/
	set playState(state) {
		this.element.playPauseButton.dataset.playState = state;
	}


}/* MainPanel */

export const mainPanel = new MainPanel();



