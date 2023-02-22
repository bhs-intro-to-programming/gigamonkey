import { animate } from './animation.js';
import graphics from './graphics.js';

const distance = (a, b) => Math.abs(a - b);

const clamp = (n, min, max) => (n < min ? min : n > max ? max : n);

const launch = (b, speed, direction) => {
  b.dx = Math.cos(direction) * speed;
  b.dy = Math.sin(direction) * speed;
};

const drawBall = (g, b) => {
  g.drawFilledCircle(b.x, b.y, b.size, 'blue');
};

const updatePosition = (b, width, height, elapsed) => {
  maybeBounce(b, width, height);
  b.x = clamp(b.x + b.dx * elapsed, 0, width);
  b.y = clamp(b.y + b.dy * elapsed, 0, height);
};

const maybeBounce = (b, width, height) => {
  if (Math.min(distance(b.x, 0), distance(b.x, width)) < b.size) {
    b.dx *= -1;
  }
  if (Math.min(distance(b.y, 0), distance(b.y, height)) < b.size) {
    b.dy *= -1;
  }
};

const canvas = document.getElementById('screen');
canvas.width = document.documentElement.offsetWidth * 0.75;
canvas.height = document.documentElement.offsetHeight * 0.75;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 15,
  dx: 0,
  dy: 0,
};

const g = graphics(canvas);

launch(ball, 1.5, Math.random() * Math.PI * 2);

animate((elapsed) => {
  updatePosition(ball, canvas.width, canvas.height, elapsed);
  g.clear();
  drawBall(g, ball);
});
