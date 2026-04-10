import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { screensaverApp } from "./screensaverApp.js";

//import * as polygon from "../screensaver/polygon/module.js";
import * as stylePreset from "../screensaver/style-preset.js";




class UserInterface {


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
		screensaverSelect	: 'select-screensaver',

		saveLink		: 'link-save',
		startColour		: 'input-startColour',
		fillOpacity		: 'input-fillOpacity',
		strokeWidth		: 'input-strokeWidth',
		strokeDasharray	: 'input-strokeDasharray',
		strokeLinejoin	: 'input-strokeLinejoin',
		strokeLinecap	: 'input-strokeLinecap',
		antCrawl		: 'input-antCrawl',
		blendMode		: 'input-blendMode',
		output			: 'screensaver-output',
		appInfoDialog	: 'dialog-appInfo',
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
		// {
		// 	query: '#input-screensaver-preset',
		// 	type: 'change',
		// 	listener: (event)=> { this.loadScreensaverPreset(event.target.value) }
		// },
		{
			query: '#form-screensaver-settings',
			type: 'change',
			listener: this.settingChangeListener
		},
		{
			query: '#input-style-preset',
			type: 'change',
			listener: (event)=> { this.loadStylePreset(event.target.value) }
		},
		{
			query: '#form-style',
			type: 'change',
			listener: this.styleChangeListener
		},

		{
			query: '.colourScheme-selector',
			type: 'click',
			listener: this.colourSchemeListener
		},
		{
			query: '.colourScheme-selector',
			type: 'dblclick',
			listener: this.colourSchemeSpecialListener
		},
		{
			query: '#link-save',
			type: 'click',
			listener: this.saveListener
		},
		{
			query: '#input-strokeDasharray',
			type: 'change',
			//listener: this.setStrokeDasharray,
			listener: (event)=> { this.strokeDasharray = event.target.value }
		},
		{
			query: '#input-strokeWidth',
			type: 'change',
			//listener: this.setStrokeWidth,
			listener: (event)=> { this.strokeWidth = event.target.value }
		},
		{
			query: '#input-strokeLinejoin',
			type: 'change',
			//listener: this.setStrokeLinejoin,
			listener: (event)=> { this.strokeLinejoin = event.target.value }
		},
		{
			query: '#input-strokeLinecap',
			type: 'change',
			listener: (event)=> { this.strokeLinecap = event.target.value }
		},
		{
			query: '#input-antCrawl',
			type: 'change',
			listener: (event)=> { this.antCrawl = event.target.checked }
		},
		{
			query: '#input-blendMode',
			type: 'change',
			listener: (event)=> { this.blendMode = event.target.value }
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
		{
			query: '#dialog-appInfo',
			type: 'close',
			listener: this.appInfoDialogClose,
		},
	];



	keyFunctionMap = {
		'?'	: this.showAppInfoDialog,		// 'this' binding now being handled by the newKeyboardHandler from htmlApp
		' ' : this.playPauseHandler,
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





	loadStylePreset(presetName) {

		const preset  = stylePreset[presetName];

		//console.log('loadPreset', presetName, preset );

		if (preset) {
			for (let key in preset.polygon) {
				this[key] = preset.polygon[key];
			}

			for (let key in preset.style) {
				this[key] = preset.style[key];
			}
		}

		this.updateStyle();
		this.update();

	}





	/*
	this method is not receiving class 'this', it's receiving
	*/
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

	styleChangeListener(event) {
		this.updateStyle();
	}

	colourSchemeListener(event) {
		event.preventDefault();
		screensaverApp.setColourScheme(event.target.dataset.colourscheme);
	}

	colourSchemeSpecialListener(event) {
		//console.log('colourSchemeListener', event.target.dataset);
		event.preventDefault();
		screensaverApp.setColourScheme(event.target.dataset.colourschemespecial);

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



	update() {
		// update the ui
	}





	updateStyle() {
		//console.debug('polygon.updateStyle');


		if ( document.forms['form-style']['input-fillRule'].value === 'evenodd') {
			document.getElementById('screensaver-group').classList.add('evenodd');
		}
		else {
			document.getElementById('screensaver-group').classList.remove('evenodd');
		}

		if ( document.forms['form-style']['input-showGrid'].checked) {
			document.getElementById('group-grid').style.display = '';
		}
		else {
			document.getElementById('group-grid').style.display = 'none';
		}

		const startColour =  document.forms['form-style']['input-startColour'].value;
		document.getElementById('screensaver-group').style.setProperty('--start-colour',startColour);

		const opacity =  document.forms['form-style']['input-fillOpacity'].value;
		document.getElementById('screensaver-group').style.setProperty('--fill-opacity', opacity);


		// this.setStrokeDasharray();
		// this.setStrokeWidth();

	}/* updateStyle */



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
		// feels like there must be abetter way to do this...:
		Array.from(this.element.screensaverSelect.options).forEach(element => {
			element.removeAttribute('selected')
		});
		Array.from(this.element.screensaverSelect.selectedOptions).forEach(element => {
			element.setAttribute('selected',true);
		});

	}/* set selectedScreensaver */




	//
	//	Style setting accessors
	//

	// /** @returns {string}	*/
	// get colourScheme() {
	// 	return this.element.startColour.value;
	// }

	/** @param {string} colourScheme	*/
	set colourScheme(colourScheme) {
		screensaverApp.setColourScheme(colourScheme);
	}



	/** @returns {string}	*/
	get startColour() {
		return this.element.startColour.value;
	}

	/** @param {string} startColour	*/
	set startColour(startColour) {
		this.element.startColour.value = startColour;
	}


	/** @returns {number}	*/
	get fillOpacity() {
		return this.element.fillOpacity.value;
	}

	/** @param {number} fillOpacity	*/
	set fillOpacity(fillOpacity) {
		this.element.fillOpacity.value = fillOpacity;
	}


	/** @returns {string}	*/
	get strokeWidth() {
		return this.element.strokeWidth.value;
	}

	/** @param {string} strokeWidth	*/
	set strokeWidth(strokeWidth) {
		this.element.output.style.setProperty('--stroke-width', strokeWidth);
		this.element.strokeWidth.value = strokeWidth;
	}

	/** @returns {string}	*/
	get strokeDasharray() {
		return this.element.strokeDasharray.value;
	}

	/** @param {string} strokeDasharray	*/
	set strokeDasharray(strokeDasharray) {
		this.element.output.style.setProperty('--stroke-dasharray', strokeDasharray);

		const dasharaySum = strokeDasharray.trim().split(' ').join(' + ');
		//console.debug(dasharaySum);

		this.element.output.style.setProperty('--to-stroke-dashoffset',`calc(${dasharaySum})`);
		this.element.strokeDasharray.value = strokeDasharray;
	}





	/** @returns {string}	*/
	get strokeLinejoin() {
		return this.element.strokeLinejoin.value;
	}

	/** @param {string} strokeLinejoin	*/
	set strokeLinejoin(strokeLinejoin) {
		this.element.output.style.setProperty('--stroke-linejoin', strokeLinejoin);
		this.element.strokeLinejoin.value = strokeLinejoin;
	}


	/** @returns {string}	*/
	get strokeLinecap() {
		return this.element.strokeLinecap.value;
	}

	/** @param {string} strokeLinecap	*/
	set strokeLinecap(strokeLinecap) {
		this.element.output.style.setProperty('--stroke-linecap', strokeLinecap);
		this.element.strokeLinecap.value = strokeLinecap;
	}



	/** @param {boolean} antCrawl	*/
	set antCrawl(antCrawl) {

		if (antCrawl) {
			document.getElementById('screensaver-group').classList.add('ant-crawl');
			this.element.antCrawl.checked = true;
		}
		else {
			document.getElementById('screensaver-group').classList.remove('ant-crawl');
			this.element.checked = false;
		}

	}



	/** @returns {string}	*/
	get blendMode() {
		return this.element.blendMode.value;
	}

	/** @param {string} blendMode	*/
	set blendMode(blendMode) {
		this.element.output.style.setProperty('--blend-mode', blendMode);
		this.element.blendMode.value = blendMode;
	}





}/* UserInterface */

export const ui = new UserInterface();



