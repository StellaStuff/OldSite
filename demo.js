
class Boxes {
    constructor(size,w,h,weight) {
        this.boxes = [];

        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                this.boxes.push(new box(i/w*width,j/h*height,size,weight));
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
    constructor(x,y,size,weight) {
        this.ox = x;
        this.oy = y;
        this.w = size;
        this.h = size;
        this.x = x;
        this.y = y;
        this.fx = 0;
        this.fy = 0;
        this.weight = weight;
    }
    show() {
        rect(this.x - this.w/2,this.y - this.h/2,this.w,this.h);
    }
    move(speed) {

        //dampens the speed
        this.fx *= 0.9;
        this.fy *= 0.9;

        //calculates the push from the mouse
        var dx = this.x - mouseX;
        var dy = this.y - mouseY;

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


        //print("butts"");
        //adds the speed to the position
        this.x += this.fx * speed;
        this.y += this.fy * speed;

        //if (this.x > width + 100 || this.y > height + 100) print("fuck");

    }
}

let aboxes, bboxes, cboxes;
function setup() {
    createCanvas(1024,1024);
    aboxes = new Boxes(width/50,55,55,3000);
    bboxes = new Boxes(width/50,55,55,30000);
    cboxes = new Boxes(width/50,55,55,70000);

    frameRate(120);
    noStroke();
    //blendMode(BURN);
}



function draw() {

    clear();
    background(37, 40, 61);
    fill(76, 40, 88);
    aboxes.show();
    fill(7, 190, 184);
    bboxes.show();
    fill(236, 241, 243);
    cboxes.show();

    aboxes.move(0.1);
    bboxes.move(0.1);
    cboxes.move(0.1);
}

