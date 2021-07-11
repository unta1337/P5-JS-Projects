class GameInfo {
  static show() {
    let info = [
      'ASTEROIDS BY SY KIM',
      ' ',
      'PRESS ARROW KEYS TO MOVE',
      'PRESS SPACEBAR TO SHOOT',
      'PRESS R TO RESET GAME',
      'PRESS T TO CONTINUE GAME',
      ' ',
      'PRESS C TO CHANGE COLOR THEME',
      'PRESS Z TO SHOW HITBOX',
      'PRESS X TO SHOW FPS',
      ' ',
      'HOLD H TO SHOW HELP MESSAGE BOX'
    ];
    
    push();
    noFill();
    rectMode(CENTER);
    
    let posY = height / 2;
    let size = textScl;
    let offset = size * 1.5;
    let offsetFactor = -info.length / 2 + 0.5;
    
    rect(width / 2, height / 2, size * 24.5, info.length * size * 1.6);
    for (let i = 0; i < info.length; i++) {
      Tools.text(info[i], width / 2, posY + offset * offsetFactor, size, 'center');
      offsetFactor += 1;
    }
    
    pop();
  }
  
  static showCurrentScore() {
    push();
    noFill();
    let size = textScl;
    let offset = size * 1.5;
    Tools.text('SCORE ' + score, width / 2, offset, size, 'center');
    pop();
  }
  
  static showFPS() {
    push();
    noFill();
    let size = textScl;
    let offset = size * 1.5;
    Tools.text('FPS ' + round(frameRate()), width / 2, height - offset, size, 'center');
    pop();
  }
}