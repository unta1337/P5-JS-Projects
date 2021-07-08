let themes, theme;

let sclFactor, scl;
const SCL_LIMIT = 60;

let player;
let asteroids;
let numberOfAsteroids;

let gameEnd;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(1080, 1920);
  
  gameEnd = false;
  
  themes = {
    white: color(255),
    green: color(50, 220, 50),
    yellow: color(255, 255, 100)
  };
  theme = themes.green;
  
  sclFactor = sqrt(width * width + height * height) * 0.05;
  scl = sclFactor < SCL_LIMIT ? sclFactor : SCL_LIMIT;
  
  player = new Ship(createVector(width / 2, height / 2), scl);
  
  asteroids = [];
  numberOfAsteroids = floor(0.1 * scl);
  for (let i = 0; i < numberOfAsteroids; i++) {
    let maxR = width > height ? height / 2 : width / 2;
    let minR = maxR / 1;
    let r = (minR, maxR);
    
    let pos = p5.Vector.fromAngle(random(TWO_PI), r);
    pos.add(player.pos);
    
    asteroids.push(new Asteroid(pos, random(0.4, 2) * scl)); 
  }
  
  loop();
}

function draw() {
  background(0);
  
  stroke(theme);
  strokeWeight(scl * 0.03);
  noFill();
  
  player.show();
  if (gameEnd != 'lose') {
    player.controls();
    player.update();
  }
  
  outer:
  for (let i = 0; i < asteroids.length; i++) {
    for (let j = 0; j < player.projectiles.length; j++) {
      if (asteroids[i].collision(player.projectiles[j])) {
        player.projectiles.splice(j, 1);
        
        let newAsteroids = asteroids[i].divide();
        asteroids.splice(i, 1);
        if (newAsteroids) {
          asteroids = concat(asteroids, newAsteroids);
        }
        break outer;
      }
    }
  }

  for (let asteroid of asteroids) {
    if (asteroid.collision(player)) {
      gameEnd = 'lose';
    }
    if (gameEnd != 'lose') {
      asteroid.update();
    }
    asteroid.show();
  }
  
  if (asteroids.length === 0 && !gameEnd) {
    gameEnd = 'win';
  }
  
  if (gameEnd === 'lose') {
    Tools.text(width / 2, height / 2, "YOU LOSE", 32, true);
  } else if (gameEnd === 'win') {
    Tools.text(width / 2, height / 2, "YOU WIN", 32, true);
  }
  
  if (keyIsDown('H'.charCodeAt(0))) {
    GameInfo.show();
  }
}

function keyPressed() {
  switch (keyCode) {
    case 'R'.charCodeAt(0):
      setup();
      break;
  }
}