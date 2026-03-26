//
//	polygonApp.js
//

import { HTMLApp } from "../../[html-common]/module/HTMLApp.js";
import { Maths } from "../../[common]/maths.module.js";
import * as geometry from "../../[common]/geometry.module.js";
import { ui } from "./user-interface.js";


class PolygonApp extends HTMLApp {

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
		console.debug(arguments);
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
	round(number, decimalPlaces = ui.decimalPlaces) {
		return number.toFixed(decimalPlaces);
	}




}/* PolygonApp */






export const polygonApp = new PolygonApp();

