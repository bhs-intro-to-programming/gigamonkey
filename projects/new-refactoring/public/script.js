import {
  setCanvas,
  drawLine,
  drawCircle,
  drawRect,
  drawTriangle,
  drawFilledCircle,
  drawFilledRect,
  drawFilledTriangle,
  drawText,
  clear,
  width,
  height,
} from './graphics.js';

setCanvas(document.getElementById('screen'));

const SUN_SIZE = 100;
const SUN_RAYS = 6;
const SUN_RAY_PROPORTION = 2;
const SMALL_CLOUD_SIZE = 25;
const BIG_CLOUD_SIZE = 35;
const TRUNK_WIDTH = 20;
const TRUNK_HEIGHT = 55;
const LEAVES_RADIUS = 40;
const MIN_APPLES = 5;
const MAX_APPLES = 8;


const drawPicture = (horizon) => {
  drawSky(horizon);
  drawGround(horizon);
  drawSun(SUN_SIZE, SUN_RAYS, SUN_RAY_PROPORTION);
  drawClouds();
  drawTrees(5, horizon * 1.1);
};

const drawSky = (horizon) => {
  drawFilledRect(0, 0, width, horizon, 'skyblue');
};

const drawGround = (horizon) => {
  drawFilledRect(0, horizon, width, horizon, 'green');
};

const drawSun = (size, rays, rayProportion) => {
  // Sun is always at top right and the way we draw the rays depends on that.
  drawFilledCircle(width, 0, size, 'yellow');
  drawRays(rays, size * rayProportion);
};

const drawRays = (rays, length) => {
  // This is kinda hardwired for the fact the sun is at the top right corner
  const startAngle = (Math.PI / 2) * 0.023;
  const r = ((Math.PI / 2) - 2 * startAngle) / (rays - 1);
  for (let i = 0; i < rays; i++) {
    const angle = startAngle + Math.PI + (i * r);
    drawRay(width, 0, angle, length);
  }
};

const drawRay = (x, y, angle, length) => {
  const x2 = x + length * Math.cos(angle);
  const y2 = y - length * Math.sin(angle);
  drawLine(x, y, x2, y2, 'yellow', 7);
};

const drawClouds = () => {
  drawCloud(width * 0.1, height * 0.2, SMALL_CLOUD_SIZE);
  drawCloud(width * 0.5, height * 0.2, BIG_CLOUD_SIZE);
};

const drawCloud = (x, y, size) => {
  drawFilledCircle(x, y, size, 'white');
  drawFilledCircle(x+size*2.5, y, size, 'white');
  drawFilledCircle(x+(size*1.25), y - size * 0.5, size, 'white');
  drawFilledCircle(x+(size*1.25), y + size * 0.5, size, 'white');
};

const drawTrees = (num, baseY) => {
  const gap = width / (num + 1);
  for (let i = 0; i < num; i++) {
    drawTree((i + 1) * gap, baseY, TRUNK_WIDTH, TRUNK_HEIGHT, LEAVES_RADIUS);
  }
};

const drawTree = (baseX, baseY, trunkWidth, trunkHeight, leavesRadius) => {
  const leavesX = baseX + trunkWidth / 2;
  const leavesY = baseY - trunkHeight - (leavesRadius - 2);
  const numApples = MIN_APPLES + Math.floor(Math.random() * (MAX_APPLES - MIN_APPLES));

  drawFilledRect(baseX, baseY - trunkHeight, trunkWidth, trunkHeight, 'sienna');
  drawLeaves(leavesX, leavesY, leavesRadius);
  drawApples(numApples, leavesX, leavesY, leavesRadius, 6);
};

const drawLeaves = (x, y, radius) => {
  drawFilledCircle(x, y, radius, 'forestgreen');
};

const drawApples = (num, x, y, radius, appleRadius) => {
  drawApple(x, y, appleRadius);
  for (let i = 0; i < num; i++) {
    const angle = i * ((Math.PI * 2) / num);
    const d = radius - appleRadius * 1.25 - (Math.random() * appleRadius * 2);
    const ax = x + d * Math.cos(angle);
    const ay = y + d * Math.sin(angle);
    drawApple(ax, ay, appleRadius);
  }
};

const drawApple = (x, y, r) => {
  drawFilledCircle(x + jitter(r), y + jitter(r), r, 'crimson');
};

const jitter = (r) => -r/2 + Math.random() * r;

drawPicture(height * 0.78);
