function preload() {
  models = loadJSON("models.json");
}

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent("canvas");
  print(models);
}
var t = 0;
let player, models;

var bg = 5;
function draw() {
  t+=0.01
  background(bg);
  translate(width/2,height/2);
  render(models.ships[0]);
  translate(50,50);
  rotate(t);
  render(models.ships[1]);
}


