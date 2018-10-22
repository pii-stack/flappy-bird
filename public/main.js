let bird,
  pipe = [],
  gameOver = false,
  canRestart = false,
  bgImage,
  fgImage,
  scoreSound;

preload = () => {
  Bird.prototype.sound_flap = loadSound("./sounds/minijump.wav");
  Pipe.prototype.sound_passed = loadSound("./sounds/chime.mp3");
  Pipe.prototype.sound_hit = loadSound("./sounds/kick.wav");
};

setup = () => {
  createCanvas(288, 512);
  bgImage = loadImage("./images/bg.png");
  fgImage = loadImage("./images/fg.png");
  Bird.prototype.img = loadImage("./images/bird.png");
  Pipe.prototype.img_top = loadImage("./images/pipe_top.png");
  Pipe.prototype.img_bottom = loadImage("./images/pipe_bottom.png");
  Bird.prototype.sound_flap.setVolume(0.1);

  bird = new Bird();
  pipe.push(new Pipe());
};

draw = () => {
  image(bgImage, 0, 0);
  if (bird.is_dead()) {
    game_isOver();
    bird.draw();
  }
  bird.update().draw();

  for (let i = pipe.length - 1; i >= 0; i--) {
    if (gameOver) pipe[i].draw();

    if (!gameOver) {
      pipe[i].update(bird.get_position()).draw();
      if (pipe[i].hits()) {
        game_isOver();
        bird.kill();
      }
      if (pipe[i].is_out()) pipe.shift();
    }
  }

  if (frameCount % 100 === 0 && !gameOver) pipe.push(new Pipe());
};

mousePressed = () => {
  bird.flap();
  if (gameOver) restart();
};

keyPressed = () => {
  if (key == " ") {
    bird.flap();
    if (gameOver) restart();
  }
};

game_isOver = () => {
  if (gameOver) return;
  gameOver = true;
  setTimeout(() => {
    canRestart = true;
  }, 1000);
};

restart = () => {
  if (!canRestart) return;
  gameOver = false;
  canRestart = false;
  pipe = [];
  frameCount = 0;
  setup();
};
