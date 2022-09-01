
class Boxes {
    constructor(size,density,weight,Z) {
        this.size = size;
        this.density = density;
        this.weight = weight;
        this.z = Z;

        this.boxes = [];

        var w = (width / size) * density;
        var h = (height/ size) * density;

        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                this.boxes.push(new box(i/w*width,j/h*height,size,weight,Z));
            }
        }
    }
    resize() {
        this.boxes = [];

        var w = (width / this.size) * this.density;
        var h = (height/ this.size) * this.density;

        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                this.boxes.push(new box(i/w*width,j/h*height,this.size,this.weight,this.z));
            }
        }
    }
    show() {
        for(var i = 0; i < this.boxes.length; i++) {
            this.boxes[i].show();
        }
    }
    move (speed) {
        for(var i = 0; i < this.boxes.length; i++) {
            this.boxes[i].move(speed);
        }
    }

}

class box {
    constructor(x,y,size,weight,z) {
        this.ox = x;
        this.oy = y;
        this.w = size;
        this.h = size;
        this.x = x;
        this.y = y;
        this.z = z;
        this.fx = 0;
        this.fy = 0;
        this.weight = weight;
    }
    show() {
        if (abs(this.fx) > this.z || abs(this.fy) > this.z || (abs(this.x - MOUSEX) <= 100*(1/this.z) && abs(this.y - MOUSEY) <= 100*(1/this.z))) {
                rect(this.x - this.w/2,this.y - this.h/2,this.w,this.h);
        }
        //push();
        //stroke(0);
        //translate(this.x - this.w/2,this.y - this.h/2);
        //plane(this.w,this.h);
        //pop();
    }
    move(speed) {

        //dampens the speed
        this.fx *= 0.9;
        this.fy *= 0.9;

        //calculates the push from the mouse
        var dx = this.x - MOUSEX;
        var dy = this.y - MOUSEY;

        //avoids near zero issues
        if (dx < 10 && dx > -0.1) dx = 10;
        if (dx > -10 && dx < 0.1) dx = -10;

        if (dy < 10 && dy > -0.1) dy = 10;
        if (dy > -10 && dy < 0.1) dy = -10;

        var r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        if (r < 1) {  // To avoid division by 0
            r = 1;
        }

        var f = this.weight / Math.pow(r, 2);
        this.fx += f * dx / r;  // Break it down into components
        this.fy += f * dy / r;

        //calculates the pull from its origin point
        dx = this.ox - this.x;
        dy = this.oy - this.y;

        //avoids near zero issues
        if (dx < 1 && dx > -0.1) dx = 1;
        if (dx > -1 && dx < 0.1) dx = -1;

        if (dy < 1 && dy > -0.1) dy = 1;
        if (dy > -1 && dy < 0.1) dy = -1;

        r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        if (r < 1) {  // To avoid division by 0
            r = 1;
        }
        f = Math.pow(r, 4)/100000;
        this.fx += f * dx / r;  // Break it down into components
        this.fy += f * dy / r;


        //unbreaks nans
        if(isNaN(this.x) || isNaN(this.y)) {
            this.fx = 0;
            this.fy = 0;
            this.x = this.ox;
            this.y = this.oy;
            print("NaN detected! Fixing!");
        }


        //adds the speed to the position
        this.x += this.fx * speed;
        this.y += this.fy * speed;
    }
}

let colors = [];

let aboxes, bboxes, cboxes;
var darkmode = 0;

function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
    aboxes.resize();
    bboxes.resize();
    cboxes.resize();
}

function setup() {

    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    canvas.style("z-index" , "-1");
    canvas.style("position" , "fixed");

    diagonalLength = sqrt(width*width + height*height);

    colors = [ color(37, 40, 61), color(76, 40, 88), color(7, 190, 184), color(236, 241, 243) ];

    aboxes = new Boxes(diagonalLength/20,1.05,3000,1);
    bboxes = new Boxes(diagonalLength/35,1.05,30000,0.25);
    cboxes = new Boxes(diagonalLength/60,1.05,70000,0);

    frameRate(60);
    noStroke();
    //blendMode(BURN);
}

let ifMOUSEX, ifMOUSEY, MOUSEX, MOUSEY, ifMOUSEOVER = false;



function draw() {

    //translate(-width/2,-height/2);

    if(iframe.contentWindow.initialized != undefined) {
        ifMOUSEX = iframe.contentWindow.MOUSEX;
        ifMOUSEY = iframe.contentWindow.MOUSEY;
        ifMOUSEOVER = iframe.contentWindow.MOUSEOVER;

        if (ifMOUSEOVER) {
            MOUSEX = ifMOUSEX + iframe.offsetLeft;
            MOUSEY = ifMOUSEY + iframe.offsetTop - document.documentElement.scrollTop;
        } else {
            MOUSEX = mouseX;
            MOUSEY = mouseY;
        }
        //print(MOUSEX, MOUSEY, ifMOUSEOVER, document.documentElement.scrollTop);

    } else {
        print("i am broken");
    }

    //clear();
    if (darkmode) {
        background(colors[3]);
        fill(colors[2]);
        aboxes.show();
        fill(colors[1]);
        bboxes.show();
        fill(colors[0]);
        cboxes.show();
    } else {
        background(colors[0]);
        fill(colors[1]);
        aboxes.show();
        fill(colors[2]);
        bboxes.show();
        fill(colors[3]);
        cboxes.show();
    }

    aboxes.move(0.1);
    bboxes.move(0.1);
    cboxes.move(0.1);

}

