function preload() {
  song = loadSound("music.ogg");
  font = loadFont("propaganda.ttf");
  levels = loadStrings("levels.txt");
  octagonis = loadSound("octagonis.ogg");
}

let levels;

function setup() {
  hit = loadSound("hit.ogg");
  loadLevels();
  canvas = createCanvas(lastWidth, lastHeight);
    canvas.parent("canvas");
  player = new Player();
  if (!debug) {
    size = sqrt((width * width) + (height * height)) / 2;
  } else {
    size = 200;
  }
  
  loadElements();
  amplitude = new p5.Amplitude();  
  textFont(font);
  octagonis.play(0.8);
}

var speed; //speed the walls move in
var score;
var gameState = "title";
var lastWidth = 1280;
var lastHeight = 720;
var rotatingDirection = true;
var r = 0; //amount rotated
var hitBuffer = 0;
var goBuffer = 200;
var lvl; //last level loaded
var lvlpos = 2; //how far into the level you are

var up = false;
var down = false;
var left = false;
var right = false;

var debug = false; //editing mode
var paused = false;
var visible = true;

var size; //diagonal size of the window

var song, hit;
let amplitude;

let walls;
let player;

function draw() {

  if(!visible) {
    print("im doing nothing!");
    return;
    
  }



  if (paused) {
    showVisualEffects();
    background(0);
    translate(width / 2, height / 2);
    rotate(r);
    rotate(TWO_PI / 8 / 2);
    drawBackground();

    resetMatrix();

    textAlign(CENTER, CENTER);
    textSize(100);
    text("Paused", width / 2, height / 2 - 100);

    textSize(30);
    text("Music volume:", width / 2, height / 2 + 20);
    
    textSize(30);
    text("sfx volume:", width / 2, height / 2 + 90);

    return;
  }

  switch (gameState) {
    case "title":
      titleScreen();
      break;
    case "game":
      game();
      break;
    case "gameOver":
      gameOver();
      break;
  }

}

function titleScreen() {
  background(0);
  translate(width / 2, height / 2);
  rotate(r);
  rotate(TWO_PI / 8 / 2);
  strokeWeight(3);
  drawBackground();

  resetMatrix();
  
  textAlign(CENTER, CENTER);
  textSize(120);
  text("Octagonis", width / 2, height / 2 - 100);

  textSize(30);
  text("press any key to start", width / 2, height / 2 + 100);

  goBuffer -= deltaTime;
  r = r + 0.01;
  
}

function game() {
  showVisualEffects();
  background(0);
  translate(width / 2, height / 2);
  rotate(r);
  rotate(TWO_PI / 8 / 2);
  drawBackground();
  hitBuffer -= deltaTime;
  if (player.health < 0) {
    endGame();
  }

  player.rotate();

  walls.show();
  walls.move();


  player.show();

  ////////// draw ui 
  resetMatrix();
  textAlign(LEFT, CENTER);
  textSize(30);
  text("health: " + player.health + "%", 25, 25);

  textAlign(RIGHT, CENTER);
  textSize(30);
  text("score: " + score, width - 25, 25);
}

function gameOver() {
  background(0);
  hitRumble();
  translate(width / 2, height / 2);
  rotate(r);
  rotate(TWO_PI / 8 / 2);
  drawBackground();

  if (rotatingDirection) {
    r += 0.003 * (deltaTime / 14);
  } else {
    r -= 0.003 * (deltaTime / 14);
  }

  walls.show();
  player.show();

  goBuffer -= deltaTime;

  resetMatrix();
  textAlign(CENTER, CENTER);
  textSize(100);
  text("GAME OVER", width / 2, height / 2);

  textSize(20);
  text("final score: " + score, width / 2, height / 2 + 50);
}