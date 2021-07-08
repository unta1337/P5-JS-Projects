class Projectile {
  constructor(pos, heading, r) {
    this.SPEED_LIMIT = 30;
    this.ACCELERATION = 10;
    
    this.heading = heading;
    
    this.pos = pos;
    this.vel = createVector(0, 0);
    this.acc = p5.Vector.fromAngle(heading, this.ACCELERATION);

    this.r = r * 0.06;
    this.hitR = this.r;
    
    this.lifespan = this.r * 20;
  }
  
  edges() {
    if (this.pos.x < -this.r) {
      this.pos.x = this.pos.x + (width + this.r * 2);
    } else if (this.pos.x > width + this.r) {
      this.pos.x = this.pos.x - (width + this.r * 2);
    }
    if (this.pos.y < -this.r) {
      this.pos.y = this.pos.y + (height + this.r * 2);
    } else if (this.pos.y > height + this.r) {
      this.pos.y = this.pos.y - (height + this.r * 2);
    }
  }
  
  isDead() {
    return this.lifespan < 0;
  }
  
  update() {
    this.vel.add(this.acc);
    //this.vel.limit(this.SPEEDLIMIT);
    if (this.vel.mag() > this.SPEED_LIMIT) {
      this.vel.setMag(this.SPEED_LIMIT); 
    }
    //console.log(this.vel.mag());
    this.pos.add(this.vel);
    
    this.edges();
    
    this.lifespan -= 1;
  }
  
  show() {
    fill(theme);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }
}