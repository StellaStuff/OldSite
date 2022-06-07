
var gameState = "game";

let player = new Player(20,20);
let enemies = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  switch(gameState) {
    case "title":
      titleScreen()
      break;
    case "game":
      gameScreen()
      break;
    case "gameOver":
      gameOver()
      break;
  }
}

function titleScreen() {
  
}


function gameScreen() {
  background(255);

  player.show();
  player.move();
}
function gameOver() {
  
}



//////////////////////////////////input detection///////////////////////////
{
//////////////movement bools//////////////////////////////////////////////
var up = false;
var down = false;
var left = false;
var right = false;
//////////////////////////////////////////////////////////////////////////
  
  
function 
  keyPressed() {
  if (keyCode === LEFT_ARROW  || key == 'a') {
    left = true;
  }
  if (keyCode === RIGHT_ARROW || key == 'd') {
    right = true;
  }
  if (keyCode === UP_ARROW    || key == 'w') {
    up = true;
  }
  if (keyCode === DOWN_ARROW  || key == 's') {
    down = true;
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW  || key == 'a') {
    left = false;
  }
  if (keyCode === RIGHT_ARROW || key == 'd') {
    right = false;
  }
  if (keyCode === UP_ARROW    || key == 'w') {
    up = false;
  }
  if (keyCode === DOWN_ARROW  || key == 's') {
    down = false;
  }
}
  
function mousePressed() {
  if(gameState == "game") {
    player.weapon.activate();
  }
}
  
}
////////////////////////////////////////////////////////////////////////////