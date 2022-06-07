var osc;
var t = 0, pt = 0;
var x, y, d, p, ctoggle = true, count = 0;
var buttonx = [0], buttony = [0];
//var playing = false;
/////////////////game data/////////////////

var isanxiety = [true];
var predelay  = [120];
var numbuttons= [4];
//var runbuttons= [true];
var buttontext= [[]];
var text      = [];

///////////////////////////////////////////
let backgground;

function setup() {
  createCanvas(500,500);
  backgground = createGraphics(width,height);
  osc = new p5.Oscillator();
  osc.setType('square');
  osc.freq(240);
  osc.amp(0.3);
  osc.start();
}

function draw() {
  background(255);
  image(backgground,0,0);
  pt = pt + 1;
  
  
  
  if (isanxiety[count] == true && pt > predelay[count]) {
  osc.amp(0.3);
  t = t + 0.1;
  osc.freq(random(t));
  for(i = 0; i < 3; i = i + 1)  {
    
    p = TWO_PI / 200 + p;
    if (random(10) > 9) {
      x = random(width);
      y = random(height);
      d = random(50,300);
      p = random(TWO_PI);
    }
    
    backgground.line(x,y,sin(p)*d + x,cos(p)*d + y);
  }
    fill(255);
  if(t*2 +10 < width|| t*2 + 10 < height) {
    rect(10+t + random(5),10+t + random(5),width-20 - t*2 + random(5), height-20 - t*2 + random(5));
    //print("hecc");
    //print(t);
  }
  if (t > 1000) {
    count = 0;
  }
    for(i=0; i < numbuttons[count]; i = i + 1) {
      if (abs(mouseX - buttonx[i]) < 100 && abs(mouseY - buttony[i]) < 100) {
        buttonx[i] = buttonx[i] - (mouseX - buttonx[i]) * (t * 0.003);
        buttony[i] = buttony[i] - (mouseY - buttony[i]) * (t * 0.003);
      }
    }
      buttonx[i] = (width  / numbuttons[count]) * (i + 0.5);
      buttony[i] = height - 60;
    
    
  } else {
    osc.amp(0);
    rect(10,10,width-20,height-20);
    for(i=0; i < numbuttons[count]; i = i + 1) {
      buttonx[i] = (width  / numbuttons[count]) * (i + 0.5);
      buttony[i] = height - 60;
    }
  }
  noFill();
  rectMode(CENTER);
  for(i=0; i < numbuttons[count]; i = i + 1) {
    rect(buttonx[i],buttony[i],100,50);
  }
  rectMode(CORNER);
  
}

