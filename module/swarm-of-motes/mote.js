/*
**	Mote
*/
import { output } from "../../app/output.js";
import { instance, Rand } from './module.js';
import { form } from './form.js';
import { CartesianCoordinates } from "../../[html-common]/module/PlanarSpace.js";


// Class Mote
export class Mote {

	/** @type {CartesianCoordinates} */
	position = output.randomCartesian();
	// Nil initial velocity.
	vx = this.vy = 0;
	/** @type {SVGLineElement} */
	element = null;


	constructor() {
		const svg = "http://www.w3.org/2000/svg";
		this.element = document.createElementNS(svg, "line");
		instance.element.group.appendChild(this.element);
	}


	/** Mote::applyForce()
	 * Adjust velocity towards the given position.
	 * Warning: Pseudo-physics — not really governed by any /real/ physical principles.
	 *
	 * @param {CartesianCoordinates} position
	 * @param {number} force
	 */
	applyForce(position, force) {
		if (position.x > this.position.x) {
			this.vx += force;
		} else if (position.x < this.position.x) {
			this.vx -= force;
		}

		if (position.y > this.position.y) {
			this.vy += force;
		} else if (position.y < this.position.y) {
			this.vy -= force;
		}
	}

	/** Mote::capVelocity()
	 * Apply an upper limit on mote velocity.
	 *
	 * @param {number} maxVelocity
	 */
	capVelocity(maxVelocity) {
		if (Math.abs(this.vx) > maxVelocity) {
			this.vx = maxVelocity * Math.sign(this.vx);
		}
		if (Math.abs(this.vy) > maxVelocity) {
			this.vy = maxVelocity * Math.sign(this.vy);
		}
	}

	// Mote::capPosition() — Apply an upper/lower limit
	// on mote position.
	capPosition() {

		if (this.position.x < output.xMin) {
			this.position.x = output.xMin;
		} else if (this.position.x > output.xMax) {
			this.position.x = output.xMax;
		}

		if (this.position.y < output.yMin) {
			this.position.y = output.yMin;
		} else if (this.position.y > output.yMax) {
			this.position.y = output.yMax;
		}
	}

	// Mote::move() — move a mote, update the screen.
	move() {
		// Apply attraction to cursor force
		this.applyForce(instance.mousePosition, form.attractionForce);

		// Apply repulsion from average mote position
		this.applyForce(instance.averageMotePosition(), -form.peerRepulsion);

		// Add some randomness to the velocity.
		this.vx += Rand(3) - 1;
		this.vy += Rand(3) - 1;

		// Put an upper limit on velocity.
		this.capVelocity(form.maxVelocity);

		// Apply velocity.
		const old_x = this.position.x;
		const old_y = this.position.y;
		this.position.x += this.vx;
		this.position.y += this.vy;
		this.capPosition();

		// Draw it.
		if (this.element === null) {

		}

		this.element.setAttributeNS(null, "x1", `${old_x}`);
		this.element.setAttributeNS(null, "y1", `${old_y}`);

		this.element.setAttributeNS(null, "x2", `${this.position.x}`);
		this.element.setAttributeNS(null, "y2", `${this.position.y}`);
	}


}/* Mote */
