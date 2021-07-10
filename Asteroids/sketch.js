let themes, theme, themeIndex;

let sclFactor, scl;
let textScl;
const SCL_LIMIT = 60;

let player;
let asteroids;
let numberOfAsteroids;

let score;
let scoreMax = 0;

let gameEnd;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(1080, 1920);
  
  score = 0;
  
  gameEnd = false;
  
  themes = [
    color(255),
    color(50, 220, 50),
    color(255, 255, 100)
  ];
  
  themeIndex = 0;
  theme = themes[themeIndex];
  
  sclFactor = sqrt(width * width + height * height) * 0.05;
  scl = sclFactor < SCL_LIMIT ? sclFactor : SCL_LIMIT;
  textScl = width > height ? height : width;
  textScl *= 0.04;
  
  player = new Ship(createVector(width / 2, height / 2), scl * 0.4);
  
  
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
}

function draw() {
  background(0);
  
  //frameRate(1);
  
  stroke(theme);
  strokeWeight(scl * 0.03);
  noFill();
  
  theme = themes[themeIndex];

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
          score += 10;
          asteroids = concat(asteroids, newAsteroids);
        } else {
          score += 30; 
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
  
  for (let asteroid of asteroids) {
    asteroid.update();
    asteroid.show(); 
  }
  
  if (asteroids.length === 0 && !gameEnd) {
    gameEnd = 'win';
  }
  
  let tempOffset = textScl * 1.5;
  if (gameEnd === 'lose') {
    scoreMax = score > scoreMax ? score : scoreMax;
    Tools.text(width / 2, height / 2 + tempOffset * -0.5, "YOU LOSE", textScl, true);
    Tools.text(width / 2, height / 2 + tempOffset * 0.5, "BEST SCORE " + scoreMax, textScl, true);
  } else if (gameEnd === 'win') {
    scoreMax = score > scoreMax ? score : scoreMax;
    Tools.text(width / 2, height / 2 + tempOffset * -0.5 , "YOU WIN", textScl, true);
    Tools.text(width / 2, height / 2 + tempOffset * 0.5, "BEST SCORE " + scoreMax, textScl, true);
  }
  
  if (frameCount < 200 || keyIsDown('H'.charCodeAt(0))) {
    GameInfo.show();
  }

  GameInfo.score(score);
}

function keyPressed() {
  switch (keyCode) {
    case 'R'.charCodeAt(0):
      setup();
      break;
    case 'T'.charCodeAt(0):
      if (gameEnd == 'win') {
        addAsteroids();
        gameEnd = 0;
      }
      break;
      case 'C'.charCodeAt(0):
        themeIndex++;
        themeIndex %= themes.length;
        break;
  }
}

function addAsteroids() {
  for (let i = 0; i < numberOfAsteroids; i++) {
    let maxR = width > height ? height / 2 : width / 2;
    let minR = maxR / 1;
    let r = (minR, maxR);
    
    let pos = p5.Vector.fromAngle(random(TWO_PI), r);
    pos.add(player.pos);
    
    asteroids.push(new Asteroid(pos, random(0.4, 2) * scl)); 
  }
}