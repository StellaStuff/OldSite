function setup() {
  canvas = createCanvas(640, 480, WEBGL);
    canvas.parent("canvas");

  tuneing = createSlider(0, 500, 50, 0.001);
  tuneing.addClass("slider");
  tuneing.parent("canvas");
  tuneing.position(-5, height + 40);
  tuneingtext = createP('"in tune"-ness');
  tuneingtext.parent("canvas");
  tuneingtext.position(0, height - 10);


  volume = createSlider(0, 0.5, 0.1, 0.001);
  volume.addClass("slider");
  volume.parent("canvas");
  volume.position(-5, height + 90);
  volumetext = createP('Volume');
  volumetext.parent("canvas");
  volumetext.position(0, height + 40);

  stotal = createSlider(0, 150, 75, 1);
  stotal.addClass("slider");
  stotal.parent("canvas");
  stotal.position(-5, height + 140);
  stotal.mouseReleased(resetOscs);
  stotaltext = createP('this is some text');
  stotaltext.parent("canvas");
  stotaltext.position(0, height + 90);

  note = createSlider(0, 88, 44, 1);
  note.addClass("slider");
  note.parent("canvas");
  note.position(-5, height + 190);
  offset = noise(500, 500, time / 1000) * 600;
  resetOscs();
  notetext = createP('this is some text');
  notetext.parent("canvas");
  notetext.position(0, height + 140);

}

function resetOscs() {
  for (var i = 0; i < total; i += 1) {
    oscs[i].stop();
    oscs[i] = undefined;
    dots[i] = undefined;
  }
  total = stotal.value();
  for (var i = 0; i < total; i += 1) {
    dots[i] = new dot(0, i * (TWO_PI / total));
    oscs[i] = new p5.Oscillator('sawtooth');
    oscs[i].start();
  }
}
var total;
var time = 1;
var offset = 0;
var freq = 0;
let dots = [];
let oscs = [];
let notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

function draw() {
  orbitControl();
  background(255);
  strokeWeight(10);
  //print(offset);
  freq = 262 * pow(2, (note.value() - 44) / 12);
  stotaltext.html("number of oscilators: " + stotal.value());
  notetext.html("current note: " + notes[(note.value() + 88) % 12] + int((note.value()) / 12 + 0.4) );

  for (var i = 0; i < total; i += 1) {
    dots[i].amp = tuneing.value();
    point(dots[i].x(), dots[i].y(), dots[i].z() - freq);
    oscs[i].freq(dots[i].z(), 0.01);
    oscs[i].amp(volume.value());

  }


}

class dot {
  constructor(A, D) {
    this.amp = A;
    this.ang = D;
  }
  x() {
    return sin(this.ang) * this.amp;
  }
  y() {
    return (cos(this.ang) * this.amp);
  }
  z() {
    return (noise(this.x() / 300 + 500, this.y() / 300 + 500, time / 1000) * 600 - offset + freq);
  }
}
