function keyPressed() {
  if (keyCode === LEFT_ARROW || key == 'a') {
    left = true;
  }
  if (keyCode === RIGHT_ARROW || key == 'd') {
    right = true;
  }
  if (keyCode === UP_ARROW || key == 'w') {
    up = true;
  }
  if (keyCode === DOWN_ARROW || key == 's') {
    down = true;

  }
  if (key == 'p') {
    if (paused) {
      unpause() 
    } else pause();

  }
  
  if (keyCode == 32) {
    playerSwitch = !playerSwitch;
  }
  if (gameState == "game") {
    if (playerSwitch) {
      player1.rotate();
    } else {
      player2.rotate();
    }
  }
  if ((gameState == "title" || gameState == "gameOver") && gobuffer < 0) startGame();
  return false;
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || key == 'a') {
    left = false;
  }
  if (keyCode === RIGHT_ARROW || key == 'd') {
    right = false;
  }
  if (keyCode === UP_ARROW || key == 'w') {
    up = false;
  }
  if (keyCode === DOWN_ARROW || key == 's') {
    down = false;
  }
  if (gameState == "game") {
    if (playerSwitch) {
      player1.rotate();
    } else {
      player2.rotate();
    }
  }
}