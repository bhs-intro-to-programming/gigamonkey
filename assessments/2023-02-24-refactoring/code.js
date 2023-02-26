const drawPicture = (horizon, base, size) => {
  drawBackground(horizon);
  drawSnowman(width / 2, size, base, [3, 4, 5]);
};

const drawBackground = (horizon) => {
  drawFilledRect(0, 0, width, horizon, '#ddeeff');
  drawFilledRect(0, horizon, width, height, 'white');
  drawLine(0, horizon, width, horizon, '#bbb');
};

const drawSnowman = (x, size, base, proportions) => {
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
  drawButt(x, buttY, buttSize);
};

const drawHead = (x, y, size) => {
  const radius = size / 2;
  drawSnowball(x, y, radius);
  drawEyes(x, y, radius, 0.25);
  drawNose(x, y, radius);
  drawMouth(x, y,radius);
  drawHat(x, y, radius);
};

const drawSnowball = (x, y, r) => {
  drawCircle(x, y, r + 2, 'black', 3);
  drawFilledCircle(x, y, r, 'white', 3);
};

const drawCoal = (x, y) => {
  drawFilledCircle(x, y, 4, 'black');
}

const drawEyes = (x, y, r, spacing) => {
  const eyeSpacing = r * spacing;
  drawCoal(x - eyeSpacing, y - eyeSpacing);
  drawCoal(x +eyeSpacing, y - eyeSpacing);
};

const drawNose = (x, headY, headRadius) => {
  const noseLength = headRadius * 0.8;
  drawFilledTriangle(x, headY, x + noseLength, headY + noseLength * 0.2, x, headY + noseLength * 0.3, 'orange');
};

const drawMouth = (x, headY, headRadius) => {
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (2.1 ** Math.abs(i - 2));
    drawCoal(x - (i - 2.3) * headRadius * 0.21, headY + headRadius * 0.65 + dy);
  }
};

const drawHat = (x, headY, headRadius) => {
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
  drawSnowball(x, y, radius);
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
    drawCoal(x, y - r * 0.5 + i * r * 0.5);
  }
};

const drawButt = (x, y, size) => {
  drawSnowball(x, y, size / 2);
};

drawPicture(height * 0.7, height * 0.9, height * 0.7);
