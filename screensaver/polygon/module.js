import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { Screensaver } from "../screensaver.js";
import { Maths } from "../../app/maths.module.js";
import * as geometry from "../../app/geometry.module.js";


import * as polygonPreset from "./polygon-preset.js";






class PolygonScreensaver extends Screensaver {

	constructor() {
		super();
		//console.log('PolygonScreensaver constructor');
	}/* constructor */


	eventListeners = [
		{
			query: '#input-screensaver-preset',
			type: 'change',
			listener: (event)=> { this.loadPreset(event.target.value) }
		},
	];


	elementMap = {
		radius			: 'input-radius',
		sides			: 'input-sides',
		pointStep		: 'input-pointStep',
		startDivision	: 'input-startDivision',
		copies			: 'input-copies',
		copyOffset		: 'input-copyOffset',
		copyPaths		: 'input-copyPaths',
		coordinates		: 'input-coordinates',
		decimalPlaces	: 'input-decimalPlaces',
	};


	init() {
		this.element = HTMLApp.buildElementMap(document, this.elementMap);
		HTMLApp.addEventListeners(this.eventListeners, this);
		this.redraw();
	}


	settingChange() {
		this.redraw();
	}



	redraw() {
		//console.debug('polygon.redraw', this.element);

		const polygonGroup = this.getPolygonPath(
			this.sides,
			this.pointStep,
			this.startDivision,
			this.radius,
			this.copies,
			this.copyOffset,
			this.copyPaths,
			this.coordinates,
		);

		//console.log(starPath);
		document.getElementById('screensaver-group').innerHTML = polygonGroup;
	}/* redraw */



	/** getPolygonPath
	 * TODO: this all needs to be converted over to planar space & angle objects
	 *
	 * @param {number} sides
	 * @param {number} pointStep
	 * @param {number} startDivision
	 * @param {number} radius
	 * @param {number} copies
	 * @param {number} copyOffset
	 * @param {string} copyPaths
	 * @param {string} coordinates
	 */
	getPolygonPath(
			sides, 				// how many sides the polygon has
			pointStep, 			// how many divisions to the next vertex
			startDivision,		// integer divisions of the base angle to the start of the polygon
			radius,				// radius of points
			copies, 			// number of copies of the polygon to draw
			copyOffset,			// integer divisions of the base angle between the copies
			copyPaths,			// combined or separate svg paths
			coordinates,		// absolute or relative
		) {
		//console.debug(arguments);
		let result = '';
		let path = '';
		let x = 0, y = 0;

		const mainAngle = Maths.TAU / sides;

		const startAngle = mainAngle/startDivision;

		let pointRadians = startAngle;
		let lastPoint = new geometry.Point(0,0);
		for (let c=0; c < copies; c++) {

			pointRadians += mainAngle/copyOffset;

			let degrees = c * (360/copies);

			for (let i=0; i <= sides; i++)
			{
				pointRadians += mainAngle * pointStep;

				const p = new geometry.PolarPoint(pointRadians, radius).toPoint();

				if (coordinates === 'relative') {

					x = p.x - lastPoint.x;
					y = p.y - lastPoint.y;

					path  += (i===0) ? `m${this.round(x)},${this.round(y)} ` : `l${this.round(x)},${this.round(y)} `;
					lastPoint = p;

				} else {
					x = p.x;
					y = p.y;
					//console.log(i,Math.round(degrees(pointRadians)),x,y);

					path  += (i===0) ? `M${this.round(x)},${this.round(y)} ` : `L${this.round(x)},${this.round(y)} `;
				}
			}// for i

			if (copyPaths === 'separate') {
				result += `<path d="${path} z" style="--degrees:${degrees};--sibling-index:${c+1};--sibling-count:${copies}; "/>`;
				lastPoint = new geometry.Point(0,0);
				path = '';
			}
			else {
				path += ` Z `;
			}
		}// for c

		if (copyPaths === 'combined') {
			result = `<path d="${path} z" style="--degrees:0"/>`;
		}

		return result;
	}/* getPolygonPath */








	loadPreset(presetName) {

		const preset  = polygonPreset[presetName];

		console.log('loadPreset', presetName, preset );

		if (preset) {
			for (let key in preset.polygon) {
				this[key] = preset.polygon[key];
			}

			for (let key in preset.style) {
				this[key] = preset.style[key];
			}
		}

		this.redraw();

	}





	getForm() {
		const result = `
			<label for="input-screensaver-preset"><h3>Preset</h3></label>
			<select name="preset" id="input-screensaver-preset">
				<!-- <option>-</option> -->
				<option value="nonagon">nonagon</option>
				<option value="diPentagram">di-pentagram</option>
				<option value="diHeptagram" selected>di-heptagram</option>
				<option value="triHeptadecagram">tri-heptadecagram</option>
			</select>

			<label for="input-sides">sides</label>
			<input id="input-sides" type="number" name="sides" title="sides" min="1" value="7"/>

			<label for="input-pointStep">point step</label>
			<input id="input-pointStep" type="number" name="pointStep" title="pointStep" value="3"/>

			<label for="input-startDivision">start division</label>
			<input id="input-startDivision" type="number" name="startDivision" title="startDivision" value="1">

			<label for="input-radius">radius</label>
			<input id="input-radius" type="number" name="radius" title="radius" value="1000" list="datalist-radius"/>
			<datalist id="datalist-radius">
				<option>100</option>
				<option>200</option>
				<option>500</option>
				<option>1000</option>
				<option>1200</option>
				<option>1500</option>
				<option>2000</option>
				<option>5000</option>
			</datalist>

			<label for="input-copies"><h3>copies</h3></label>
			<input id="input-copies" type="number" name="copies" title="copies" min="0" value="2" >

			<label for="input-copyOffset">copy offset</label>
			<input id="input-copyOffset" type="number" name="copyOffset" title="copyOffset" value="2">

			<label for="input-copyPaths">copy paths</label>
			<select id="input-copyPaths" name="copyPaths" size="2">
				<option value="combined">combined</option>
				<option value="separate" selected>separate</option>
			</select>

			<input type="hidden" id="input-coordinates" name="coordinates" value="absolute">
			<input type="hidden" id="input-decimalPlaces" name="decimalPlaces" value="0">
		`;
		return result;
	}


	/*
		<label for="input-coordinates"><h3>coordinates</h3></label>
		<select id="input-coordinates" name="coordinates" size="2">
			<option value="absolute" selected>absolute</option>
			<option value="relative">relative</option>
		</select>
		<label for="input-decimalPlaces">decimal places</label>
		<input id="input-decimalPlaces" type="number" name="decimalPlaces" title="sides" min="0" value="0" max="9"/>
	*/


	//
	//	Polygon setting accessors
	//


	/**	@returns {number}	*/
	get sides() {
		return parseInt(this.element.sides.value);
	}

	/**	@param {number} sides	*/
	set sides(sides) {
		this.element.sides.value = Math.round(sides);
	}


	/**	@returns {number}	*/
	get pointStep() {
		return parseInt(this.element.pointStep.value);
	}

	/**	@param {number} pointStep	*/
	set pointStep(pointStep) {
		this.element.pointStep.value = Math.round(pointStep);
	}


	/**	@returns {number}	*/
	get startDivision() {
		return parseInt(this.element.startDivision.value);
	}

	/**	@param {number} startDivision	*/
	set startDivision(startDivision) {
		this.element.startDivision.value = Math.round(startDivision);
	}


	/**	@returns {number}	*/
	get radius() {
		return parseInt(this.element.radius.value);
	}

	/**	@param {number} radius	*/
	set radius(radius) {
		this.element.radius.value = Math.round(radius);
	}


	/**	@returns {number}	*/
	get copies() {
		return parseInt(this.element.copies.value);
	}

	/**	@param {number} copies	*/
	set copies(copies) {
		this.element.copies.value = Math.round(copies);
	}


	/**	@returns {number}	*/
	get copyOffset() {
		return parseInt(this.element.copyOffset.value);
	}

	/**	@param {number} copyOffset	*/
	set copyOffset(copyOffset) {
		this.element.copyOffset.value = Math.round(copyOffset);
	}


	/**	@returns {string}	*/
	get copyPaths() {
		return this.element.copyPaths.value;
	}

	/**	@param {string} copyPaths	*/
	set copyPaths(copyPaths) {
		this.element.copyPaths.value = copyPaths;
	}


	/**	@returns {string}	*/
	get coordinates() {
		return this.element.coordinates.value;
	}

	/**	@param {string} coordinates	*/
	set coordinates(coordinates) {
		this.element.coordinates.value = coordinates;
	}


	/** @returns {number}	*/
	get decimalPlaces() {
		return parseInt(this.element.decimalPlaces.value);
	}

	/** @param {number} decimalPlaces	*/
	set decimalPlaces(decimalPlaces) {
		this.element.decimalPlaces.value = Math.round(decimalPlaces);
	}


	/** round
	 * @param {number} number
	 * @param {number} decimalPlaces
	 * @return {string}
	 */
	round(number, decimalPlaces = this.decimalPlaces) {
		return number.toFixed(decimalPlaces);
	}



}/* PolygonScreensaver */





export const instance = new PolygonScreensaver();
