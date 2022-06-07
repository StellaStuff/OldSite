class Player {
  constructor() {
    this.health = 100;
    this.x = 5;
    this.y = 5;
    this.xs = 1;
    this.ys = 0;
    this.r = 0;
  }
  show() {
    translate(this.x, this.y);
    fancyLine(0, 0, -5, 10);
    fancyLine(0, 0, 5, 10);
  }
  move() {
    this.x += this.xs;
    this.y += this.ys;
  }

}

function fancyLine(a, b, x, y) {


  for (var i = 0; i < 10; i += 1) {
    stroke(150, 200, 255, pow(1.8, i * 1.1));
    //print(pow(1.8,i));
    strokeWeight(10 - i);
    line(a, b, x, y);
    strokeWeight(10 - i - 5);
    point(a, b);
    point(x, y);
  }

  stroke(150, 200, 255, 2);
  strokeWeight(25);
  line(a, b, x, y);

  stroke(150, 200, 255, 3);
  strokeWeight(20);
  line(a, b, x, y);

  stroke(150, 200, 255, 3);
  strokeWeight(15);
  line(a, b, x, y);

  stroke(150, 200, 255, 10);
  strokeWeight(13);
  line(a, b, x, y);

  stroke(200,250,255);
  strokeWeight(1);
  line(a, b, x, y);
  point(a, b);
  point(x, y);

}

function find(name, json) {
  var i = 0;
  try {
    while (json[i] != undefined) {
      if (json[i].name == name) {
        return i;
      }
      i += 1;
    }
    throw "find: 'could not find name: " + name + "'";
  } catch (e) {
    console.error(e);
  }
}

function render(json) {
  //////////////////////////////goes through every polygon on the model///////
  for (var j = 0; j < json.shapes.polygons.length; j += 1) {
    //////////////////////////////draws the opaque background/////////////////
    fill(bg);
    noStroke();
    beginShape();
    var polylen = json.shapes.polygons[j].length;

    for (var i = 0; i < polylen; i += 2) {
      vertex(json.shapes.polygons[j][i], json.shapes.polygons[j][i + 1])
    }
    endShape();
    //////////////////////////////draws the fancy lines on the perimiter/////
    noFill();
    for (i = 0; i < polylen; i += 2) {
      fancyLine(json.shapes.polygons[j][i % polylen], json.shapes.polygons[j][(i + 1) % polylen],
        json.shapes.polygons[j][(i + 2) % polylen], json.shapes.polygons[j][(i + 3) % polylen]);
    }
  }
  //////////////////////////////draws the extra lines////////////////////////
  var lnlen = json.shapes.lines.length;
  for (var i = 0; i < lnlen; i += 4) {
    fancyLine(json.shapes.lines[i % lnlen], json.shapes.lines[(i + 1) % lnlen],
      json.shapes.lines[(i + 2) % lnlen], json.shapes.lines[(i + 3) % lnlen]);
  }
}
///im sorry