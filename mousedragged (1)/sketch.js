var r, g, b,o,s,x,z,a;
function setup() { 
  createCanvas(700,700);
	background(250,50,250);
  frameRate(60);
}

function draw() {
	
}

function mouseWheel() {
	createCanvas(x, z);
		r = random(255);
	g = random(255);
	b = random(255);
	o= random(255);
	s= random(10);
	x= random(800);
	z= random(800);
	a= random (50);

	background(r,g,b);
	
}
function mouseDragged() {
r = random(255);
	g = random(255);
	b = random(255);
	o= random(255);
	s= random(10);
	x= random(800);
	z= random(800);
	a= random (50);

	 stroke(r,g,b,o);
	strokeWeight(s);
	ellipse(mouseX,mouseY,a,a,g)
	fill(r,g,b,o)
	
}
