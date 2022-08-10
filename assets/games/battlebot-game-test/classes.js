function crosshair() {
  
  var rot = millis() / 200;
  var r = 4;
  var a = 12;
  
  translate(mouseX,mouseY);
  rotate(rot);

  
  line (r,-a,r,a);
  line (-r,-a,-r,a);
  
  line (-a,r,a,r);
  line (-a,-r,a,-r);
  
  resetMatrix();
}

function sidedShape(x, y, r, sides) {
  beginShape();
  for (i = 0; i < sides + 2; i = i + TWO_PI / sides) {
    vertex(sin(i) * r + x, cos(i) * r + y);
    vertex(sin(i + TWO_PI / sides) * r + x, cos(i + TWO_PI / sides) * r + y);
  }
  endShape();
}

class Player {
  constructor(X,Y) {
    this.x = X;
    this.y = Y;
    this.r = 0;
    this.frame = new basicFrame();
    this.driveTrain = new basicDriveTrain();
    this.hull  = 0;
    this.weapon = new basicKnife();
    this.secondaryWeapon = 0;
  }
  show () {
    translate(this.x,this.y);
    rotate(this.r - PI/2);
    if(this.driveTrain      != 0) this.driveTrain.show();
    if(this.frame           != 0) this.frame.show();
    if(this.hull            != 0) this.hull.show();
    if(this.weapon          != 0) this.weapon.show();
    if(this.secondaryWeapon != 0) this.secondaryWeapon.show();
    
    resetMatrix();
    
    crosshair();
    
  }
  move () {
    if (up) {
      this.x += cos(this.r) * (deltaTime/16.66666) * this.driveTrain.speed;
      this.y += sin(this.r) * (deltaTime/16.66666) * this.driveTrain.speed;
    }
    
    if (down) {
      this.x -= cos(this.r) * (deltaTime/16.66666) * this.driveTrain.speed;
      this.y -= sin(this.r) * (deltaTime/16.66666) * this.driveTrain.speed;
    }
    
    if (left)  this.r -= TWO_PI/100 * (deltaTime/16.66666) * this.driveTrain.turningSpeed;
    if (right) this.r += TWO_PI/100 * (deltaTime/16.66666) * this.driveTrain.turningSpeed;
  }
}

class Enemy {
  constructor(X,Y) {
    this.x = X;
    this.y = Y;
    this.r = 0;
    this.frame = new basicFrame();
    this.driveTrain = new basicDriveTrain();
    this.hull  = 0;
    this.weapon = new basicKnife();
    this.secondaryWeapon = 0;
  }
  show () {
    translate(this.x,this.y);
    rotate(this.r - PI/2);
    if(this.driveTrain      != 0) this.driveTrain.show();
    if(this.frame           != 0) this.frame.show();
    if(this.hull            != 0) this.hull.show();
    if(this.weapon          != 0) this.weapon.show();
    if(this.secondaryWeapon != 0) this.secondaryWeapon.show();
    
    resetMatrix();
    
  }
  move () {
    //add this shit later
  }
}

