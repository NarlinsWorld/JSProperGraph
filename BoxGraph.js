let tahoma;
function preload() {
    tahoma = loadFont('Fonts/tahoma.ttf'); //has to be present relative to the index.html
}




// BoxGraph class
class BoxGraph {

    constructor(tscale, tXmin, tXmax, txbox, tYmin, tYmax, tybox, tFont, tfsize, txAxisLabel, tyAxisLabel, txdecimals, tydecimals) {
        this.scale = tscale;
        this.xmin = tXmin;
        this.xmax = tXmax;
        this.xnumbox = txbox;
        this.ymin = tYmin;
        this.ymax = tYmax;
        this.ynumbox = tybox;
        this.fsize = tfsize;
        this.xAxisLabel = txAxisLabel;
        this.yAxisLabel = tyAxisLabel;
        this.xdecimals = txdecimals;
        this.ydecimals = tydecimals;

        this.Middle = createVector(width / 2, height / 2);
        this.topCornerX = round(this.Middle.x - this.scale * width / 2);
        this.topCornerY = round(this.Middle.y - this.scale * height / 2);
        this.lowerLeft = createVector(this.topCornerX, height * this.scale + this.topCornerY); //lower left corner
        this.rt = createVector(this.lowerLeft.x + this.scale * width, this.lowerLeft.y); //lowr right corner 
        this.boxwidth = this.rt.x - this.lowerLeft.x;
        this.boxheight = this.lowerLeft.y - this.topCornerY;
        this.zz = createVector();
        this.m = (this.rt.x - this.lowerLeft.x) / (this.xmax - this.xmin);
        this.zz.x = this.lowerLeft.x + this.m * (0 - this.xmin);
        this.m = (this.topCornerY - this.lowerLeft.y) / (this.ymax - this.ymin);
        this.zz.y = this.lowerLeft.y + this.m * (0 - this.ymin);
        pt(this.lowerLeft.x + this.zz.x, this.lowerLeft.y + this.zz.y, 10, color('#ff0000'));

    } //end constructor

    theBox() {

        textFont(tahoma);
        textSize(this.fsize);

        noFill();
        stroke('#000000');
        strokeWeight(3); //applies to lines and string characters
        rect(this.topCornerX, this.topCornerY, this.boxwidth, this.boxheight); //draws the rectangle
        fill('#000000'); //fill for tic marks

        //draw the x-axis tic marks using a for loop
        //These items don't belong in the loop    
        this.m = (this.rt.x - this.lowerLeft.x) / this.xnumbox;
        textAlign(CENTER, CENTER);
        let xnlen = numlen(this.xmin, this.xmax, this.xnumbox); // maximum xnumber length in characters

        for (let i = 0; i < floor(this.xnumbox + 1); i++) {
            let tix = this.lowerLeft.x + this.m * i; //x location to begin tix
            strokeWeight(3); // Line weight
            line(tix, this.lowerLeft.y, tix, this.lowerLeft.y - 25 * this.scale); // the tic line            
            let xn = this.xmin + i * (this.xmax - this.xmin) / this.xnumbox; //calc the tic number
            if (this.xdecimals != 0) {
                xn = xn.toFixed(this.xdecimals);
            } //does user want fixed decimal
            let xnumber = str(xn); // the string to print   
            strokeWeight(0); //text weight
            text(xnumber, tix - xnlen * .000 * width, this.lowerLeft.y + .02 * height); //the printed tic number           
        } //end for


        //xAxisLabel, centered between lowerLeft.x and rt.x
        let len = this.xAxisLabel.length;
        strokeWeight(0);
        text(this.xAxisLabel, (this.lowerLeft.x + this.rt.x) / 2, this.lowerLeft.y + .06 * height);
        strokeWeight(3);

        //draw the y-axis tic marks
        //determine the maximum ynumber length
        textAlign(LEFT, CENTER);
        let nlen = numlen(this.ymin, this.ymax, this.ynumbox);
        this.m = (this.topCornerY - this.lowerLeft.y) / this.ynumbox;

        for (let i = 0; i < this.ynumbox + 1; i++) {
            let tix = this.lowerLeft.y + this.m * i;  //y location to begin tic
            strokeWeight(3);
            line(this.lowerLeft.x, tix, this.lowerLeft.x + 25 * this.scale, tix); //draw the tic
            let yn = this.ymin + i * (this.ymax - this.ymin) / this.ynumbox //calc the tic value
            if (this.xdecimals != 0) {
                yn = yn.toFixed(this.ydecimals);
            } //if user wanted fixed decimals
                let ynumber = str(yn); //the string to print
                strokeWeight(0);
                text(ynumber, this.lowerLeft.x - .0115 * nlen * width, tix + .000 * height); //the printed tic number
        } //end for

        //yAxisLabel
        textAlign(CENTER, CENTER); //remeber these get rotated
        len = this.yAxisLabel.length;
        let xloc = this.lowerLeft.x - (this.fsize / this.scale) * 2;
        let yloc = (this.lowerLeft.y + this.topCornerY) / 2;
        push();
        translate(xloc, yloc); //translates x,y to 0,0
        rotate(-3.14159 / 2);
        strokeWeight(0);
        text(this.yAxisLabel, 0, 0);
        strokeWeight(3);
        pop();

    }  //end theBox

    plotxy(x, y, size, col) {

        this.m = (this.rt.x - this.lowerLeft.x) / (this.xmax - this.xmin);
        x = this.zz.x + this.m * x;
        this.m = (this.topCornerY - this.lowerLeft.y) / (this.ymax - this.ymin);
        y = this.zz.y + this.m * y;
        pt(x, y, size, color(col));
    } // end plotxy

} //end class BoxGraph
  