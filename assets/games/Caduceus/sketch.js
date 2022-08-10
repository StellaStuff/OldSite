var gameState = "title";

let song,hit,pickup,font;
let easy,normal,hard;
let musVol,sfxVol;

var tipnum;
var tips = [
  "you can press 'p' to pause the game and change the difficulty.",
  "the score is the length of both snakes multiplied together, so do your best to make them both as long as possible!"
]




function preload() {
  font = loadFont("dpcomic.ttf");
  hit  = loadSound("hit.ogg");
  song = loadSound("song.ogg");
  pickup = loadSound("pickup.wav");
}

function setup() {
  canvas = createCanvas(800,800);
    canvas.parent("canvas");
  frameRate(8);
  
  
  easy = createButton("easy");
  easy.position(width/2 - 120 - easy.width/2,height/2 - 40);
  easy.mousePressed(easyMode);
    easy.parent("canvas");
  normal = createButton("medium");
  normal.position(width/2 - normal.width/2 + 0,height/2 - 40);
  normal.mousePressed(normalMode);
    normal.parent("canvas");
  hard = createButton("hard");
  hard.position(width/2 + 120 - hard.width/2,height/2 - 40);
  hard.mousePressed(hardMode);
    hard.parent("canvas");
  
  musVol = createSlider(0,1,0.5,0.001);
  musVol.position(width/2 - 72,height/2 + 40);
  musVol.mouseMoved(resetAudioLevels);
    musVol.parent("canvas");
  
  sfxVol = createSlider(0,1,0.3,0.001);
  sfxVol.position(width/2 - 72,height/2 + 110);
  sfxVol.mouseReleased(resetAudioLevels);
    sfxVol.parent("canvas");
  
  print(musVol.width);
  
  easy.hide();
  normal.hide();
  hard.hide();
  
  sfxVol.hide();
  musVol.hide();
  
  snake1col2 = color(200,178,250);//good
  snake1col1 = color(132,114,219);
  snake2col2 = color(172,219,255);//good
  snake2col1 = color(108,188,226);//okay
  
  sfxVol.addClass("slider");
  musVol.addClass("slider");
  
  foodcol = color(251,220,176);
  resetAudioLevels()
  

}
var currentDifficulty = "Medium";
function easyMode() {
  frameRate(6);
  frameDivide = 3;
  currentDifficulty = "Easy"
}

function normalMode() {
  frameRate(8);
  frameDivide = 1;
  currentDifficulty = "Medium"
}

function hardMode() {
  frameRate(13);
  frameDivide = 0;
  currentDifficulty = "Hard"
}

function resetAudioLevels() {
  hit.setVolume(sfxVol.value());
  pickup.setVolume(sfxVol.value());
  song.setVolume(musVol.value());
}


let worldSpace = [];
let player1, player2;
var size = 30;

var frame = 0;
var frameDivide = 1;

var gobuffer = -1;

var up = false;
var down = false;
var left = false;
var right = false;

var paused = false;

var snake1col1;
var snake1col2;

var snake2col1;
var snake2col2;

var score1;
var score2;

var playerSwitch = true;

function draw() {
  noStroke();
  textFont(font);
  background(242,232,254);
  fill(snake1col1);
  
  if (paused) {
    textSize(70);
    text("paused", width / 2, height / 2 - 110);
    textSize(30);
    text("difficulty: " +currentDifficulty, width / 2, height / 2 -60);
    textSize(30);
    text("Music Volume", width / 2, height / 2 + 28);
    text("Sfx Volume", width / 2, height / 2 + 100);
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

  fill(snake1col1);
  textAlign(CENTER);
  textSize(140);
  text("Caduceus", width / 2, height / 2);
  textSize(30);
  text("press any key to start", width / 2, height / 2 + 30);
}

function game() {

  if (playerSwitch) {
    player1.move();
    player1.color = snake1col1;
    player2.color = snake2col2;
    if (frame > frameDivide) {
      player2.move();
      frame = 0;
    }

  } else {
    player2.move();
    player1.color = snake1col2;
    player2.color = snake2col1;
    if (frame > frameDivide) {
      player1.move();
      frame = 0;
    }
  }

  player1.addToWorld();
  player2.addToWorld();
  
  score1 = player1.life;
  score2 = player2.life;
  
  
  frame += 1;

  showWorld();
  fill(snake1col1);
  textSize(40);
  text("score: " + score1*score2, width / 2,30);

}

function pause() {

}

function gameOver() {
  gobuffer -= 1;
  fill(snake1col1);
  textAlign(CENTER, CENTER);
  textSize(70);
  text("Game Over!", width / 2, height / 2 - 100);
  textSize(30);
  text("final score: " + score1*score2, width / 2, height / 2 - 50);
  text("difficulty: " + currentDifficulty, width / 2, height / 2 - 20);
  text("tip: " + tips[tipnum], width/2,height/2 +90,width/2,height/2+90);
}





function showWorld() {
  var s = size * size;
  var t = 0;
  translate((width/size)/2,(height/size)/2);
  rectMode(CENTER);
  
  for (var i = 0; i < s; i++) {
    if (i % size == 0) {
      t = t + 1;
    }

    if (worldSpace[i] != undefined) {
      if (worldSpace[i].constructor.name == "Food") {
        fill(worldSpace[i].col);
        rect(((i % size) * (width / size)), (t - 1) * (height / size), width / size + 1, height / size + 1);
      }
      if (worldSpace[i].constructor.name == "Body") {

        if (playerSwitch) {
          if (worldSpace[i].player == 1) worldSpace[i].life -= 1;
          if (frame > frameDivide) {
            if (worldSpace[i].player == 2) worldSpace[i].life -= 1;
          }

        } else {
          if (worldSpace[i].player == 2) worldSpace[i].life -= 1;
          if (frame > frameDivide) {
            if (worldSpace[i].player == 1) worldSpace[i].life -= 1;
          }
        }

        fill(worldSpace[i].col);
        rect((i % size) * (width / size), (t - 1) * (height / size), width / size + 1, height / size + 1);
        if (worldSpace[i].life < 0) worldSpace[i] = undefined;
      }
    }

  }
}




function startGame() {
  if (!song.isPlaying()) song.loop();
  gameState = "game";
  worldSpace = [];
  player1 = new Player(3, 3, 3, 255, 2, 125, 1);
  player2 = new Player(10, 3, 3, 0, 2, 125, 2);
  for (var i = 0; i < 3; i++) {
    worldSpace[int(random(size * size))] = new Food();
  }
}

function endGame() {
  tipnum = int(random(tips.length));
  gameState = "gameOver";
  gobuffer = 10;
  song.stop();
  hit.play();
}

function pause() {
  paused = true;
    easy.show();
  normal.show();
  hard.show();
  musVol.show();
  sfxVol.show();
}

function unpause() {
  paused = false;
    easy.hide();
  normal.hide();
  hard.hide();
  musVol.hide();
  sfxVol.hide();
}

