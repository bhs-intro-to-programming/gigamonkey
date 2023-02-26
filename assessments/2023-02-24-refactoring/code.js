const drawPicture = (horizon, base, size) => {
  drawBackground(width, horizon);
  drawSnowman(width, base, size);
};

const drawBackground = (width, horizon) => {
  drawFilledRect(0, 0, width, horizon, '#ddeeff');
  drawFilledRect(0, horizon, width, height, 'white');
  drawLine(0, horizon, width, horizon, '#bbb');
};

const drawSnowman = (width, base, size) => {
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
  drawButt(x, buttY, buttSize);
};

const drawHead = (x, y, size) => {
  const radius = size / 2;
  drawCircle(x, y, radius + 2, 'black', 3);
  drawFilledCircle(x, y, radius, 'white', 3);

  drawEyes(x, y, radius);
  drawNose(x, y, radius);
  drawMouth(x, y, radius);
  drawHat(x, y, radius);
};

const drawEyes = (x, y, radius) => {
  const eyeSpacing = radius * 0.25;
  drawFilledCircle(x - eyeSpacing, y - eyeSpacing, 4, 'black');
  drawFilledCircle(x + eyeSpacing, y - eyeSpacing, 4, 'black');
};

const drawNose = (x, y, radius) => {
  const noseLength = radius * 0.8;
  drawFilledTriangle(x, y, x + noseLength, y + noseLength * 0.2, x, y + noseLength * 0.3, 'orange');
};

const drawMouth = (x, y, radius) => {
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (2.1 ** Math.abs(i - 2));
    drawFilledCircle(x - (i - 2.3) * radius * 0.21, y + radius * 0.65 + dy, 4, 'black');
  }
};

const drawHat = (x, y, radius) => {
  const brimTop = y - radius * 0.9;
  const brimWidth = radius * 2.25;
  const brimHeight = brimWidth * 0.08;
  const hatWidth = brimWidth * 0.7;
  const hatHeight = radius * 1.25;
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

const drawArms = (x, y, radius) => {
  drawArm1(x, y, radius);
  let x1 = x + radius * 0.6 * -1;
  let x2 = x + radius * 2.35 * -1;
  drawLine(x1, y - radius * 0.25, x2, y - radius * 0.85, 'black', 3);
};

const drawArm1 = (x, y, radius) => {
  let x1 = x + radius * 0.6 * 1;
  let x2 = x + radius * 2.35 * 1;
  drawLine(x1, y - radius * 0.25, x2, y - radius * 0.85, 'black', 3);
}

const drawButtons = (x, y, radius) => {
  for (let i = 0; i < 3; i++) {
    drawFilledCircle(x, y - radius * 0.5 + i * radius * 0.5, 4, 'black');
  }
};

const drawButt = (x, y, size) => {
  const radius = size / 2;
  drawCircle(x, y, radius + 2, 'black', 3);
  drawFilledCircle(x, y, radius, 'white', 3);
}

drawPicture(height * 0.7, height * 0.9, height * 0.7);
