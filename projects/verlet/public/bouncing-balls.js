// Based on explanation of Verlet integration in https://www.youtube.com/watch?v=lS_qeBy3aQI

import { animate } from './animation.js';
import graphics from './graphics.js';
import vector from './vector.js';
import ball from './ball.js';

const canvas = document.getElementById('screen');
canvas.width = document.documentElement.offsetWidth * 0.95;
canvas.height = document.documentElement.offsetHeight * 0.95;

const g = graphics(canvas);
const mid = vector(g.width / 2, g.height / 2);
const radius = (Math.min(g.width, g.height) / 2) * 0.85;
const zero = vector(0, 0);

let r = 128;

const rgb = () => `rgb(${r}, 128, 255)`;

const drawBackground = (g) => {
  g.clear();
  g.drawFilledRect(0, 0, g.width, g.height, rgb());
};

const WALL = { velocity: vector(0,0), mass: Infinity };

const walls = (b) => {
  const v = b.velocity;
  if (b.position.x - b.radius <= 0 || g.width <= b.position.x + b.radius) {
    collide(b, WALL, vector(Math.sign(v.x), 0), 1);
  }
  if (b.position.y - b.radius <= 0 || g.height <= b.position.y + b.radius) {
    collide(b, WALL, vector(0, Math.sign(v.y)), 1);
  }
};

const collisions = () => {
  for (let i = 0; i < balls.length - 1; i++) {
    const b1 = balls[i];
    for (let j = i + 1; j < balls.length; j++) {
      const b2 = balls[j];
      const axis = b1.position.minus(b2.position);
      const dist = axis.length();
      if (dist < b1.radius + b2.radius) {
        collide(b1, b2, axis.normalized(), 1);
      }
    }
  }
};

const collide = (b1, b2, collisionNormal, elasticity) => {
  const relativeVelocity = b1.velocity.minus(b2.velocity)
  const j = -(elasticity + 1) * relativeVelocity.dot(collisionNormal) / (1/b1.mass + 1/b2.mass);
  const scaled = collisionNormal.times(j);
  reposition(b1, b1.velocity.plus(scaled.divide(b1.mass));
  reposition(b2, b2.velocity.minus(scaled.divide(b2.mass));
};

const reposition = (o, v) => {
  if (o.mass < Infinity) {
    o.position = o.oldPosition.plus(v);
  }
};

const random = (a, b) => {
  const [min, max] = b === undefined ? [0, a] : [a, b];
  return min + Math.random() * (max - min);
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const spawn = (x, y, v, r) => {
  const start = vector(x, y);
  const prev = start.minus(v);
  return ball(start, prev, zero, r);
};

const spawnBalls = (rows, cols) => {
  const balls = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * g.width / cols + g.width / (cols * 2);
      const y = row * g.height / rows + g.height / (rows * 2);
      balls.push(spawn(x, y, vector(random(-1, 1), random(-1, 1)), random(minSize, maxSize)));
    }
  }
  return balls;
};

const changeSpeed = (balls, sign) => {
  r = clamp(r + sign * 4, 0, 255);
  balls.forEach(b => {
    b.accelerate(b.velocity.times(sign * 0.01))
  });
};

const minSize = 20;
const maxSize = 50;
const steps = 8;
const rows = Math.floor(g.height / (maxSize * 4.5));
const cols = Math.floor(g.width / (maxSize * 4.5));

let balls;

if (true) {
  balls = spawnBalls(rows, cols);
} else {
  balls = [
    spawn(50, mid.y + 50, vector(1, 0), 23),
    //spawn(24, g.height - 50, vector(1, 1), 23),
    spawn(mid.x, mid.y, vector(0, 0), 50),
  ];
}

// Globally speed up and slow down balls
document.body.onkeydown = (e) => {
  if (e.key === 'ArrowUp') {
    changeSpeed(balls, 1);
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    changeSpeed(balls, -1);
    e.preventDefault();
  }
};

animate((elapsed) => {
  const step = elapsed / steps;
  for (let i = 0; i < steps; i++) {
    balls.forEach((b) => walls(b));
    collisions();
    balls.forEach((b) => b.updatePosition(step));
  }
  drawBackground(g);
  balls.forEach((b) => b.draw(g));
});
