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

const drawBackground = (g) => {
  g.clear();
  g.drawFilledRect(0, 0, g.width, g.height, '#88f');
};

const walls = (b) => {
  // If the ball is touching (or beyond) one of the four walls compute its new
  // velocity and from that its new position and move it to that position.
  if (b.position.x - b.radius <= 0 || g.width <= b.position.x + b.radius) {
    const { x: dx, y: dy } = b.velocity;
    b.position = b.position.plus(vector(-2 * dx, 0));
  }

  if (b.position.y - b.radius <= 0 || g.height <= b.position.y + b.radius) {
    const { x: dx, y: dy } = b.velocity;
    b.position = b.position.plus(vector(0, -2 * dy));
  }
};


const newVelocity = (v1, v2, m1, m2) => {
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

        const b1v2 = newVelocity(b1v1, b2v1, b1.mass, b2.mass);
        const b2v2 = newVelocity(b2v1, b1v1, b2.mass, b1.mass);

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

const spawner = (x, y, min, max, freq, balls) => {
  const r = 0.2;
  let since = 0;
  return (elapsed) => {
    since += elapsed;
    if (since > freq) {
      const start = vector(x, y);
      const velocity = vector(random(-r, r), -random(2 * r));
      const prev = start.minus(velocity.times(elapsed));
      balls.push(ball(start, prev, zero, Math.floor(min + Math.random() * (max - min))));
      since = 0;
    }
  };
};

const spawn = (x, y, min, max, balls) => {
  const r = 0.2;
  const start = vector(x, y);
  const velocity = vector(random(-r, r), -random(2 * r));
  const prev = start.minus(velocity.times(5));
  balls.push(ball(start, prev, zero, Math.floor(min + Math.random() * (max - min))));
};


const balls = [];
const spawners = [
  spawner(mid.x, mid.y, 50, 100, 1000, balls),
  //spawner(mid.x + 100, mid.y, 250, balls),
  //spawner(mid.x - 200, mid.y - 100, 250, balls)
];

const steps = 8;

//spawn(mid.x, mid.y, 20, 20, balls);
//spawn(50, 80, 40, 40, balls);

animate((elapsed) => {
  const step = elapsed / steps;
  for (let i = 0; i < steps; i++) {
    spawners.forEach((s) => s(step));
    balls.forEach((b) => walls(b));
    collisions();
    balls.forEach((b) => b.updatePosition(step));
  }
  drawBackground(g);
  balls.forEach((b) => b.draw(g));
});
