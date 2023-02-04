import { setCanvas, drawFilledCircle, clear, width, height, animate, now } from './graphics.js';

const randomInt = (n) => Math.floor(Math.random() * n);
const randomSign = () => Math.random() < 0.5 ? -1 : 1;

const boid = (x, y, dx, dy) => {
  return { x, y, dx, dy };
};

const randomBoid = () => boid(
  randomInt(width),
  randomInt(height),
  (1 + randomInt(5)) * randomSign(),
  (1 + randomInt(5)) * randomSign());

const distance = (b1, b2) => Math.hypot(b1.x - b2.x, b1.y - b2.y);

const neighbors = (boid, boids) => boids.filter(b => distance(b, boid) < 50);

const drawBoid = (b) => {
  drawFilledCircle(b.x, b.y, 5, 'blue');
};

let lastFrame = now();

const updatePositions = (boids, t) => {
  const elapsed = t - lastFrame;
  boids.forEach(b => updatePosition(b, elapsed));
  lastFrame = t;
};

const updatePosition = (b, elapsed) => {
  b.x = clamp(b.x + 10 * b.dx / elapsed, 0, width);
  b.y = clamp(b.y + 10 * b.dy / elapsed, 0, height);
  updateVelocity(b);
};

const updateVelocity = (b) => {
  // Repulsion - the closer the boid is to the left wall (x=0) the more it is
  // accelerated in the positive x direction. And so on for the other walls.
  b.dx += 5 * (b.x < width / 2 ? 1 / b.x : -1 / (width - b.x));
  b.dy += 5 * (b.y < height / 2 ? 1 / b.y : -1 / (height - b.y));

  //b.dx += 0.25 * (-1 + Math.random() * 2);
  //b.dy += 0.25 * (-1 + Math.random() * 2);
};

const clamp = (n, min, max) => (n < min ? min : n > max ? max : n);

// This has to come early so width and height are set before we use them.
const canvas = document.getElementById('screen');
canvas.width = document.documentElement.offsetWidth * 0.95;
canvas.height = document.documentElement.offsetHeight * 0.95;
setCanvas(canvas);


const boids = Array(50).fill().map(randomBoid);

animate((t) => {
  updatePositions(boids, t);
  clear();
  boids.forEach(b => drawBoid(b));
});
