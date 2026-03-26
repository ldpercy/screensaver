import { Maths } from "../../app/maths.module.js";
import * as geometry from "../../app/geometry.module.js";
import { ui } from "../../app/user-interface.js"

import * as polygonPreset from "./polygon-preset.js";

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
export function getPolygonPath(
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

				path  += (i===0) ? `m${round(x)},${round(y)} ` : `l${round(x)},${round(y)} `;
				lastPoint = p;

			} else {
				x = p.x;
				y = p.y;
				//console.log(i,Math.round(degrees(pointRadians)),x,y);

				path  += (i===0) ? `M${round(x)},${round(y)} ` : `L${round(x)},${round(y)} `;
			}
		}// for i

		if (copyPaths === 'separate') {
			result += `<path d="${path} z" style="--degrees:${degrees}"/>`;
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



/** round
 * @param {number} number
 * @param {number} decimalPlaces
 * @return {string}
 */
function round(number, decimalPlaces = ui.decimalPlaces) {
	return number.toFixed(decimalPlaces);
}




export function redraw() {
	//console.debug('polygon.redraw', this.element);

	const polygonGroup = getPolygonPath(
		ui.sides,
		ui.pointStep,
		ui.startDivision,
		ui.radius,
		ui.copies,
		ui.copyOffset,
		ui.copyPaths,
		ui.coordinates,
	);

	//console.log(starPath);
	document.getElementById('polygon-group').innerHTML = polygonGroup;
}/* redraw */



export function loadPreset(presetName) {

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

	redraw();

}


