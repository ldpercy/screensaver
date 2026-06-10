/*
**	Mote
*/
import { output } from "../../app/output.js";
import { instance, Rand } from './module.js';
import { form } from './form.js';


// Class Mote
export class Mote {
	// Dimensions of drawing area.
	position = output.randomCartesian();

	// Nil initial velocity.
	vx = this.vy = 0;

	// A visual element, initially none
	elt = null;


	// Mote::applyForce() — Adjust velocity
	// towards the given position.
	// Warning: Pseudo-physics — not really
	// governed by any /real/ physical principles.
	applyForce(position, mag) {
		if (position.x > this.position.x) {
			this.vx += mag;
		} else if (position.x < this.position.x) {
			this.vx -= mag;
		}

		if (position.y > this.position.y) {
			this.vy += mag;
		} else if (position.y < this.position.y) {
			this.vy -= mag;
		}
	}

	// Mote::capVelocity() — Apply an upper limit
	// on mote velocity.
	capVelocity() {
		const max = form.maxVelocity;

		if (max < this.vx) {
			this.vx = max;
		} else if (-max > this.vx) {
			this.vx = -max;
		}

		if (max < this.vy) {
			this.vy = max;
		} else if (-max > this.vy) {
			this.vy = -max;
		}
	}

	// Mote::capPosition() — Apply an upper/lower limit
	// on mote position.
	capPosition() {

		if (this.position.x < output.xMin) {
			this.position.x = output.xMin;
		} else if (this.position.x >= output.xMax) {
			this.position.x = output.xMax;
		}

		if (this.position.y < output.yMin) {
			this.position.y = output.yMin;
		} else if (this.position.y >= output.yMax) {
			this.position.y = output.yMax;
		}
	}

	// Mote::move() — move a mote, update the screen.
	move() {
		// Apply attraction to cursor.
		const attract = form.cursorAttraction;
		const cursor = instance.mousePosition;
		this.applyForce(cursor, attract);

		// Apply repulsion from average mote position.
		const repel = form.peerRepulsion;
		const average = instance.averageMotePosition();
		this.applyForce(average, -repel);

		// Add some randomness to the velocity.
		this.vx += Rand(3) - 1;
		this.vy += Rand(3) - 1;

		// Put an upper limit on velocity.
		this.capVelocity();

		// Apply velocity.
		const old_x = this.position.x;
		const old_y = this.position.y;
		this.position.x += this.vx;
		this.position.y += this.vy;
		this.capPosition();

		// Draw it.
		if (this.elt === null) {
			const svg = "http://www.w3.org/2000/svg";
			this.elt = document.createElementNS(svg, "line");
			this.elt.setAttributeNS(null, "stroke", "green");
			this.elt.setAttributeNS(null, "stroke-width", "3");
			this.elt.setAttributeNS(null, "stroke-opacity", "0.5");
			instance.element.group.appendChild(this.elt);
		}

		this.elt.setAttributeNS(null, "x1", old_x);
		this.elt.setAttributeNS(null, "y1", old_y);

		this.elt.setAttributeNS(null, "x2", this.position.x);
		this.elt.setAttributeNS(null, "y2", this.position.y);
	}


}/* Mote */
