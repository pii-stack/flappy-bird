class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 60;
    this.gravity = 0.5;
    this.velocity = -10;
    this.flapForce = -15;
    this.die = false;
  }

  draw() {
    fill(255);
    asdf;
    ellipse(this.x, this.y, 32, 32);
  }

  update() {
    this.fall();
    if (this.y > height || this.y < 0) this.die = true;
    return this;
  }

  flap() {
    if (this.die) return;
    this.velocity += this.flapForce;
  }

  fall() {
    if (this.die) return;
    this.velocity += this.gravity;
    this.y += max(this.velocity, -10);
  }

  is_dead() {
    return this.die;
  }

  kill() {
    this.die = true;
  }
}
