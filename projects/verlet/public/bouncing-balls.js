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

const walls = (b) => {
  const { x: dx, y: dy } = b.velocity;
  if (b.position.x - b.radius <= 0 || g.width <= b.position.x + b.radius) {
    b.position = b.position.plus(vector(-2 * dx, 0));
  }
  if (b.position.y - b.radius <= 0 || g.height <= b.position.y + b.radius) {
    b.position = b.position.plus(vector(0, -2 * dy));
  }
};


const collisionVelocity = (v1, v2, m1, m2) => {
  return v1.times((m1 - m2) / (m1 + m2)).plus(v2.times((2 * m2) / (m1 + m2)));
};

const collisions = () => {
  for (let i = 0; i < balls.length - 1; i++) {
    const b1 = balls[i];
    for (let j = i + 1; j < balls.length; j++) {
      const b2 = balls[j];
      const axis = b1.position.minus(b2.position);
      const dist = axis.length();
      if (dist < b1.radius + b2.radius) {
        // Compute new velocity and update position.
        const b1v1 = b1.velocity;
        const b2v1 = b2.velocity;

        const b1v2 = collisionVelocity(b1v1, b2v1, b1.mass, b2.mass);
        const b2v2 = collisionVelocity(b2v1, b1v1, b2.mass, b1.mass);

        b1.position = b1.oldPosition.plus(b1v2);
        b2.position = b2.oldPosition.plus(b2v2);
      }
    }
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
      balls.push(spawn(x, y, vector(random(-1, 1), random(-1, 1)), random(20, 50)));
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

const steps = 8;
const balls = spawnBalls(5, 6);

// Globally speed up and slow down balls
document.body.onkeydown = (e) => {
  if (e.key === 'ArrowUp') {
    changeSpeed(balls, 1);
  } else if (e.key === 'ArrowDown') {
    changeSpeed(balls, -1);
  }
  e.preventDefault();
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
