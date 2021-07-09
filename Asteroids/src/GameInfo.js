class GameInfo {
  static show() {
    push();
    noFill();
    rectMode(CENTER);
    let posY = height / 2;
    let size = textScl;
    let offset = size * 1.5;
    rect(width / 2, height / 2, size * 25, size * 14);
    Tools.text(width / 2, posY + offset * -3.5, 'ASTEROIDS BY SY KIM', size, true);
    Tools.text(width / 2, posY + offset * -1.5, 'PRESS ARROW KEYS TO MOVE', size, true);
    Tools.text(width / 2, posY + offset * -0.5, 'PRESS SPACEBAR TO SHOOT', size, true); 
    Tools.text(width / 2, posY + offset * 0.5, 'PRESS R TO RESET GAME', size, true);
    Tools.text(width / 2, posY + offset * 1.5, 'PRESS T TO CONTUNUE GAME', size, true); 
    Tools.text(width / 2, posY + offset * 3.5, 'HOLD H TO SHOW HELP MESSAGE BOX', size, true); 
    pop();
  }
  
  static score(score) {
    push();
    noFill();
    let size = textScl;
    let offset = size * 1.5;
    Tools.text(width / 2, offset, 'SCORE ' + score, size, true);

    pop();
  }
}