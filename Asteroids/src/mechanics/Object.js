class object {
  constructor(position, radius) {
    this.SPEED_LIMIT = 0;
    this.ACCELERATION = 0;
    
    this.position = position;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    
    this.radius = radius;
    this.hitRadius = this.radius;
  }
  
  collision(other) {
    if (!other.position) {
      other.position = other.pos.copy();
      other.hitRadius = other.hitR.copy();
    }
    
    let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    let condition = this.hitRadius + other.hitRadius;
    
    return distance < condition;
  }
  
  edges() {
    let xOffset = width + this.radius * 2;
    let yOffset = height + this.radius * 2;
    
    if (this.position.x < -this.radius) {
      this.position.x += xOffset; 
    } else if (this.position.x > width + this.radius) {
      this.position.x -= xOffset
    }
    if (this.position.y < -this.radius) {
      this.position.y += yOffset; 
    } else if (this.position.y > height + this.radius) {
      this.position.y -= yOffset; 
    }
  }
  
  show() {
    push();
    ellipse(this.position.x, this.position.y, this.hitRadius * 2, this.hitRadius * 2);
    pop();
  }
}