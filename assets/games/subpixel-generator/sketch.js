let startimg,fileInput,maxsize;
var pixelSize = 16, border = 0, notch = 2;

function preload() {
  //startimg = loadImage('test.png');
}

function setup() {
  fileInput = createFileInput(handleFile);
    maxsize = createSlider(1000, 10000000, 100);
  createCanvas(10,10);
    
  //reDraw();
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    startimg = loadImage(file.data,reDraw);
  }
}

function draw() {

}

function reDraw() {
    
  resizeCanvas(startimg.width * pixelSize, startimg.height * pixelSize)
  translate(0,-pixelSize)
  noStroke(0);
  background(0);

  startimg.loadPixels();
  
  while (startimg.pixels.length > maxsize.value()) {
        
        startimg.resize(startimg.width*0.5,startimg.height*0.5);
        resizeCanvas(startimg.width * pixelSize, startimg.height * pixelSize);
        translate(0,-pixelSize);
        noStroke(0);
        background(0);
        print("too big! resizing!");
      startimg.updatePixels();
  }
  var i = 0;
  var t = 0;
  for (i = 0; i < startimg.width * startimg.height; i += 1) {
    if (i % startimg.width == 0) {
      t = t + 1;
    }
    showPixel(i % startimg.width * pixelSize, t * pixelSize, i);

  }
  startimg.updatePixels();
  print("done");
  print(i + " " + t);
}

function showPixel(x, y, i) {
  i *= 4;
  fill(startimg.pixels[i],0,0);
  lcdSubPixel(x + (pixelSize / 3) * 0, y);
  fill(0,startimg.pixels[i + 1],0);
  lcdSubPixel(x + (pixelSize / 3) * 1, y);
  fill(0,0,startimg.pixels[i + 2]);
  lcdSubPixel(x + (pixelSize / 3) * 2, y);
}

function lcdSubPixel(x, y) {
  push();
  translate(x,y);
  beginShape();
  vertex(0 + border + notch/2,0 + border);
  vertex(pixelSize / 3 - border - notch/2,0 + border);
  vertex(pixelSize / 3 - border,0 + border + notch/2);
  vertex(pixelSize / 3 - border,pixelSize - notch/2 - border);
  vertex(pixelSize / 3 - border - notch/2,pixelSize - border);
  vertex(0 + border + notch/2,pixelSize - border);
  vertex(0 + border,pixelSize - notch/2 - border);
  vertex(0 + border,0 + border + notch/2);
  
  endShape();
  pop();
}