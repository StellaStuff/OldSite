function setup() {
  createCanvas(640, 480, WEBGL);
  tuneing = createSlider(0, 500, 1, 0.001);
  tuneing.addClass("slider");
  tuneing.position(-5, height + 20);
  tuneingtext = createP('"in tune"-ness');
  tuneingtext.position(0, height - 10);


  volume = createSlider(0, 0.5, 0.25, 0.001);
  volume.addClass("slider");
  volume.position(-5, height + 60);
  volumetext = createP('Volume');
  volumetext.position(0, height + 30);

  stotal = createSlider(0, 150, 75, 1);
  stotal.addClass("slider");
  stotal.position(-5, height + 100);
  stotal.mouseReleased(resetOscs);
  stotaltext = createP('this is some text');
  stotaltext.position(0, height + 70);

  note = createSlider(0, 88, 44, 1);
  note.addClass("slider");
  note.position(-5, height + 140);
  offset = noise(500, 500, time / 1000) * 600;
  resetOscs();
  notetext = createP('this is some text');
  notetext.position(0, height + 110);

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
  print(offset);
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