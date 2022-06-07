var x = [];
var y = [];
var cunt = [];

var count;
var t = 0;




function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);
  t = t + 1;
  noStroke();
  fill(255);
  if (random(5,10) > 5) {
    x[count] = random(-width/2,width/2);
    y[count] = random(-height/2,height/2);
    cunt[count] = 1;
    //print("did a thing");
    if (count < 5000) {
      count = count + 1;
    } else {
      count = 0;
    }
    //print(count);
  }
  //strokeWeight(5);
  translate(width/2,height/2);
  for (var i = 0; i < x.length; i = i + 1) {
    
    cunt[i] = cunt[i] + 0.01;
    ellipse(x[i] * cunt[i],y[i] * cunt[i],cunt[i],cunt[i]);
    //print(cunt[i]);
    
  }
  
}