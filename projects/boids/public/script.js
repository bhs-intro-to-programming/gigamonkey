import { setCanvas, drawTriangle, clear, width, height, animate } from './graphics.js';

////////////////////////////////////////////////////////////////
// Mathematical constants
const TAU = Math.PI * 2;
const ZERO = { x: 0, y: 0 };

////////////////////////////////////////////////////////////////
// Parameters
const SIZE = 5;
const SPEED_LIMIT = 30;
const WALL_REPULSION = 200;
const BOID_REPULSION = 100;
const NEARBY_RADIUS = SIZE * 12;
const MAX_RANDOM_TURN = TAU / 20;
const RANDOM_TURN_FACTOR = 0.1;
const ANGLE_OF_VISION = TAU * 0.3;

////////////////////////////////////////////////////////////////
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
 * Angle of the line from p1 to p2, expressed in radians from from 0 to TAU.
 */
const angle = (p1, p2) => (TAU + Math.atan2(p2.y - p1.y, p2.x - p1.x)) % TAU;

/*
 * Vector in x,y form with a given magnitude and direction.
 */
const vector = (magnitude, direction) => {
  return {
    x: magnitude * Math.cos(direction),
    y: magnitude * Math.sin(direction),
  };
};

////////////////////////////////////////////////////////////////
// Boid functions

const boid = (x, y, dx, dy) => {
  return { x, y, dx, dy };
};

const speed = (boid) => Math.hypot(boid.dx, boid.dy);

const direction = (boid) => angle(ZERO, { x: boid.dx, y: boid.dy });

const setVelocity = (b, v) => {
  b.dx = v.dx;
  b.dy = v.dy;
};

const randomBoid = () => {
  return boid(
    randomInt(width),
    randomInt(height),
    (1 + randomInt(2)) * randomSign(),
    (1 + randomInt(2)) * randomSign());
};

const isNeighbor = (boid, other) => {
  return boid !== other &&
    distance(boid, other) <= NEARBY_RADIUS &&
    canSee(boid, other);
};

const canSee = (boid, other) => {
  const theta = Math.abs(direction(boid) - angle(boid, other));
  return Math.min(theta, TAU - theta) < ANGLE_OF_VISION;
};

const neighbors = (boid, boids) => boids.filter(other => isNeighbor(boid, other));

const center = (boids) => {
  return {
    x: average(boids.map(b => b.x)),
    y: average(boids.map(b => b.y))
  };
}

const drawBoid = (boid) => {
  // A trangle with center at center and nose pointing in the right direction.
  const d = direction(boid);
  const x = 0.6;
  const leftTail = sumVectors([boid, vector(SIZE, (d + TAU / 2 - x) % TAU)])
  const rightTail = sumVectors([boid, vector(SIZE, (d + TAU / 2 + x) % TAU)]);
  const nose = sumVectors([boid, vector(SIZE, d)]);

  drawTriangle(leftTail.x, leftTail.y, rightTail.x, rightTail.y, nose.x, nose.y, 'black');
};

////////////////////////////////////////////////////////////////
// Simulation machinery

const updatePosition = (b, elapsed) => {
  b.x = clamp(b.x + 10 * b.dx / elapsed, 0, width);
  b.y = clamp(b.y + 10 * b.dy / elapsed, 0, height);
};

const updateVelocities = (boids, forces) => {
  // Get all new velocities instantaneously, i.e. compute the new velocity of
  // all boids based on the current state of all other boids and *then* update
  // them all.
  const updated = boids.map(b => newVelocity(b, neighbors(b, boids), forces));
  boids.forEach((b, i) => setVelocity(b, updated[i]));
};

const newVelocity = (b, nearby, forces) => {
  const { x, y } = sumVectors(forces.map(f => f(b, nearby)));
  const target = { dx: b.dx + x, dy: b.dy + y };
  const s = speed(b);
  const ds = speed(target) - s;
  const r = vector(clampMagnitude(s + ds * 0.5, SPEED_LIMIT), direction(target));
  return { dx: r.x, dy: r.y };
};

////////////////////////////////////////////////////////////////
// Forces pushing the boids around -- we compute each force separately, sum the
// vectors and then apply them with some clamping on the speed.

/*
 * Stay away from the walls.
 */
const wallRepulsion = (b) => {
  return {
    x: clampMagnitude((WALL_REPULSION / b.x) - (WALL_REPULSION / (width - b.x)), WALL_REPULSION),
    y: clampMagnitude((WALL_REPULSION / b.y) - (WALL_REPULSION / (height - b.y)), WALL_REPULSION),
  };
};

/*
 * Randomly speed up or slow down.
 */
const randomSpeedChange = (b) => {
  const amt = Math.random() - 0.5;
  return {
    x: b.dx * amt,
    y: b.dy * amt,
  };
};

/*
 * Randomly turn.
 */
const randomTurn = (b) => {
  const amt = Math.floor(Math.random() * MAX_RANDOM_TURN) * randomSign();
  return vector(speed(b) * RANDOM_TURN_FACTOR, direction(b) + amt);
};

/*
 * Head toward the center of mass of neighbors.
 */
const cohesion = (boid, nearby) => {
  if (nearby.length === 0) {
    return ZERO;
  } else {
    return vector(speed(boid), angle(boid, center(nearby)));
  }
};

/*
 * Don't get too close to neighbors.
 */
const repulsion = (boid, nearby) => {
  if (nearby.length === 0) {
    return ZERO;
  } else {
    return sumVectors(nearby.map(n => vector(BOID_REPULSION / distance(n, boid), angle(n, boid))));
  }
};

/*
 * Match speed and direction of neighbors.
 */
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
const forces = [
  wallRepulsion,
  randomSpeedChange,
  randomTurn,
  cohesion,
  repulsion,
  matching,
];

animate((elapsed) => {
  boids.forEach(b => updatePosition(b, elapsed));
  clear();
  boids.forEach(b => drawBoid(b));
  updateVelocities(boids, forces);
});
