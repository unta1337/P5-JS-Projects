class Game {
  // game setup stuffs.
  static setup() {
    score = 0;
    
    gameEnd = false;
    
    sclFactor = sqrt(width * width + height * height) * 0.05;
    scl = sclFactor < SCL_LIMIT ? sclFactor : SCL_LIMIT;
    textScl = width > height ? height : width;
    textScl *= 0.04;
    
    player = new Ship(createVector(width / 2, height / 2), scl * 0.4);
  
    asteroids = [];
    numberOfAsteroids = floor(0.1 * scl);
    Game.addAsteroid();
  }
  
  static setupTheme() {
    themes = [
      color(255),
      color(50, 220, 50),
      color(255, 255, 100)
    ];
    theme = themes[themeIndex];
  }
  
  static updateTheme() {
    theme = themes[themeIndex];
  }
  
  // player stuffs.
  static showPlayer() {
    player.show();
  }

  static updatePlayer() {
    if (gameEnd != 'lose') {
      player.controls();
      player.update();
    }
  }
  
  // asteroid stuffs.
  static showAsteroid() {
    for (let asteroid of asteroids) {
      asteroid.show();
    }
  }
  
  static updateAsteroid() {
    for (let asteroid of asteroids) {
      asteroid.update();
    }
  }
  
  static detectAsteroidProjectileCollision() {
    outer:
    for (let i = 0; i < asteroids.length; i++) {
      for (let j = 0; j < player.projectiles.length; j++) {
        if (asteroids[i].collision(player.projectiles[j])) {
          player.projectiles.splice(j, 1);
	      return i;
        }
      }
    }
    
    return -1;
  }

  static detectAsteroidPlayerCollision() {
    for (let asteroid of asteroids) {
      if (asteroid.collision(player)) {
        return true;
      }
    }
    
    return false;
  }
  
  static divideAsteroid(index) {
    let extraPoint = true;
    let newAsteroids = asteroids[index].divide();
    asteroids.splice(index, 1);
    
    if (newAsteroids) {
      extraPoint = false;
      asteroids = concat(asteroids, newAsteroids);
    }
    
    return extraPoint;
  }
  
  static addAsteroid() {
    for (let i = 0; i < numberOfAsteroids; i++) {
      let maximumRadius = width > height ? height / 2 : width / 2;
      let minimumRadius = maximumRadius / 1;
      let radius = (minimumRadius, maximumRadius);
    
      let posision = p5.Vector.fromAngle(random(TWO_PI), radius);
      posision.add(player.posision);
    
      asteroids.push(new Asteroid(posision, random(0.4, 2) * scl)); 
    }
  }
  
  // game end condition stuffs.
  static amILose() {
    return Game.detectAsteroidPlayerCollision();
  }

  static amIWin() {
    return asteroids.length === 0 && !gameEnd;
  }
  
  static showResult() {
    let tempOffset = textScl * 1.5;
    if (gameEnd === 'lose') {
      scoreMax = score > scoreMax ? score : scoreMax;
      Tools.text('YOU LOSE', width / 2, height / 2 + tempOffset * -0.5, textScl, 'center');
      Tools.text('BEST SCORE ' + scoreMax, width / 2, height / 2 + tempOffset * 0.5, textScl, 'center');
    } else if (gameEnd === 'win') {
      scoreMax = score > scoreMax ? score : scoreMax;
      Tools.text('YOU WIN', width / 2, height / 2 + tempOffset * -0.5, textScl, 'center');
      Tools.text('BEST SCORE ' + scoreMax, width / 2, height / 2 + tempOffset * 0.5, textScl, 'center');
    }
  }
}