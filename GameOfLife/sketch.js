let res = 50;

let len;
let rows, cols;

let grid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  len = height / res;
  
  rows = ceil(height / len);
  cols = ceil(width / len);
  
  grid = new Grid(rows, cols, len);
  grid.genorate(0.2);
}

function draw() {
  background(0);
  
  grid.show();
  grid.update();
}