class Pipe {
  constructor() {
    this.gap = 160;
    let pipeMargin = 20 + this.gap / 2;
    this.gapY = floor(random(height - pipeMargin * 2)) + pipeMargin;
    this.x = width;
    this.speed = -2;
  }

  draw() {
    image(this.img_top, this.x, this.gapY - this.img_top.height - this.gap / 2);
    image(this.img_bottom, this.x, this.gapY + this.gap / 2);
    return this;
  }

  update(bird) {
    this.x += this.speed;

    // score
    if (
      !this.did_pass &&
      bird.x + bird.width / 2 > this.x + this.img_top.width
    ) {
      this.did_pass = true;
      this.sound_passed.play();
    }

    // die
    if (
      !this.did_hit &&
      bird.x + bird.width > this.x &&
      bird.x < this.x + this.img_top.width &&
      (bird.y < this.gapY - this.gap / 2 ||
        bird.y + bird.height > this.gapY + this.gap / 2)
    ) {
      this.did_hit = true;
      this.sound_hit.play();
    }
    return this;
  }

  hits() {
    return this.did_hit;
  }

  is_out() {
    return this.x < -this.img_top.width;
  }
}
