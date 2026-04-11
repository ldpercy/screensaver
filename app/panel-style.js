import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { randomColourHex } from  "../[html-common]/module/colour.js";
import { screensaverApp } from "./screensaverApp.js";
import { output } from "./screensaver-output.js";
import * as stylePreset from "../screensaver/style-preset.js";




class StylePanel {


	element = {};


	constructor() {
		//console.debug('user-interface constructor');
		this.element = HTMLApp.buildElementMap(document, this.elementMap)
		HTMLApp.addEventListeners(this.eventListeners, this);
	}

	/** @type {object}
	 * Note to self: like this typechecking on elements is totally sidestepped - need to find typesafe ways of doing this
	 */
	elementMap = {
		fillColour		: 'input-fillColour',
		fillOpacity		: 'input-fillOpacity',
		strokeWidth		: 'input-strokeWidth',
		strokeDasharray	: 'input-strokeDasharray',
		strokeLinejoin	: 'input-strokeLinejoin',
		strokeLinecap	: 'input-strokeLinecap',
		strokeDash		: 'input-strokeDash',
		dashAnimate		: 'input-dashAnimate',
		blendMode		: 'input-blendMode',
		output			: 'screensaver-output',
	};





	eventListeners = [
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
			query: '#button-fillColourRandom',
			type: 'click',
			listener: (event)=> { this.element.fillColour.value = randomColourHex(); }
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
			query: '#input-strokeDash',
			type: 'change',
			listener: (event)=> { this.strokeDash = event.target.checked }
		},
		{
			query: '#input-dashAnimate',
			type: 'change',
			listener: (event)=> { this.dashAnimate = event.target.checked }
		},
		{
			query: '#input-blendMode',
			type: 'change',
			listener: (event)=> { this.blendMode = event.target.value }
		},
	];






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
	}




	settingChangeListener(event) {
		screensaverApp.settingChange();
	}

	styleChangeListener(event) {
		console.debug('styleChangeListener',event)
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

		const fillColour =  document.forms['form-style']['input-fillColour'].value;
		document.getElementById('screensaver-group').style.setProperty('--fill-colour',fillColour);

		const opacity =  document.forms['form-style']['input-fillOpacity'].value;
		document.getElementById('screensaver-group').style.setProperty('--fill-opacity', opacity);


		// this.setStrokeDasharray();
		// this.setStrokeWidth();

	}/* updateStyle */






	//
	//	Style setting accessors
	//

	// /** @returns {string}	*/
	// get colourScheme() {
	// 	return this.element.fillColour.value;
	// }

	/** @param {string} colourScheme	*/
	set colourScheme(colourScheme) {
		screensaverApp.setColourScheme(colourScheme);
	}



	/** @returns {string}	*/
	get fillColour() {
		return this.element.fillColour.value;
	}

	/** @param {string} fillColour	*/
	set fillColour(fillColour) {
		this.element.fillColour.value = fillColour;
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



	/** @returns {boolean}	*/
	get strokeDash() {
		return this.element.strokeDash.checked;
	}

	/** @param {boolean} strokeDash	*/
	set strokeDash(strokeDash) {
		//this.element.output.style.setProperty('--stroke-dash', strokeDash);
		this.element.strokeDash.checked = strokeDash;
		output.strokeDash = strokeDash;
	}


	/** @param {boolean} dashAnimate	*/
	set dashAnimate(dashAnimate) {
		this.element.dashAnimate.checked = dashAnimate;
		output.dashAnimate = dashAnimate;
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

}/* StylePanel */

export const stylePanel = new StylePanel();



