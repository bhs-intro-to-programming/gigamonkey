import { setCanvas, drawFilledCircle, clear, width, height, animate, now } from './graphics.js';

const TAU = Math.PI * 2;

const SPEED_LIMIT = 2;

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

const average = (ns) => ns.reduce((acc, n) => acc + n, 0) / ns.length;

/*
 * Angle of the line from p1 to p2 from 0 to TAU.
 */
const angle = (p1, p2) => (TAU + Math.atan2(p2.y - p1.y, p2.x - p1.x)) % TAU;

const speed = (boid) => Math.hypot(boid.dx, boid.dy);

const boid = (x, y, dx, dy) => {
  return { x, y, dx, dy };
};

const randomBoid = () => {
  return boid(
    randomInt(width),
    randomInt(height),
    (1 + randomInt(2)) * randomSign(),
    (1 + randomInt(2)) * randomSign());
};

const neighbors = (boid, boids, radius = 100) => boids.filter(other => boid !== other && distance(boid, other) <= radius);

const center = (boids) => {
  return {
    x: average(boids.map(b => b.x)),
    y: average(boids.map(b => b.y))
  };
}

const drawBoid = (b) => {
  drawFilledCircle(b.x, b.y, 5, 'blue');
};

const updatePosition = (b, elapsed) => {
  b.x = clamp(b.x + 10 * b.dx / elapsed, 0, width);
  b.y = clamp(b.y + 10 * b.dy / elapsed, 0, height);
};

const updateVelocities = (boids) => {
  // Get all new velocities instantaneously, i.e. before any boid changes
  // position or velocity and then set them all.
  const newVelocities = boids.map(b => newVelocity(b, neighbors(b, boids)));
  boids.forEach((b, i) => setVelocity(b, newVelocities[i]));
};

const newVelocity = (b, nearby) => {
  const { x, y } = sumForces(b, nearby, wallRepulsion, jitter, cohesion);
  return {
    dx: clamp(b.dx + x, -SPEED_LIMIT, SPEED_LIMIT),
    dy: clamp(b.dy + y, -SPEED_LIMIT, SPEED_LIMIT),
  };
};

const setVelocity = (b, v) => {
  b.dx = v.dx;
  b.dy = v.dy;
}

const sumForces = (b, nearby, ...fns) => sumVectors(fns.map(fn => fn(b, nearby)));

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
};

const cohesion = (boid, nearby) => {
  if (nearby.length > 0) {
    const c = center(nearby);
    // Compute new vector with same magnitude but pointing toward the center.
    const magnitude = speed(boid);
    const direction = angle(boid, c);
    return {
      x: magnitude * Math.cos(direction),
      y: magnitude * Math.sin(direction),
    };
  } else {
    return { x: 0, y: 0 };
  }
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
  updateVelocities(boids);
});
