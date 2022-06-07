function setup() {
  createCanvas(500, 500);
  ent = createButton('Enter');
  ent.position(width / 2 - ent.size().width / 2 + 100, height / 2);
  ent.mousePressed(enter);


  rcol = color(random(255), random(255), random(255));
  rounds += 1;

  r = createInput(150, 'number');
  r.size(40);
  r.position(width / 2 - ent.size().width / 2 - 50, height / 2);

  g = createInput(150, 'number');
  g.size(40);
  g.position(width / 2 - ent.size().width / 2, height / 2);

  b = createInput(150, 'number');
  b.size(40);
  b.position(width / 2 - ent.size().width / 2 + 50, height / 2);


}
let ent;
var col = [100, 100, 100];
var rcol;
let r, g, b, test;
var rounds = 0;
var score = 0;
var avgscore = 0;

var state = 0;

function draw() {
  background(rcol);
  textAlign(CENTER);
  col = [r.value(), g.value(), b.value()];
  if (rcol.levels[0] + rcol.levels[1] + rcol.levels[2] / 3 > 255 / 2) {
    fill(0);
  } else {
    fill(255);
  }
  textSize(50);
  text("guess the color!", width / 2, height / 2 - 100);

  text("score: " + avgscore, width / 2, height / 2 + 100);

  textSize(15);
  text("R", width / 2 - 50, height / 2 - 10);
  text("G", width / 2, height / 2 - 10);
  text("B", width / 2 + 50, height / 2 - 10);

  if (state == 1) {
    textSize(15);
    text("you were off by:", width / 2 - 120, height / 2 + 35);
    for (var i = 0; i < 3; i += 1) {
      text(col[i] - rcol.levels[i], width / 2 - 50 + 50 * i, height / 2 + 35);
    }
  }


}

function enter() {
  if (state == 0) {
    state = 1;
    this.html("Next");
    var pp = 0;

    for (var i = 0; i < 3; i += 1) {
      pp = pp + 100 - abs(col[i] - rcol.levels[i]);
    }
    score += pp / 3;
    avgscore = int(score / rounds);


  } else {
    this.html("Enter");
    rcol = color(random(255), random(255), random(255));
    rounds += 1;
    state = 0;
  }
}