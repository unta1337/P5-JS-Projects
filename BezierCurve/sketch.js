function lerp(p1, p2, t) {
	let newX = p1.x + (p2.x - p1.x) * (1 - t);
	let newY = p1.y + (p2.y - p1.y) * (1 - t);

	return  createVector(newX, newY);
}

function setup() {
	createCanvas(500, 500);
}

let t = 0;
function draw() {
	background(0);
	stroke(255);
	strokeWeight(3);

	let p1 = createVector(width / 2, height / 2);
	point(p1.x, p1.y);

	let p2 = createVector(width / 2 + 100, height / 2 + 100);
	point(p2.x, p2.y);

	let p = p5.Vector.lerp(p1, p2, t);
	point(p.x, p.y);
	//point(lerp(p1, p2, t));
}
