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
const gravity = new Vector(0, 0.0001);
const radius = (Math.min(g.width, g.height) / 2) * 0.85;

const start = new Vector(mid.x + 100, mid.y);
const balls = [new Ball(start, start, Vector.zero, 20)];

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

animate((elapsed) => {
  balls.forEach(b => b.accelerate(gravity));
  balls.forEach(b => constrain(b));
  balls.forEach(b => b.updatePosition(elapsed));
  drawBackground(g);
  balls.forEach(b => b.draw(g));
});
