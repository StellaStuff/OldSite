function setup() {
  createCanvas(700, 800);
}

segments = 5;
start = 10;
segw = 0.02;


function draw() {
  background(255);
  translate(width / 2, height / 2);
  fill(0);
  for (var i = 1; i < segments+1; i += 1) {
    raycle(i* 70,i* 70 + 60, start * pow(2,i/12));
  }
}

function raycle(id, od, seg) {
  for (var i = 0; i < seg; i += 1) {
    quad(sin((i / seg - segw) * TWO_PI) * od,
         cos((i / seg - segw) * TWO_PI) * od,
         sin((i / seg + segw) * TWO_PI) * od, 
         cos((i / seg + segw) * TWO_PI) * od, 
         sin((i / seg + segw) * TWO_PI) * id, 
         cos((i / seg + segw) * TWO_PI) * id,
         sin((i / seg - segw) * TWO_PI) * id, 
         cos((i / seg - segw) * TWO_PI) * id);
  }
}