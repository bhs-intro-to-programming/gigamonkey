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
  b.x = clamp(b.x + b.dx/10 * elapsed, 0, width);
  b.y = clamp(b.y + b.dy/10 * elapsed, 0, height);
  updateVelocity(b);
};

const updateVelocity = (b) => {
  b.dx -= (b.x - 0) / (10 * width / 2);
  b.dx += (width - b.x) / (10 * width / 2);

  b.dy -= b.y / (10 * height / 2);
  b.dy += (height - b.y) / (10 * height / 2);

  // b.dx += -1 + Math.random() * 2;
  // b.dy += -1 + Math.random() * 2;
};

const clamp = (n, min, max) => (n < min ? min : n > max ? max : n);

// This has to come early so width and height are set before we use them.
setCanvas(document.getElementById('screen'));


const boids = Array(100).fill().map(randomBoid);

animate((t) => {
  updatePositions(boids, t);
  clear();
  boids.forEach(b => drawBoid(b));
});
