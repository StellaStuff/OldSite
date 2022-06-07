var t = 0;
var w = 0;
var h = 0;
var loops = 0;

var toggle = false;
var toggletst = false;

function setup() {
  createCanvas(500, 500,WEBGL);
  if (width < height) {
    w = width/2;
  } else {
   	w = height/2; 
  }
  h = w/2;
}

function draw() {
	
	
	strokeWeight(0);
  background(255);
	ambientLight(150);
  ambientMaterial(250,56,9);
	directionalLight(250, 250, 250, 5, 5, 0.25)
	//translate(width/2,height/2);
	rotateY(t);
  rotateX(t);
	if(t == 0) {
		if (toggle) {
			toggle = false;
		} else {
			toggle = true;
		}
	}
	t = t + PI/100;
	if (toggle) {
		box(w,w,w);
	} else {
		translate(0,0,w/2);
		plane(w,w);
    beginShape(TRIANGLES);
    vertex(-w/2,w/2, 0);
    vertex(w/2,w/2, 0);
    vertex(0,0, -h);
    endShape();
    beginShape(TRIANGLES);
    vertex(w/2,w/2, 0);
    vertex(w/2,-w/2, 0);
    vertex(0,0, -h);
    endShape();
    beginShape(TRIANGLES);
    vertex(-w/2,-w/2, 0);
    vertex(-w/2,w/2, 0);
    vertex(0,0, -h);
    endShape();
    beginShape(TRIANGLES);
    vertex(-w/2,-w/2, 0);
    vertex(w/2,-w/2, 0);
    vertex(0,0, -h);
    endShape();
    //translate(0,0,-h);
    //sphere(w/2);
	}
	//print(t);
	
	if (t > TWO_PI) {
		t = 0;
    toggletst = false;
		loops = loops + 1;
	}
}