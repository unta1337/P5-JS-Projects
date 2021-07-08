class Asteroid {
  constructor(pos, r) {
    this.SPEED_LIMIT = 5;
    this.pos = pos;
    this.prevPos = this.pos.copy();
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(2, this.SPEED_LIMIT));
    this.r = r;
    this.hitR = 0;
    this.maxR = 0;
    
    this.outline = [];
    this.numberOfPoints = 10;
    for (let i = 0; i < this.numberOfPoints; i++) {
      let randomValue = random(2, 5);
      let randomOffset = this.r / randomValue;
      let offset = random(-randomOffset, randomOffset);
      let x = this.pos.x + (this.r + offset) * cos(i * (TWO_PI / this.numberOfPoints));
      let y = this.pos.y + (this.r + offset) * sin(i * (TWO_PI / this.numberOfPoints));
      let point = createVector(x, y);
      this.outline.push(point);
      
      this.hitR += this.r + offset;
      this.maxR = this.maxR > this.r + offset ? this.maxR : this.r + offset;
    }
    this.hitR /= this.numberOfPoints;
  }
  
  collision(other) {
    let distance = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
    let condition = this.hitR + other.hitR > distance;
    if (condition) {
      if (other instanceof Ship) {
        return 'player';
      } else {
        return 'projectile';
      }
    }
  }
  
  divide() {
    if (this.r < scl * 0.7) {
      return 0;
    }
    
    let newR = this.r * 0.7;
    let newAsteroids = [];
    newAsteroids.push(new Asteroid(this.pos.copy(), newR));
    newAsteroids.push(new Asteroid(this.pos.copy(), newR));
    
    return newAsteroids;
  }
  
  edges() {
    if (this.pos.x < -this.maxR) {
      this.pos.x = this.pos.x + (width + this.maxR * 2);
    } else if (this.pos.x > width + this.maxR) {
      this.pos.x = this.pos.x - (width + this.maxR * 2);
    }
    if (this.pos.y < -this.maxR) {
      this.pos.y = this.pos.y + (height + this.maxR * 2);
    } else if (this.pos.y > height + this.maxR) {
      this.pos.y = this.pos.y - (height + this.maxR * 2);
    }
  }
  
  updateOutline() {
    for (let point of this.outline) {
      let diff = p5.Vector.sub(this.pos, this.prevPos);
      point.add(diff);
    }
  }
  
  update() {
    this.prevPos = this.pos.copy();
    this.pos.add(this.vel);
    this.edges();
    this.updateOutline();
  }
  
  show() {
    noFill();
    beginShape();
    for (let point of this.outline) {
      vertex(point.x, point.y); 
    }
    endShape(CLOSE);
    
    //ellipse(this.pos.x, this.pos.y, this.hitR * 2, this.hitR * 2);
    //ellipse(this.pos.x, this.pos.y, this.maxR * 2, this.maxR * 2);
  }
}