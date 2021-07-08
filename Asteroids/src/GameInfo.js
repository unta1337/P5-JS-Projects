class GameInfo {
  static show() {
    push();
    noFill();
    rectMode(CENTER);
    rect(width / 2, height / 2, 700, 100);
    Tools.text(width / 2, height / 2, 'I WILL REFACTOR THIS LATER', 32, true); 
    pop();
  }
}