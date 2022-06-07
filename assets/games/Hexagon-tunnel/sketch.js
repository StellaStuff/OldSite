function setup() {
  canvas = createCanvas(400, 400);
    parent.resizeIframe();
    canvas.parent("canvas");
}

arrr = 0;

function draw() {
  arrr +=0.03;
  //
  translate(width/2,height/2);
  rotate(arrr/2);
  hexBackground(sin(arrr)*400,cos(arrr)*400,sin(arrr/6)/30);
}

function hexBackground(X,Y,R) {
  //background(0);
  strokeWeight(100);
  noFill();
  
  var x = X,y = Y, r = 0;
  
  for (var i = 0; i < 20; i++) {
    stroke(color(i*10,0,0));
    rotate(r);
    hexagon(x,y, i* 20);
    x *= 0.8;
    y *= 0.8;
    r += R;
  }
  resetMatrix();

}


function hexagon(x, y, d) {
  beginShape();
  for (i = 0; i < 7; i = i + TWO_PI / 6) {
    vertex(sin(i) * d + x, cos(i) * d + y);
    vertex(sin(i + TWO_PI / 6) * d + x, cos(i + TWO_PI / 6) * d + y);
  }
  endShape();
}