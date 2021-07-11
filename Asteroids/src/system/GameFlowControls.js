class GameFlowControls {
  static toggleControls() {
    switch (keyCode) {
      case 'R'.charCodeAt(0):
        setup();
        break;
      case 'T'.charCodeAt(0):
        if (gameEnd == 'win') {
          Game.addAsteroid();
          gameEnd = 0;
        }
        break;
      case 'C'.charCodeAt(0):
        themeIndex++;
        themeIndex %= themes.length;
        break;
      case 'Z'.charCodeAt(0):
        showHitbox = !showHitbox;
        break;
      case 'X'.charCodeAt(0):
        showFPS = !showFPS;
    }
  }
  
  static holdControls() {
    if (keyIsDown('H'.charCodeAt(0))) {
      GameInfo.show();
    }
  }
}