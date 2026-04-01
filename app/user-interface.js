import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { screensaverApp } from "./screensaverApp.js";

//import * as polygon from "../screensaver/polygon/module.js";
import * as stylePreset from "../screensaver/style-preset.js";




class UserInterface {

	element = {};

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

	};


	keyFunctionMap = {
		'?'	: this.toggleAppInfoDialog,
		's' : this.startStopHandler,
	};


	eventListeners = [
		{
			query: '#select-screensaver',
			type: 'change',
			listener: (event)=> { screensaverApp.loadScreensaver(event.target.value) }
		},
		{
			query: '#button-startStop',
			type: 'click',
			listener: (event)=> { screensaverApp.animationStartStop() }
		},
		// {
		// 	query: '#input-screensaver-preset',
		// 	type: 'change',
		// 	listener: (event)=> { this.loadScreensaverPreset(event.target.value) }
		// },
		{
			query: '#form-screensaver-settings',
			type: 'change',
			listener: this.settingsChangeListener
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
			element: document,
			type: 'keydown',
			listener: this.keyboardHandler
		},
		{
			query: 'select,input',
			type: 'keydown',
			listener: (event)=>event.stopPropagation()
		},
		{
			query: '#button-showAppInfo',
			type: 'click',
			listener: this.toggleAppInfoDialog,
		},
	];


	constructor() {
		this.element = HTMLApp.buildElementMap(document, this.elementMap)
		HTMLApp.addEventListeners(this.eventListeners, this);
		//console.debug('user-interface constructor');
	}


	setUrlParameters() {

		//console.debug('setUrlParameters');

		const presetName = screensaverApp.getUrlParameter('preset');

		// if (polygonPreset[presetName]) {

		// 	this.loadPreset(polygonPreset[presetName]);
		// }

	}


	startStopHandler() {
		screensaverApp.animationStartStop();
	}


	loadScreensaver(sreeensaverName) {
		// load the screensaver
	}



	loadStylePreset(presetName) {

		const preset  = stylePreset[presetName];

		console.log('loadPreset', presetName, preset );

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





	keyboardHandler(event) {
		if (!event.altKey && !event.ctrlKey && !event.metaKey) {

			if (this.keyFunctionMap[event.key]) {
				event.preventDefault();
				this.keyFunctionMap[event.key]();
			}
		}
	}/* keyboardHandler */


	toggleAppInfoDialog() {
		// console.debug('someone write this');
	}


	settingsChangeListener(event) {
		screensaverApp.settingsChanged();
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
		this.element.saveLink.download = 'screensaver_download.svg';

		const polygonGroup = document.getElementById('screensaver-group').innerHTML;

		const svg= `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1200 -1200 2400 2400" preserveAspectRatio="xMidYMid meet" >
				<title>polygon</title>
				<g id="screensaver-group" style="stroke:black;fill:grey;fill-opacity:50%;">
					${polygonGroup}
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
	}




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
		document.body.style.setProperty('--stroke-width', strokeWidth);
		this.element.strokeWidth.value = strokeWidth;
	}

	/** @returns {string}	*/
	get strokeDasharray() {
		return this.element.strokeDasharray.value;
	}

	/** @param {string} strokeDasharray	*/
	set strokeDasharray(strokeDasharray) {
		document.body.style.setProperty('--stroke-dasharray', strokeDasharray);

		const dasharaySum = strokeDasharray.trim().split(' ').join(' + ');
		//console.debug(dasharaySum);

		document.body.style.setProperty('--to-stroke-dashoffset',`calc(${dasharaySum})`);
		this.element.strokeDasharray.value = strokeDasharray;
	}





	/** @returns {string}	*/
	get strokeLinejoin() {
		return this.element.strokeLinejoin.value;
	}

	/** @param {string} strokeLinejoin	*/
	set strokeLinejoin(strokeLinejoin) {
		document.body.style.setProperty('--stroke-linejoin', strokeLinejoin);
		this.element.strokeLinejoin.value = strokeLinejoin;
	}


	/** @returns {string}	*/
	get strokeLinecap() {
		return this.element.strokeLinecap.value;
	}

	/** @param {string} strokeLinecap	*/
	set strokeLinecap(strokeLinecap) {
		document.body.style.setProperty('--stroke-linecap', strokeLinecap);
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





}/* UserInterface */

export const ui = new UserInterface();



