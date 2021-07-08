let themes, theme;

let sclFactor, scl;
const SCL_LIMIT = 60;

let player;
let asteroids;
let numberOfAsteroids;

let gameEnd;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(1280, 720);
  
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
  player.controls();
  player.update();
  
  outer:
  for (let i = 0; i < asteroids.length; i++) {
    if (asteroids[i].collision(player)) {
      noLoop();
      console.log("oops");
    }
    
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
    try {
    asteroid.update();
    asteroid.show();  
    } catch (e) {
      console.log(asteroid);
    }
  }
  
  if (asteroids.length === 0 && !gameEnd) {
    console.log("You win!");
    gameEnd = true;
  }
}

function keyPressed() {
  switch (keyCode) {
    case 'R'.charCodeAt(0):
      setup();
      break;
  }
}