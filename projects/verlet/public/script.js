import { animate } from './animation.js';
import graphics from './graphics.js';

// Based on https://www.youtube.com/watch?v=lS_qeBy3aQI

const canvas = document.getElementById('screen');
canvas.width = document.documentElement.offsetWidth * 0.75;
canvas.height = document.documentElement.offsetHeight * 0.75;

class Vector {

  static zero = new Vector(0, 0);

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  minus(other) {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  times(n) {
    return new Vector(this.x * n, this.y * n)
  }

  divide(n) {
    return new Vector(this.x / n, this.y / n);
  }

  length() {
    return Math.hypot(this.x, this.y);
  }
  distance(other) {
    return Math.hypot(this.x - other.x, this.y - other.y);
  }
}

class Ball {
  constructor(position, oldPosition, acceleration, radius = 50) {
    this.position = position;
    this.oldPosition = oldPosition;
    this.acceleration = acceleration;
    this.radius = radius;
  }

  updatePosition(dt) {
    const v = this.position.minus(this.oldPosition);
    this.oldPosition = this.position;
    this.position = this.position.plus(v).plus(this.acceleration.times(dt ** 2));
    this.acceleration = Vector.zero;
  }

  accelerate(acc) {
    this.acceleration = this.acceleration.plus(acc);
  }

  draw(g) {
    const { x, y } = this.position;
    g.drawFilledCircle(x, y, this.radius, '#00f9');
  }
}

const g = graphics(canvas);
const mid = new Vector(g.width / 2, g.height / 2);
const gravity = new Vector(0, 0.0005);
const radius = (Math.min(g.width, g.height) / 2) * 0.85;

const startAt = (x, y) => {
  const start = new Vector(x, y);
  return new Ball(start, start, Vector.zero, Math.floor(5 + Math.random() * 10));
};

const balls = [];

let next = 0;

const spawn = (t) => {
  if (t > next) {
    balls.push(startAt(mid.x + 100, mid.y));
    next = t + 250;
  }
};

const drawBackground = (g) => {
  g.clear();
  g.drawFilledRect(0, 0, g.width, g.height, '#888');
  g.drawFilledCircle(mid.x, mid.y, radius, 'white');
};

const constrain = (b) => {
  const toObj = b.position.minus(mid);
  const dist = toObj.length();
  if (dist > radius - b.radius) {
    const n = toObj.divide(dist);
    const constrainedPosition = mid.plus(n.times(radius - b.radius));
    b.position = constrainedPosition;
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
        const n = axis.divide(dist);
        const bounce = n.times(((b1.radius + b2.radius) - dist) * 0.5);
        b1.position = b1.position.plus(bounce);
        b2.position = b2.position.minus(bounce);
      }
    }
  }
};



animate((elapsed, t) => {
  spawn(t);
  balls.forEach(b => b.accelerate(gravity));
  balls.forEach(b => constrain(b));
  collisions();
  balls.forEach(b => b.updatePosition(elapsed));
  drawBackground(g);
  balls.forEach(b => b.draw(g));
});
