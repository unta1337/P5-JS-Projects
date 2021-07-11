class Asteroid extends object {
  constructor(position, radius) {
    super(position, radius);
    
    this.SPEED_LIMIT = 5;
    
    this.previousPosition = this.position.copy();
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, this.SPEED_LIMIT));
    
    this.hitRadius = 0;
    this.maximumRadius = 0;
    
    this.outline = [];
    let angleFactor = TWO_PI / 10;
    for (let i = 0; i < 10; i++) {
      let maximumOffset = this.radius / random(2, 5);
      let offset = random(-maximumOffset, maximumOffset);
      
      let newRadius = this.radius + offset;
      let x = this.position.x + newRadius * cos(i * angleFactor);
      let y = this.position.y + newRadius * sin(i * angleFactor);
      let point = createVector(x, y);
      this.outline.push(point);
      
      this.hitRadius += newRadius;
      this.maxumumRadius = newRadius > this.maximumRadius ? newRadius : this.maximumRadius;
    }
    
    this.hitRadius /= 10;
  }
  
  divide() {
    if (this.radius < scl * 0.7) {
      return 0; 
    }
    
    let newRadius = this.radius * 0.7;
    let newAsteroids = [];
    newAsteroids.push(new Asteroid(this.position.copy(), newRadius));
    newAsteroids.push(new Asteroid(this.position.copy(), newRadius));
    
    return newAsteroids;
  }
  
  updateOutline() {
    for (let point of this.outline) {
      let difference = p5.Vector.sub(this.position, this.previousPosition);
      point.add(difference);
    }
  }
  
  update() {
    this.previousPosition = this.position.copy();
    this.position.add(this.velocity);
    this.edges();
    this.updateOutline();
  }
  
  show() {
    push();
    beginShape();
    for (let point of this.outline) {
      vertex(point.x, point.y); 
    }
    endShape(CLOSE);
    pop();
    if (showHitbox) {
      super.show();
    }
  }
}