// Asteroids by S.Y. Kim
// Version 1.3
// p5.js: https://editor.p5js.org/unta1337/sketches/wj7e0suFy

let themes, theme
let themeIndex = 0;

const SCL_LIMIT = 60;
let sclFactor, scl, textScl;

let player;
let asteroids;
let numberOfAsteroids;

let score;
let scoreMax = 0;

let gameEnd;

let showHitbox = false;
let showFPS = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  Game.setup();
  Game.setupTheme();
}

function draw() {
  background(0);

  stroke(theme);
  strokeWeight(scl * 0.03);
  noFill();
  
  Game.updateTheme();
  
  Game.showPlayer();
  Game.showAsteroid();
  
  if (gameEnd !== 'lose') {
    Game.updatePlayer(); 
    Game.updateAsteroid();
  
    let asteroidIndex = Game.detectAsteroidProjectileCollision();
    if (asteroidIndex !== -1) {
      let extraPoint = Game.divideAsteroid(asteroidIndex);
      if (extraPoint) {
        score += 20;
      }
      score += 10;
    }
  
    if (Game.amILose()) {
      gameEnd = 'lose';
    }
  
    if (Game.amIWin()) {
      gameEnd = 'win'; 
    }
  }
  
  Game.showResult();
  
  if (frameCount < 200) {
    GameInfo.show();
  }

  GameInfo.showCurrentScore();
  if (showFPS) {
    GameInfo.showFPS();
  }
  
  GameFlowControls.holdControls();
  
}

function keyPressed() {
  GameFlowControls.toggleControls();
}
