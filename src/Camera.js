class Camera {
    constructor() {
      this.position = createVector(0, 0, 0);
      this.velocity = createVector(0, 0, 0);
      this.speed = 10;
      this.sensitivity = 0.02;
      this.angleX = 0;
      this.angleY = 0;
    }
  
    update() {
      this.handleMovement();
      this.handleMouse();
      
    }
  
    handleMovement() {
      if (keyIsDown(87)) { // 'w' key
        this.position.z -= this.speed;
      }
      if (keyIsDown(83)) { // 's' key
        this.position.z += this.speed;
      }
      if (keyIsDown(65)) { // 'a' key
        this.position.x -= this.speed;
      }
      if (keyIsDown(68)) { // 'd' key
        this.position.x += this.speed;
      }
      if (keyIsDown(32)) { // space key for up
        this.position.y -= this.speed;
      }
      if (keyIsDown(69)) { // 'e' key for down
        this.position.y += this.speed;
      }
    }
  
    handleMouse() {
      this.angleX += (pmouseY - mouseY) * this.sensitivity;
      this.angleY += (pmouseX - mouseX) * this.sensitivity;
  
      this.angleX = constrain(this.angleX, -HALF_PI, HALF_PI);
      this.angleY = this.angleY % TWO_PI;
    }
  }