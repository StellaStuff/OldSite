function loadElements() {
  
  pauseButton = createButton("Settings");
  pauseButton.position(width - 70 - pauseButton.width/2,height - 35);
  pauseButton.mousePressed(pButton);
    pauseButton.parent("canvas");
  
  musVol = createSlider(0,1,0.4,0.001);
  
  musVol.position(width/2 - 72,height/2 + 40);
  musVol.mouseMoved(resetAudioLevels);
    musVol.parent("canvas");
  
  sfxVol = createSlider(0,1,0.3,0.001);
  sfxVol.position(width/2 - 72,height/2 + 110);
  sfxVol.mouseReleased(resetAudioLevels);
    sfxVol.parent("canvas");
  
  sfxVol.addClass("slider");
  musVol.addClass("slider");
  
  sfxVol.hide();
  musVol.hide();
  resetAudioLevels()
  
  pauseButton.hide();
}

function resetElements() {
  pauseButton.position(width - 70 - pauseButton.width/2,height - 35);
  musVol.position(width/2 - 72,height/2 + 40);
  sfxVol.position(width/2 - 72,height/2 + 110);
}

function loadLevels() {
  var temp;
  var x = 0, y = 0, t = 0;
  temp = levels;
  levels = [[]];
  while(true) {
    if (temp[t] != "break") {
      levels[x][y] = temp[t]
      y += 1;
      
    } else {
      y = 0;
      x +=1;
      levels[x] = [];
    }
    t += 1;
    if (temp[t] == undefined) return;
  }
}

function pButton() {
  startNewGame();
  pause();
}

function resetAudioLevels() {
  song.setVolume(musVol.value());
  hit.setVolume(sfxVol.value());
}

function startNewGame() {
  octagonis.stop();
  score = 0;
  gameState = "game";
  r = (0.003 * (1600 / 14)) / 2;
  rotatingDirection = true;
  speed = 0.005;
  player = new Player();
  walls = new Walls();
  song.loop();
  pauseButton.hide();
}

function endGame() {
  gameState = "gameOver";
  song.stop();
  goBuffer = 1000;
}

function pause() {
  paused = true;
    sfxVol.show();
  musVol.show();
  pauseButton.hide();
}

function unPause() {
  paused = false;
    sfxVol.hide();
  musVol.hide();
}

function drawBackground() {
  stroke(255);

  for (let i = 0; i < TWO_PI; i += TWO_PI / 8) {
    line(0, 0, sin(i) * size, cos(i) * size);
  }
}

function hitRumble() {
  var strokeRumble = (amplitude.getLevel() / musVol.value()) * 30;
  if (int(hit.currentTime() * 10) != 0) {
    strokeWeight(strokeRumble + random(40 * map(hit.currentTime(), 0, hit.duration(), 1, 0)));
    translate(random(20 * map(hit.currentTime(), 0, hit.duration(), 1, 0)), random(20 * map(hit.currentTime(), 0, hit.duration(), 1, 0)));
  } else {
    strokeWeight(strokeRumble);
  }
  if (strokeRumble < 1 || int(musVol.value()*60) < 1) {
    strokeWeight(3);
    if (int(hit.currentTime() * 10) != 0) { 
      strokeWeight(3 + random(40 * map(hit.currentTime(), 0, hit.duration(), 1, 0)) );
    }
  }
}


function showVisualEffects() {
  hitRumble();
  if (debug) strokeWeight(1);

  if (!debug) {
    if (int(song.currentTime() * 10) % 32 == 0) {
      rotatingDirection = true;
    }
    if (int(song.currentTime() * 10) % 32 == 16) {
      rotatingDirection = false;
    }
    if (rotatingDirection) {
      r = map(song.currentTime() * 10 % 16,0,16,-(0.003 * (1600 / 14)) / 2,(0.003 * (1600 / 14)) / 2);
    } else {
      r = map(song.currentTime() * 10 % 16,0,16,(0.003 * (1600 / 14)) / 2,-(0.003 * (1600 / 14)) / 2);
    }
  }




}

function loadLevel(Lvl) {
  lvlpos = 2;
  lvl = Lvl;

  speed += 0.00021;
  score += 150;

  for (var i = 0; i < levels[lvl].length; i += 2) {
    walls.walls.push(new Wall(float(levels[lvl][i]), float(levels[lvl][i + 1])))
  }
}

class Wall {
  constructor(rot, dep) {
    this.rotation = rot;
    this.x = dep;
  }
  show() {
    quad((cos((TWO_PI / 8) * (this.rotation + 2)) * size) * this.x,
      (sin((TWO_PI / 8) * (this.rotation + 2)) * size) * this.x,
      (cos((TWO_PI / 8) * (this.rotation + 1)) * size) * this.x,
      (sin((TWO_PI / 8) * (this.rotation + 1)) * size) * this.x,
      (cos((TWO_PI / 8) * (this.rotation + 1)) * size) * (this.x + 0.1),
      (sin((TWO_PI / 8) * (this.rotation + 1)) * size) * (this.x + 0.1),
      (cos((TWO_PI / 8) * (this.rotation + 2)) * size) * (this.x + 0.1),
      (sin((TWO_PI / 8) * (this.rotation + 2)) * size) * (this.x + 0.1));
  }
  move(v) {
    this.x = this.x - v;
  }
}

class Walls {
  constructor() {
    this.walls = [];
  }
  show() {
    for (var i = 0; i < this.walls.length; i++) {
      this.walls[i].show();
    }
  }
  move() {
    for (var i = 0; i < this.walls.length; i++) {
      if (debug == false) {
        this.walls[i].move(speed);
      }
      if (((this.walls[i].x > 1 / 9 && this.walls[i].x < 1 / 7 && this.walls[i].rotation == player.rotation) ||
          (this.walls[i].x < -1 / 9 && this.walls[i].x > -1 / 7 && this.walls[i].rotation == ((player.rotation + 4) % 8))) && hitBuffer < 0) {
        hitBuffer = 300;
        player.hit();
        hit.play();
      }

    }
    if (!debug) {
      lvlpos -= speed;
    }

    if (lvlpos < 0.6) {
      loadLevel(int(random(levels.length)));
    }
  }

}

class Player {
  constructor() {
    this.rotation = 0;
    this.health = 100;
  }

  rotate() {
    if (up) this.rotation = 4;
    if (down) this.rotation = 0;
    if (left) this.rotation = 2;
    if (right) this.rotation = 6;

    if (down && left) this.rotation = 1;
    if (down && right) this.rotation = 7;
    if (up && left) this.rotation = 3;
    if (up && right) this.rotation = 5;

    //if (up + down + left + right == 0) this.rotation = 255;
  }

  show() {
    rotate(-TWO_PI / 8 / 2);
    if (this.rotation != 255) {

      rotate((TWO_PI / 8) * this.rotation);
      translate(0, size / 7);
      triangle(0, 5, 15, -15, -15, -15);

    } else {
      ellipse(0, 0, 30, 30);
    }

  }

  hit() {
    this.health -= 15;
  }
}