class Food {
  constructor() {
    this.foodValue = 2;
    this.col = foodcol;
  }
}

class Body {
  constructor(Life, Col, Player,Rotation) {
    this.life = Life;
    this.col = Col;
    this.player = Player;
    this.rotation = Rotation;
  }
}

class Player {
  constructor(X, Y, Life, r, g, b, Player) {
    this.x = X;
    this.y = Y;
    this.xvel = 0;
    this.yvel = 0;
    this.color = color(r, g, b);
    this.player = Player;

    this.life = Life;
    this.rotation = 4;
  }
  rotate() {
    if (up && this.rotation != 0) this.rotation = 4;
    if (down && this.rotation != 4) this.rotation = 0;
    if (left && this.rotation != 6) this.rotation = 2;
    if (right && this.rotation != 2) this.rotation = 6;

    if (down && left) this.rotation = 1;
    if (down && right) this.rotation = 7;
    if (up && left) this.rotation = 3;
    if (up && right) this.rotation = 5;

  }

  addToWorld() {
    worldSpace[(this.y) * size + (this.x)] = new Body(this.life, this.color, this.player,this.rotation);
  }

  move() {


    if (this.rotation == 0) this.y += 1;
    if (this.rotation == 1) {
      this.y += 1;
      this.x -= 1
    }
    if (this.rotation == 2) this.x -= 1;
    if (this.rotation == 3) {
      this.y -= 1;
      this.x -= 1
    }
    if (this.rotation == 4) this.y -= 1;
    if (this.rotation == 5) {
      this.y -= 1;
      this.x += 1
    }
    if (this.rotation == 6) this.x += 1;
    if (this.rotation == 7) {
      this.y += 1;
      this.x += 1
    }

    if (this.y > size - 1) this.y = 0;
    if (this.x > size - 1) this.x = 0;
    if (this.y < 0) this.y = size - 1;
    if (this.x < 0) this.x = size - 1;


    if (worldSpace[(this.y) * size + (this.x)] != undefined) {
      if (worldSpace[(this.y) * size + (this.x)].constructor.name == "Food") {
        this.life += worldSpace[(this.y) * size + (this.x)].foodValue;
        pickup.play();
        worldSpace[int(random(size * size))] = new Food();
      }
      if (worldSpace[(this.y) * size + (this.x)].constructor.name == "Body") {
        endGame();
      }
    }


  }

}