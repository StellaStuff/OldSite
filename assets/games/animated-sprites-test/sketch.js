let tex;
let fuck;
function preload() {
  tex = new animatedTexture(25,4,2,loadImage('tracks.png'));
  fuck = loadImage('tracks.png')
  
}

function setup() {
  var canvas = createCanvas(400, 400);
  frameRate(100);
  tex.img.resizeNN(100,100);
    parent.resizeIframe();
    canvas.parent("canvas");
  //img.resize(300, 300);
}
var t = 0;
var total = 0;

function draw() {
  background(220);
  t += 0.01;
  //scale(5);
  translate(width/2,height/2);
  //img.resizeNN(sin(t)*256,sin(t)*256);
  tex.animate(sin(t)*100,cos(t)*100)

  
  if (frameCount < 1000) {
    text("speed: " + deltaTime,20,20);
    total = millis();
  } else {
    text("speed: " + total/1000,20,20);
  }
  
}

class animatedTexture {
  constructor(M,Frames,FrameRate,Img) {
    this.frame = 0; 
    this.m = M;
    this.frames = Frames;
    this.frameRate = FrameRate;

    this.img = Img;
  }
  animate(x,y) {
    this.frame += (deltaTime/16.666)/this.frameRate;
    if (this.frame > this.frames) this.frame = 0;
    if (this.frame < 0) this.frame = this.frames -1;
    image(this.img, x,y,this.m, this.img.width,this.m*int(this.frame),0,this.m, this.img.width);
  }
}
