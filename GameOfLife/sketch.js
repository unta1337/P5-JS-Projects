let grid;
let res = 20;
let row;
let col;
let len;

function setup() {
  //createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight, P2D);
  background(0);

  row = res;
  len = height / res;
  col = Math.ceil(width / len);

  grid = new Grid(row, col);

  for (let j = 0; j < row; j++) {
    for (let i = 0; i < col; i++) {
      grid.grid[j][i] = Math.floor(random(2));
    }
  }

  console.log(grid.grid);
}

function draw() {
  noStroke(0);
  background(0);

  //frameRate(2);

  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {
      let temp = 0;
      if (grid.grid[y][x])
        temp = 255;
      fill(temp);
      rect(x * len, y * len, len - 5, len - 5);
    }
  }

  grid.update();
}