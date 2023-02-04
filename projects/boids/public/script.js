import { setCanvas, drawFilledCircle, drawTriangle, clear, width, height, animate, now } from './graphics.js';

// Mathematical constants
const TAU = Math.PI * 2;
const ZERO = { x: 0, y: 0 };

// Parameters
const SPEED_LIMIT = 20;
const WALL_REPULSION = 200;
const JITTER = 10;
const BOID_REPULSION = 100;
const SIZE = 5;
const RADIUS = SIZE * 15;
const RANDOM_TURN_FACTOR = 0.1;

// Utility functions

const randomInt = (n) => Math.floor(Math.random() * n);

const randomSign = () => Math.random() < 0.5 ? -1 : 1;

const clamp = (n, min, max) => (n < min ? min : n > max ? max : n);

const clampMagnitude = (n, magnitude) => clamp(n, -magnitude, magnitude);

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

const direction = (boid) => angle(ZERO, { x: boid.dx, y: boid.dy });

const vector = (magnitude, direction) => {
  return {
    x: magnitude * Math.cos(direction),
    y: magnitude * Math.sin(direction),
  };
};

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

const neighbors = (boid, boids) => boids.filter(other => boid !== other && distance(boid, other) <= RADIUS);

const center = (boids) => {
  return {
    x: average(boids.map(b => b.x)),
    y: average(boids.map(b => b.y))
  };
}

const drawBoid = (boid) => {
  //drawFilledCircle(boid.x, boid.y, 5, 'blue');

  // Draw trangle with center at center and nose pointing in the right direction.
  const d = direction(boid);
  const x = 0.6;
  const leftTail = sumVectors([boid, vector(SIZE, (d + TAU / 2 - x) % TAU)])
  const rightTail = sumVectors([boid, vector(SIZE, (d + TAU / 2 + x) % TAU)]);
  const nose = sumVectors([boid, vector(SIZE, d)]);

  drawTriangle(leftTail.x, leftTail.y, rightTail.x, rightTail.y, nose.x, nose.y, 'black');
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
  const { x, y } = sumForces(b, nearby, wallRepulsion, randomSpeedup, randomTurn, cohesion, repulsion, matching, randomSpeedup);
  return {
    dx: clampMagnitude(b.dx + x, SPEED_LIMIT),
    dy: clampMagnitude(b.dy + y, SPEED_LIMIT),
  };
};

const setVelocity = (b, v) => {
  b.dx = v.dx;
  b.dy = v.dy;
}

const sumForces = (b, nearby, ...fns) => sumVectors(fns.map(fn => fn(b, nearby)));

const wallRepulsion = (b) => {
  return {
    x: clampMagnitude((WALL_REPULSION / b.x) - (WALL_REPULSION / (width - b.x)), WALL_REPULSION),
    y: clampMagnitude((WALL_REPULSION / b.y) - (WALL_REPULSION / (height - b.y)), WALL_REPULSION),
  };
};

const jitter = (b) => {
  return {
    x: JITTER * (-1 + Math.random() * 2),
    y: JITTER * (-1 + Math.random() * 2),
  };
};

const randomSpeedup = (b) => {
  const amt = Math.random() - 0.5;
  return {
    x: b.dx * amt,
    y: b.dy * amt,
  };
};

const randomTurn = (b) => {
  const amt = Math.floor(Math.random() * TAU/20) * randomSign();
  return vector(speed(b) * RANDOM_TURN_FACTOR, direction(b) + amt);
};

// Head toward the center of mass of your neighbors at your current speed.
const cohesion = (boid, nearby) => {
  if (nearby.length === 0) {
    return ZERO;
  } else {
    return vector(speed(boid), angle(boid, center(nearby)));
  }
};

// But don't get too close to neighbors.
const repulsion = (boid, nearby) => {
  if (nearby.length === 0) {
    return ZERO;
  } else {
    return sumVectors(nearby.map(n => vector(BOID_REPULSION / distance(n, boid), angle(n, boid))));
  }
};

// Match velocity
const matching = (boid, nearby) => {
  if (nearby.length === 0) {
    return ZERO;
  } else {
    return {
      x: average(nearby.map(n => n.dx)),
      y: average(nearby.map(n => n.dy)),
    };
  }
};



// This has to come early so width and height are set before we use them.
const canvas = document.getElementById('screen');
canvas.width = document.documentElement.offsetWidth * 0.95;
canvas.height = document.documentElement.offsetHeight * 0.95;
setCanvas(canvas);

const boids = Array(1000).fill().map(randomBoid);

animate((elapsed) => {
  boids.forEach(b => updatePosition(b, elapsed));
  clear();
  boids.forEach(b => drawBoid(b));
  updateVelocities(boids);
});
