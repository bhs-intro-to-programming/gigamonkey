import { setCanvas, drawFilledCircle, clear, width, height, animate, now } from './graphics.js';

// Utility functions

const randomInt = (n) => Math.floor(Math.random() * n);

const randomSign = () => Math.random() < 0.5 ? -1 : 1;

const clamp = (n, min, max) => (n < min ? min : n > max ? max : n);

const distance = (b1, b2) => Math.hypot(b1.x - b2.x, b1.y - b2.y);

const sumVectors = (vs) => {
  const sum = { x: 0, y: 0 };
  vs.forEach(v => {
    sum.x += v.x;
    sum.y += v.y;
  });
  return sum;
};

const boid = (x, y, dx, dy) => {
  return { x, y, dx, dy };
};

const randomBoid = () => {
  return boid(
    randomInt(width),
    randomInt(height),
    (1 + randomInt(15)) * randomSign(),
    (1 + randomInt(15)) * randomSign());
};

const neighbors = (boid, boids, radius = 50) => boids.filter(other => distance(boid, other) <= radius);

const drawBoid = (b) => {
  drawFilledCircle(b.x, b.y, 5, 'blue');
};

const updatePosition = (b, elapsed) => {
  b.x = clamp(b.x + 10 * b.dx / elapsed, 0, width);
  b.y = clamp(b.y + 10 * b.dy / elapsed, 0, height);
  updateVelocity(b);
};

const sumForces = (b, ...fns) => sumVectors(fns.map(fn => fn(b)));

const updateVelocity = (b) => {
  const { x, y } = sumForces(b, wallRepulsion, jitter);
  b.dx += x;
  b.dy += y;
};

const wallRepulsion = (b) => {
  return {
    x: clamp((5 / b.x) - (5 / (width - b.x)), -5, 5),
    y: clamp((5 / b.y) - (5 / (height - b.y)), -5, 5),
  };
};

const jitter = (b) => {
  return {
    x: -1 + Math.random() * 2,
    y: -1 + Math.random() * 2,
  };
}

// This has to come early so width and height are set before we use them.
const canvas = document.getElementById('screen');
canvas.width = document.documentElement.offsetWidth * 0.95;
canvas.height = document.documentElement.offsetHeight * 0.95;
setCanvas(canvas);

const boids = Array(20).fill().map(randomBoid);

animate((elapsed) => {
  boids.forEach(b => updatePosition(b, elapsed));
  clear();
  boids.forEach(b => drawBoid(b));
});
