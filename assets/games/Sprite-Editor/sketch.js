/////////////settings/////////////////////
var maxhistory = 50;
//the amount of undos you have
var resx = 64, resy = 64;
//the resolution of the bitmap
var grid = false;
//show grid


/////////////////////////////////////////
let Sslider,dSlider,colourinput, pg, limg;
var zoom = 5,prezoom, t,colour,savebutt,undobutt,loadbutt;
var clik1 = false, clik2 = false, clik3 = false, alt = false;
var mx, my,offx = 0,offy = 0,preoffx = 0,preoffy = 0, histcount = 0,size = 5;

var px = [];
var pxhist = [];






function setup() {
  
  colourinput = createColorPicker('#ff0000');
  
  createP('Size').position(480,20);
  createP('dither').position(610,20);
  
  
  grid        = createCheckbox('grid', false);
  savebutt    = createButton  ('Save image' );
  undobutt    = createButton  ('Undo' );
  loadbutt    = createButton  ('load img' );
  input       = createFileInput(handleFile);
  
  savebutt.mousePressed(savee);
  undobutt.mousePressed(undo);
  loadbutt.mousePressed(load);
  
  sSlider = createSlider(1, 10,  1);
  dSlider = createSlider(1, 5,  1);
  
  colorMode(HSB);
  
  pg = createImage(resx, resy);
  
  createCanvas(640, 480);
  for(i = 0; i < resx*resy;i=i+1) {
    px[i] = color(255);
  }

  for(i = 0; i < maxhistory + 1;i=i+1) {
    pxhist[i]= [];
  }
  
}

function draw() {
  

  background(0,0,50);
  ////////////butt(on) stuff//////////
  size = sSlider.value() * 2 - 1;
  if(clik1 == true) {
    zoom =prezoom+ my-mouseY;
  } else {
    prezoom = zoom;
  }
  if(clik2 == true) {
    offx = mouseX-  mx + preoffx;
    offy = mouseY - my + preoffy;
  } else {
    preoffx = offx;
    preoffy = offy;
  }
  if(clik3 == true) {
    if(mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) { //checks if the mouse is in the window
      for(i = -size/2; i < size/2; i = i+1) { //fills with the brush size
        for(j = -size/2; j < size/2 ; j = j+1) {             
          if(round((mouseX -offx) / zoom + i) % dSlider.value()/2 == 0 && //fills every other line
             round((mouseY -offy) / zoom + j) % dSlider.value()/2 == 0) {

            nnpoint(round((mouseX -offx) / zoom) + i,round((mouseY-offy)/zoom) + j);

          }
        }
      } 
    }
    //print((round((mouseY -offy)  /zoom) + j) % dSlider.value());
  }
  
  if(alt == true) {

  }
  
  colour = colourinput.value();
  /////////////////////////////////////////
  
  
  //////////////art drawing///////////////
  if (grid.checked() == true) {
    stroke(0);
  } else {
    noStroke();
  }
  t = 0;
  translate(offx-zoom/2,offy - zoom*1.5);
  for(i = 0; i < resx*resy;i=i+1) { 
    if (i % resx == 0) {
      t = t + 1;
    }
    fill(px[i]);
    
    rect(i % resx * zoom,t*zoom,zoom,zoom);
  }
  ////////////////////////////////////////
  translate(-offx+zoom/2,-offy + zoom*1.5);
  

}

function mousePressed() {
  if(mouseButton == CENTER) {
    clik1 = true;
  }
  if(mouseButton == RIGHT) {
    clik2 = true;
  }
  if(mouseButton == LEFT) {
    clik3 = true;
    arrayCopy(px,pxhist[histcount]);
  }
  mx = mouseX;
  my = mouseY;
}


function mouseReleased() {
  clik1 = false;
  clik2 = false;
  clik3 = false;
  if (mouseButton == LEFT) {
    
    if (histcount < maxhistory) {
      histcount = histcount + 1;
    } else {
      histcount = 0;
    }
  }
}


function keyPressed() {
  if (keyCode === 90) {
    undo();
  }
  if (keyCode === 18) {
    pointdropper(round((mouseX -offx) / zoom),round((mouseY-offy)/zoom));
  }
  if (keyCode === 83) {
    savee();
  }
}


function undo() {
    if (histcount > 0) {
      histcount = histcount - 1;
    } else {
      histcount = maxhistory;
    }
    arrayCopy(pxhist[histcount],px);
}

function nnpoint(x,y) {
  if(x < resx - 1 && y < resy && x > -1 && y > -1) {
    px[round(y)*resx+round(x)] = colour;
  }
}


function pointdropper(x,y) {
  if(x < resx - 1 && y < resy && x > -1 && y > -1) {
    colourinput.value(px[round(y)*resx+round(x)]);
    
  }
}

function load() {
    limg.loadPixels();
  resx = limg.width;
  resy = limg.height;
    colorMode(RGB);
    for(i = 0; i < resx*resy * 4; i = i+4) {
      px[round(i/4)] = color(limg.pixels[i] ,limg.pixels[i + 1],limg.pixels[i + 2],limg.pixels[i + 3]);
    } 
    limg.updatePixels();
    colorMode(HSB);
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    limg = loadImage(file.data);
    //limg.hide();
    //pg = createImage(limg);
  } else {
    limg = null;
  }
}


function savee() {
  pg = createImage(resx,resy);
  pg.loadPixels();
    for(i = 0; i < resx*resy * 4; i = i+4) {
      pg.pixels[i]     = red(px[i/4]);
      pg.pixels[i + 1] = green(px[i/4]);
      pg.pixels[i + 2] = blue(px[i/4]);
      pg.pixels[i + 3] = 255;
    } 
  pg.updatePixels();
  save(pg);
}


//stella 2018/2019