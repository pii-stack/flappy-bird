let bird,
  pipe = [],
  gameOver = false,
  canRestart = false;

setup = () => {
  createCanvas(400, 600);
  bird = new Bird();
  pipe.push(new Pipe());
};

draw = () => {
  background(0);
  if (bird.is_dead()) {
    game_isOver();
    bird.draw();
  }
  bird.update().draw();

  for (let i = pipe.length - 1; i >= 0; i--) {
    if (gameOver) pipe[i].draw();

    if (!gameOver) {
      pipe[i].update().draw();
      if (pipe[i].hits(bird)) {
        game_isOver();
        bird.kill();
      }
      if (pipe[i].is_out()) pipe.shift();
    }
  }

  if (frameCount % 100 === 0 && !gameOver) {
    pipe.push(new Pipe());
  }
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
