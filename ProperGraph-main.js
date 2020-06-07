let red = '#ff0000';
let skyblue = '#00ffff';
let blue = '#0000ff';
let black = '#000000';



let box1; // Declare object

function setup() {
  createCanvas(1300, 700);
  // Create object
    let scale=.5;
    let xmin = 0;
    let xmax = 15;
    let xnumbox = 10;
    let ymin = -1.5;
    let ymax = 1.5;
    let ynumbox = 4;
    let fsize = 22;
    let xdecimals = 0; //if not zero, then fixed number of axis decimal places
    let ydecimals = 0; //if not zero, ....
  box1 = new BoxGraph(
        scale,
        xmin,
        xmax,
        xnumbox,
        ymin,
        ymax,
        ynumbox,
        "Tahoma",
        fsize,
        "x-axis label is in meters",
        "y-axis label is in meters",
        xdecimals,
        ydecimals
          );

  background(color(skyblue)); // background there is no draw function.
  
  box1.theBox();
   
  
for(let i=0;i<100;i++){  //generate 100 pts
    let x = i*(4*3.14159/100);
    let y = sin(x);
    box1.plotxy(x,y,5,red);
    
  } //end for

}



//function to determine the maximum number length for the axes.
  //nmin = xmin or ymin
  //nmax = xmax or ymax
  //numbox = xnumbox or ynumbox
  function numlen(nmin,nmax,numbox){
    let nlen = str(nmin).length;
    let mlen = str(nmin + floor(numbox+1)*(nmax-nmin)/numbox).length;
     nlen = max(nlen,mlen);
    if((nmax-nmin)%numbox===0 && nlen>2){nlen = nlen -2;}
    return nlen; 
  } // end numlen

function pt(x,y,size,col){
  fill(col);
  stroke(col);
  circle(x,y,size);
}