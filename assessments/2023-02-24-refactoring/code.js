const horizon = height * 0.7
const size = height * 0.7
const base = height * 0.9

// Draw the snowman
const x = width / 2;
const proportions = [3, 4, 5];
const [headP, torsoP, buttP] = proportions;
const total = proportions.reduce((tot, p) => tot + p, 0);

const headSize = size * (headP / total);
const torsoSize = size * (torsoP / total)
const buttSize = size * (buttP / total);

const headY = (base - size) + headSize / 2;
const torsoY = headY + headSize / 2 + torsoSize / 2;
const buttY = torsoY + torsoSize / 2 + buttSize / 2;

const headRadius = headSize / 2;

const drawbackground = () => {
  drawFilledRect(0, 0, width, horizon, '#ddeeff');
  drawFilledRect(0, horizon, width, height, 'white');
  drawLine(0, horizon, width, horizon, '#bbb');
}
drawbackground();

const head = () => {
  drawCircle(x, headY, headRadius + 2, 'black', 3);
  drawFilledCircle(x, headY, headRadius, 'white', 3);
}
head();

const eyeSpacing = headRadius * 0.25;
const lefteye = drawFilledCircle(x - eyeSpacing, headY - eyeSpacing, 4, 'black');
const righteye = drawFilledCircle(x + eyeSpacing, headY - eyeSpacing, 4, 'black');

const eyespacing = () => {
  lefteye
  righteye
}
eyespacing();

const noseLength = headRadius * 0.8;

const nose = () => {
  drawFilledTriangle(x, headY, x + noseLength, headY + noseLength * 0.2, x, headY + noseLength * 0.3, 'orange');
}
nose();

const mouth = () => {
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (2.1 ** Math.abs(i - 2));
    drawFilledCircle(x - (i - 2.3) * headRadius * 0.21, headY + headRadius * 0.65 + dy, 4, 'black');
  }
}
mouth();

const brimTop = headY - headRadius * 0.9;
const brimWidth = headRadius * 2.25;
const brimHeight = brimWidth * 0.08;
const hatWidth = brimWidth * 0.7;
const hatHeight = headRadius * 1.25;

const hat = () => {
  drawFilledRect(x - brimWidth / 2, brimTop, brimWidth, brimHeight, 'black');
  drawFilledRect(x - hatWidth / 2, brimTop - hatHeight, hatWidth, hatHeight, 'black');
}
hat();

const torsoRadius = torsoSize / 2;
drawCircle(x, torsoY, torsoRadius + 2, 'black', 3);
drawFilledCircle(x, torsoY, torsoRadius, 'white', 3);

const arms = () => {
  let x1 = x + torsoRadius * 0.6;
  let x2 = x + torsoRadius * 2.35;
  drawLine(x1, torsoY - torsoRadius * 0.25, x2, torsoY - torsoRadius * 0.85, 'black', 3);
  x1 = x + torsoRadius * 0.6 * -1;
  x2 = x + torsoRadius * 2.35 * -1;
  drawLine(x1, torsoY - torsoRadius * 0.25, x2, torsoY - torsoRadius * 0.85, 'black', 3);
}
arms();

const buttons = () => {
  for (let i = 0; i < 3; i++) {
    drawFilledCircle(x, torsoY - torsoRadius * 0.5 + i * torsoRadius * 0.5, 4, 'black');
  }
}
buttons();

const buttRadius = buttSize / 2;
const butt = () => {
  drawCircle(x, buttY, buttRadius + 2, 'black', 3);
  drawFilledCircle(x, buttY, buttRadius, 'white', 3);
}
butt();