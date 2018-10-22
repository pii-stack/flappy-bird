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
    image(this.img, this.x, this.y);
  }

  update() {
    this.fall();
    if (this.y > height || this.y < 0) this.die = true;
    return this;
  }

  flap() {
    if (this.die) return;
    this.velocity += this.flapForce;
    this.sound_flap.play();
  }

  fall() {
    if (this.die) return;
    this.velocity += this.gravity;
    this.y += max(this.velocity, -10);
  }

  get_position() {
    return {
      x: this.x,
      width: this.img.width,
      y: this.y,
      height: this.img.height
    };
  }

  is_dead() {
    return this.die;
  }

  kill() {
    this.die = true;
  }
}
