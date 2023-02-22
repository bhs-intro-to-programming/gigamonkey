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
    //console.log(`x: ${x}; y: ${y}`)
    g.drawFilledCircle(x, y, this.radius, '#00f9');
  }
}

const g = graphics(canvas);
const mid = new Vector(g.width / 2, g.height / 2);
const gravity = new Vector(0, 0.0001);

const balls = [new Ball(mid, mid, Vector.zero, 20)];

const drawBackground = (g) => {
  g.clear();
  g.drawFilledRect(0, 0, g.width, g.height, '#888');
  g.drawFilledCircle(g.width / 2, g.height / 2, (Math.min(g.width, g.height) / 2) * 0.85, 'white');
};

const applyGravity = () => {
  balls.forEach(b => b.accelerate(gravity));
}


animate((elapsed) => {
  applyGravity();
  balls.forEach(b => b.updatePosition(elapsed));
  drawBackground(g);
  balls.forEach(b => b.draw(g));
});
