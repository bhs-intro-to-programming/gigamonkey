const drawPicture = (horizon, base, size) => {
  drawBackground(horizon);
  drawSnowman(base, size);
};

const drawBackground = (horizon) => {
  drawFilledRect(0, 0, width, horizon, '#ddeeff');
  drawFilledRect(0, horizon, width, height, 'white');
  drawLine(0, horizon, width, horizon, '#bbb');
};

const drawSnowman = (base, size) => {
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

  drawHead(x, headY, headSize / 2);
  drawTorso(x, torsoY, torsoSize / 2);
  drawButt(x, buttY, buttSize / 2);
};

const drawSnowball = (x, y, r) => {
  drawCircle(x, y, r + 2, 'black', 3);
  drawFilledCircle(x, y, r, 'white', 3);
}

const drawHead = (x, y, r) => {
  drawSnowball(x, y, r);
  drawEyes(x, y, r);
  drawNose(x, y, r);
  drawMouth(x, y, r);
  drawHat(x, y, r);
};

const drawEyes = (x, y, r) => {
  const eyeSpacing = r * 0.25;
  drawFilledCircle(x - eyeSpacing, y - eyeSpacing, 4, 'black');
  drawFilledCircle(x + eyeSpacing, y - eyeSpacing, 4, 'black');
};

const drawNose = (x, y, r) => {
  const noseLength = r * 0.8;
  drawFilledTriangle(x, y, x + noseLength, y + noseLength * 0.2, x, y + noseLength * 0.3, 'orange');
};

const drawMouth = (x, y, r) => {
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (2.1 ** Math.abs(i - 2));
    drawFilledCircle(x - (i - 2.3) * r * 0.21, y + r * 0.65 + dy, 4, 'black');
  }
};

const drawHat = (x, y, r) => {
  const brimTop = y - r * 0.9;
  const brimWidth = r * 2.25;
  const brimHeight = brimWidth * 0.08;
  const hatWidth = brimWidth * 0.7;
  const hatHeight = r * 1.25;
  drawFilledRect(x - brimWidth / 2, brimTop, brimWidth, brimHeight, 'black');
  drawFilledRect(x - hatWidth / 2, brimTop - hatHeight, hatWidth, hatHeight, 'black');
};

const drawTorso = (x, y, r) => {
  drawSnowball(x, y, r);
  drawArms(x, y, r);
  drawButtons(x, y, r);

};

const drawArms = (x, y, r) => {
  let x1 = x + r * 0.6;
  let x2 = x + r * 2.35;
  drawLine(x1, y - r * 0.25, x2, y - r * 0.85, 'black', 3);
  x1 = x + r * 0.6 * -1;
  x2 = x + r * 2.35 * -1;
  drawLine(x1, y - r * 0.25, x2, y - r * 0.85, 'black', 3);
};

const drawButtons = (x, y, r) => {
  for (let i = 0; i < 3; i++) {
    drawFilledCircle(x, y - r * 0.5 + i * r * 0.5, 4, 'black');
  }
};

const drawButt = (x, y, r) => {
  drawSnowball(x, y, r);
};

drawPicture(height * 0.7, height * 0.9, height * 0.7);
