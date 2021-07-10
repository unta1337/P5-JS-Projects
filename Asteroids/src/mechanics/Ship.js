class Ship extends object {
  constructor(position, radius) {
    super(position, radius);
  
    this.SPEED_LIMIT = 20;
    this.ACCELERATION = 0.2;
    
    this.heading = 0;
    
    this.ANGULAR_SPEED_LIMIT = Tools.degToRad(5);
    this.ANGULAR_ACCELERATION = Tools.degToRad(0.2);
    
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
    
    this.width = radius * 2;
    this.height = this.width * 1.4;
    this.subHeight = this.height / 4;
    this.hitRadius = this.width / 2;
    
    this.projectiles = [];
    
    this.shoot = false;
  }
  
  rotateCounterClockwise() {
    this.angularAcceleration = -this.ANGULAR_ACCELERATION;
  }
  
  rotateClockwise() {
    this.angularAcceleration = this.ANGULAR_ACCELERATION;
  }
  
  stopRotate() {
    this.angularVelocity *= 0.95;
  }
  
  moveFoward() {
    this.acceleration = p5.Vector.fromAngle(this.heading - Tools.degToRad(90), this.ACCELERATION);
  }
  
  stopMove() {
    this.velocity.mult(0.98); 
  }
  
  updateMovement() {
    this.angularVelocity += this.angularAcceleration;
    let sign = this.angularVelocity != 0 ? this.angularVelocity / abs(this.angularVelocity) : 0;
    this.angularVelocity = abs(this.angularVelocity) > this.ANGULAR_SPEED_LIMIT ? sign * this.ANGULAR_SPEED_LIMIT : this.angularVelocity;
    this.heading += this.angularVelocity;
    this.angularAcceleration *= 0;
    
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.SPEED_LIMIT);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  update() {
    this.updateMovement();
    this.edges();
  }
  
  fire() {
    let radius = this.height / 2;
    let projectileRadius = this.height * 0.03;
    let angle = this.heading - Tools.degToRad(90);
    
    let x = this.position.x + projectileRadius * cos(angle);
    let y = this.position.y + projectileRadius * sin(angle);
    
    this.projectiles.push(new Projectile(createVector(x, y), angle, projectileRadius));
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
  
  show() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.heading);
    
    beginShape();
    vertex(0, -this.height / 2);
    vertex(-this.width / 2, this.height / 2);
    vertex(0, this.subHeight);
    vertex(this.width / 2, this.height / 2);
    endShape(CLOSE);
    
    pop();
    //super.show();
    
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].show();
      this.projectiles[i].update();
      if (this.projectiles[i].isDead()) {
        this.projectiles.splice(i, 1);
      }
    }
  }
}