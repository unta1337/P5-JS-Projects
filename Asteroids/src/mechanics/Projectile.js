class Projectile extends object {
  constructor(position, heading, radius) {
    super(position, radius);
    
    this.SPEED_LIMIT = 30;
    this.ACCELERATION = 10;
    
    this.heading = heading;
    
    this.acceleration = p5.Vector.fromAngle(this.heading, this.ACCELERATION);
    
    this.lifespan = this.radius * 30;
  }
  
  isDead() {
    return this.lifespan < 0;
  }
  
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.SPEED_LIMIT);
    this.position.add(this.velocity);
    
    this.edges();
    
    this.lifespan -= 1;
  }
  
  show() {
    push();
    fill(theme);
    super.show();
    pop();
  }
}