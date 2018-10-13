class Pipe {
  constructor() {
    this.gap = 160;
    let pipeMargin = 20 + this.gap / 2;
    this.gapY = floor(random(height - pipeMargin * 2)) + pipeMargin;
    this.width = 20;
    this.x = width;
    this.speed = -2;
    this.color = "green";
  }

  draw() {
    fill(this.color);
    rect(this.x, 0, this.width, this.gapY - this.gap / 2);
    rect(
      this.x,
      this.gapY + this.gap / 2,
      this.width,
      height - this.gapY + this.gap / 2
    );
    return this;
  }

  update() {
    this.x += this.speed;
    return this;
  }

  hits(bird) {
    if (
      bird.x > this.x &&
      bird.x < this.x + this.width &&
      (bird.y < this.gapY - this.gap / 2 || bird.y > this.gapY + this.gap / 2)
    ) {
      this.color = "red";
      return true;
    }
  }

  is_out() {
    return this.x < -this.width;
  }
}
