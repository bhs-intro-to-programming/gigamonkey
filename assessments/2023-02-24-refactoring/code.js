
const drawCoal = (x, y, size) => {
  drawFilledCircle(x, y, size, 'black');
};




const drawArms = (x, y, size) => {
  drawArm(x, y, size, 1);
  drawArm(x, y, size, -1);
};

const drawArm = (x, y, size, direction) => {
  const x1 = x + size * 0.6 * direction;
  const x2 = x + size * 2.35 * direction;
  drawLine(x1, y - size * 0.25, x2, y - size * 0.85, 'black', 3);
};

const drawButtons = (x, y, size) => {
  for (let i = 0; i < 3; i++) {
    drawCoal(x, y - size * 0.5 + i * size * 0.5, 4);
  }
};

const horizon = height * 0.7;
const base = height * 0.9;
const size = height * 0.7;

// Draw the background
drawFilledRect(0, 0, width, horizon, '#ddeeff');
drawFilledRect(0, horizon, width, height, 'white');
drawLine(0, horizon, width, horizon, '#bbb');

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

// Draw the head
const headRadius = headSize / 2;
drawCircle(x, headY, headRadius + 2, 'black', 3);
drawFilledCircle(x, headY, headRadius, 'white', 3);

// Draw the eyes
const eyeSpacing = headRadius * 0.25;
drawCoal(x - eyeSpacing, headY - eyeSpacing, 4);
drawCoal(x + eyeSpacing, headY - eyeSpacing, 4);

// Draw the nose
const noseLength = headRadius * 0.8;
drawFilledTriangle(x, headY, x + noseLength, headY + noseLength * 0.2, x, headY + noseLength * 0.3, 'orange');

// Draw the mouth
for (let i = 0; i < 5; i++) {
  const dy = -2 * (2.1 ** Math.abs(i - 2));
  drawCoal(x - (i - 2.3) * headRadius * 0.21, headY + headRadius * 0.65 + dy, 4);
}

// Draw the hat
const brimTop = headY - headRadius * 0.9;
const brimWidth = headRadius * 2.25;
const brimHeight = brimWidth * 0.08;
const hatWidth = brimWidth * 0.7;
const hatHeight = headRadius * 1.25;
drawFilledRect(x - brimWidth / 2, brimTop, brimWidth, brimHeight, 'black');
drawFilledRect(x - hatWidth / 2, brimTop - hatHeight, hatWidth, hatHeight, 'black');

// Draw the torso
const torsoRadius = torsoSize / 2;
drawCircle(x, torsoY, torsoRadius + 2, 'black', 3);
drawFilledCircle(x, torsoY, torsoRadius, 'white', 3);

drawArms(x, torsoY, torsoRadius);
drawButtons(x, torsoY, torsoRadius);

// Draw the butt
const buttRadius = buttSize / 2;
drawCircle(x, buttY, buttRadius + 2, 'black', 3);
drawFilledCircle(x, buttY, buttRadius, 'white', 3);
