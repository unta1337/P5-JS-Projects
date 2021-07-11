class Tools {
  static degToRad(degrees) {
    return degrees * (PI / 180);
  }
  
  static radToDeg(radians) {
    return radians * (180 / PI); 
  }
  
  static text(string, x, y, size, orientation) {
    push();
    noFill();
    
    let stringLength = string.length;
    
    let padding = size / 4;
    let length = size / 2;
    
    let textLength = length * stringLength + padding * (stringLength - 1);
    
    let l = new Letters();
    
    if (orientation === 'corner') {
      translate(x, y);
    } else if (orientation === 'center') {
      translate(x - textLength / 2, y - length);
    } else {
      throw new Error(`Invalid orientation value of {orientation}.`);
    }
    
    for (let i = 0; i < stringLength; i++) {
      beginShape();
      
      let charCode = string.charCodeAt(i);
      
      if (string[i] === ' ' || !l.letters[charCode]) {
        continue; 
      }
      
      for (let j = 0; j < l.letters[charCode].length; j++) {
        vertex((length + padding) * i + l.letters[charCode][j][0] * length, l.letters[charCode][j][1] * length);
      }
      
      endShape();
    }
    
    pop();
  }
}