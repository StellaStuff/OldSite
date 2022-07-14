
class basicFrame {
  constructor() {
    this.class = "basic";
    this.health = 100;
    this.defence = 1;
  }
  show() {
    rectMode(CENTER);
    rect(0,0,40,40);
  }
}

class basicDriveTrain {
  constructor() {
    this.class = "basic";
    this.health = 100;
    this.defence = 1;
    this.speed = 2;
    this.turningSpeed = 1;
  }
  show() {
    rectMode(CENTER);
    rect(20,0,15,60);
    rect(-20,0,15,60);
  }
}

class basicKnife {
  constructor() {
    this.class = "basic";
    this.health = 100;
    this.defence = 1;
    this.reload = -1;
    this.reloadSpeed = 0.3;
  }
  show() {
    triangle(-10,-10 + this.reload,10,-10 + this.reload,0,20 + this.reload);
    
    if (this.reload > 0) this.reload -= this.reloadSpeed * (deltaTime/16.66666);
  }
  activate() {
    if (this.reload < 0) this.reload = 20;
  }
}