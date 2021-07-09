class Tools {
  static degToRad(degrees) {
    return degrees * (PI / 180);
  }
  
  static radToDeg(radians) {
    return radians * (180 / PI); 
  }
  
  static text(x, y, text, size, center) {
    push();
    noFill();
    let textLength = text.length;
    let padding = size / 4;
    let len = size / 2;
    let stringLen = len * textLength + padding * (textLength - 1);
    
    let l = new Letters();
    
    if (center) {
      translate(x - stringLen / 2, y - len); 
    } else {
      translate(x, y); 
    }
    
    for (let i = 0; i < textLength; i++) {
      beginShape();
      
      let charCode = text.charCodeAt(i);
      
      if (!l.letters[charCode]) {
        continue; 
      }
      
      if (text[i] === ' ') {
        continue;
      }
      
      for (let j = 0; j < l.letters[charCode].length; j++) {
        vertex((len + padding) * i + l.letters[charCode][j][0] * len, l.letters[charCode][j][1] * len);
      }
      
      endShape();
    }
    pop();
  }
}