class Ship {
  constructor(pos, h) {
    this.pos = pos;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.SPEED_LIMIT = 10;
    this.ACCELERATION = 0.2;    
    
    this.heading = 0;
    this.aVel = 0;
    this.aAcc = 0;
    this.ANGULAR_SPEED_LIMIT = Tools.degToRad(5);
    this.ANGULAR_ACCELERATION = Tools.degToRad(0.2);
    
    this.h = h;
    this.w = h * 0.7;
    this.h0 = h * 0.25;
    
    this.hitR = this.h / 4;
    
    this.projectiles = [];
    
    this.shoot = false;
  }
  
  rotateCounterClockwise() {
    this.aAcc = -this.ANGULAR_ACCELERATION;
  }
  
  rotateClockwise() {
    this.aAcc = this.ANGULAR_ACCELERATION;
  }
  
  stopRotate() {
    this.aVel *= 0.95;
  }
  
  moveFoward() {
    this.acc = p5.Vector.fromAngle(this.heading - Tools.degToRad(90), this.ACCELERATION);
  }
  
  stopMove() {
    this.vel.mult(0.98);
  }
  
  updateMovement() {
    this.aVel += this.aAcc;
    let sign = this.aVel != 0 ? this.aVel / abs(this.aVel) : 0;
    this.aVel = sign * this.aVel <= this.ANGULAR_SPEED_LIMIT ? this.aVel : this.ANGULAR_SPEED_LIMIT * sign;
    this.heading += this.aVel;
    this.aAcc *= 0;
    
    this.vel.add(this.acc);
    this.vel.limit(this.SPEED_LIMIT);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  edges() {
    if (this.pos.x < -this.h * 0.5) {
      this.pos.x = this.pos.x + (width + this.h);
    } else if (this.pos.x > width + this.h * 0.5) {
      this.pos.x = this.pos.x - (width + this.h);
    }
    if (this.pos.y < -this.h * 0.5) {
      this.pos.y = this.pos.y + (height + this.h);
    } else if (this.pos.y > height + this.h * 0.5) {
      this.pos.y = this.pos.y - (height + this.h);
    }
  }
  
  fire() {
    let radius = this.h * 0.6;
    let angle = this.heading - Tools.degToRad(90);
    this.projectiles.push(new Projectile(createVector(this.pos.x + radius * cos(angle), this.pos.y + radius * sin(angle)), this.heading - Tools.degToRad(90), this.h));
  }
  
  controls() {
    // Rotation Contol.
    if (keyIsDown(LEFT_ARROW)) {
      this.rotateCounterClockwise();
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.rotateClockwise();
    } else {
      this.stopRotate();
    }
    
    // Movement Control.
    if (keyIsDown(UP_ARROW)) {
      this.moveFoward();
    } else {
      this.stopMove();
    }
    
    // Occurs once if pressed.
    // 32 for Scape Bar.
    if (keyIsPressed && keyIsDown(32) && !this.shoot) {
      this.fire();
      this.shoot = true;
    } else if (!keyIsPressed || !keyIsDown(32)) {
      this.shoot = false;
    }
  }
  
  update() {
    this.updateMovement();
    this.edges();
  }
  
  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    
    beginShape();
    vertex(0, -this.h / 2);
    vertex(-this.w / 2, this.h / 2);
    vertex(0, this.h0);
    vertex(this.w / 2, this.h / 2);
    endShape(CLOSE);
    
    pop();
    
    //ellipse(this.pos.x, this.pos.y, this.hitR * 2, this.hitR * 2);
    
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].show();
      this.projectiles[i].update();
      if (this.projectiles[i].isDead()) {
        this.projectiles.splice(i, 1);
      }
    }
  }
}