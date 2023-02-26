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

  drawHead(x, headY, headSize);
  drawTorso(x, torsoY, torsoSize);
  drawButt(x, buttY, buttSize);
};

const drawHead = (x, y, size) => {
  const r = size / 2;
  drawCircle(x, y, r + 2, 'black', 3);
  drawFilledCircle(x, y, r, 'white', 3);

  drawEyes(x, y, r);
  drawNose(x, y, r);

  // Draw the nose
  const noseLength = r * 0.8;
  drawFilledTriangle(x, y, x + noseLength, y + noseLength * 0.2, x, y + noseLength * 0.3, 'orange');

  // Draw the mouth
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (2.1 ** Math.abs(i - 2));
    drawFilledCircle(x - (i - 2.3) * r * 0.21, y + r * 0.65 + dy, 4, 'black');
  }

  // Draw the hat
  const brimTop = y - r * 0.9;
  const brimWidth = r * 2.25;
  const brimHeight = brimWidth * 0.08;
  const hatWidth = brimWidth * 0.7;
  const hatHeight = r * 1.25;
  drawFilledRect(x - brimWidth / 2, brimTop, brimWidth, brimHeight, 'black');
  drawFilledRect(x - hatWidth / 2, brimTop - hatHeight, hatWidth, hatHeight, 'black');
};

const drawEyes = (x, y, r) => {
  const eyeSpacing = r * 0.25;
  drawFilledCircle(x - eyeSpacing, y - eyeSpacing, 4, 'black');
  drawFilledCircle(x + eyeSpacing, y - eyeSpacing, 4, 'black');
};

const drawNose = (x, y, r)=> {
  const noseLength = r * 0.8;
  drawFilledTriangle(x, y, x + noseLength, y + noseLength * 0.2, x, y + noseLength * 0.3, 'orange');

}

const drawTorso = (x, y, size) => {
  const torsoRadius = size / 2;
  drawCircle(x, y, torsoRadius + 2, 'black', 3);
  drawFilledCircle(x, y, torsoRadius, 'white', 3);

  // Draw the arms
  let x1 = x + torsoRadius * 0.6;
  let x2 = x + torsoRadius * 2.35;
  drawLine(x1, y - torsoRadius * 0.25, x2, y - torsoRadius * 0.85, 'black', 3);
  x1 = x + torsoRadius * 0.6 * -1;
  x2 = x + torsoRadius * 2.35 * -1;
  drawLine(x1, y - torsoRadius * 0.25, x2, y - torsoRadius * 0.85, 'black', 3);

  // Draw the buttons
  for (let i = 0; i < 3; i++) {
    drawFilledCircle(x, y - torsoRadius * 0.5 + i * torsoRadius * 0.5, 4, 'black');
  }
};

const drawButt = (x, y, size) => {
  const buttRadius = size / 2;
  drawCircle(x, y, buttRadius + 2, 'black', 3);
  drawFilledCircle(x, y, buttRadius, 'white', 3);
};

drawPicture(height * 0.7, height * 0.9, height * 0.7);
