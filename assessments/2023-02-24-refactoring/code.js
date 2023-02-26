const drawPicture = (horizon, base, size) => {
  drawBackground(horizon);
  drawSnowman(size, base);
};

const drawBackground = (horizon) => {
  drawFilledRect(0, 0, width, horizon, '#ddeeff');
  drawFilledRect(0, horizon, width, height, 'white');
  drawLine(0, horizon, width, horizon, '#bbb');
};

const drawSnowman = (size, base) => {
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

  drawHead(x, headY, headSize);
  drawTorso(x, torsoY, torsoSize);
  drawButt(x, buttSize, buttY);
};

const drawHead = (x, y, size) => {
  const radius = size / 2;
  drawSnowball(x, y, radius);
  drawEyes(x, radius, y);
  drawNose(x, radius, y);
  drawMouth(x, radius, y);
  drawHat(x, radius, y);
};

const drawSnowball = (x, y, r) => {
  drawCircle(x, y, r + 2, 'black', 3);
  drawFilledCircle(x, y, r, 'white', 3);
};

const drawEyes = (x, headRadius, headY) => {
  const eyeSpacing = headRadius * 0.25;
  drawFilledCircle(x - eyeSpacing, headY - eyeSpacing, 4, 'black');
  drawFilledCircle(x + eyeSpacing, headY - eyeSpacing, 4, 'black');
};

const drawNose = (x, headRadius, headY) => {
  const noseLength = headRadius * 0.8;
  drawFilledTriangle(x, headY, x + noseLength, headY + noseLength * 0.2, x, headY + noseLength * 0.3, 'orange');
};

const drawMouth = (x, headRadius, headY) => {
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (2.1 ** Math.abs(i - 2));
    drawFilledCircle(x - (i - 2.3) * headRadius * 0.21, headY + headRadius * 0.65 + dy, 4, 'black');
  }
};

const drawHat = (x, headRadius, headY) => {
  const brimTop = headY - headRadius * 0.9;
  const brimWidth = headRadius * 2.25;
  const brimHeight = brimWidth * 0.08;
  const hatWidth = brimWidth * 0.7;
  const hatHeight = headRadius * 1.25;
  drawFilledRect(x - brimWidth / 2, brimTop, brimWidth, brimHeight, 'black');
  drawFilledRect(x - hatWidth / 2, brimTop - hatHeight, hatWidth, hatHeight, 'black');
};

const drawTorso = (x, y, size) => {
  const radius = size / 2;
  drawCircle(x, y, radius + 2, 'black', 3);
  drawFilledCircle(x, y, radius, 'white', 3);

  drawArms(x, y, radius);
  drawButtons(x, y, radius);
};

const drawArms = (x, y, r) => {
  drawArm(x, y, r, 1);
  drawArm(x, y, r, -1);
};

const drawArm = (x, y, r, s) => {
  let x1 = x + r * 0.6 * s;
  let x2 = x + r * 2.35 * s;
  drawLine(x1, y - r * 0.25, x2, y - r * 0.85, 'black', 3);
};

const drawButtons = (x, y, r) => {
  for (let i = 0; i < 3; i++) {
    drawFilledCircle(x, y - r * 0.5 + i * r * 0.5, 4, 'black');
  }
};

const drawButt = (x, y, size) => {
  drawSnowball(x, y, size / 2);
};

drawPicture(height * 0.7, height * 0.9, height * 0.7);
