var t = 0;
var bit = [];
var maxx = 300;
let pg1;
let pg2;

function setup() {
  canvas = createCanvas(500, 500);
  canvas.parent("canvas");
  pg1 = createGraphics(width,height);
  pg2 = createGraphics(width,height);
}

function draw() {
  //background(220);
  t = t +PI;
  
  pg1.strokeWeight(3);
  pg1.translate(pg1.width/2,pg1.height/2);
  pg1.clear();
  
  for(i = 0; i < maxx;i = i + 1) {
    stroke(0);
    
    pg1.point(sin(t/i)*i * 2,cos(t/i)*i *2);
    if (round(sin(t/i)*100) == 0 && cos(t/i) > 0) {
      bit[i] = color(0,255,0); 
    } else {
      bit[i] = color(255);
    }
    //if (bit[i].isNaN) {
      pg2.fill(bit[i]);
    //}
    pg2.noStroke();
    //translate(-width/2,-height/2);
    pg2.rect(t/2 % width,i*(height/maxx),2,height/maxx);
  }
  pg1.translate(-pg1.width/2,-pg1.height/2);
  //print(height/maxx);
  image(pg2,0,0);
  image(pg1,0,0);
}
