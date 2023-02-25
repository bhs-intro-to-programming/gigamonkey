const x = width / 2;

const drawHead = (headY, headRadius) => {
  drawCircle(x, headY, headRadius + 2, 'black', 3);
  drawFilledCircle(x, headY, headRadius, 'white', 3);
}

const drawBackground = (horizon) => {
  drawFilledRect(0, 0, width, horizon, '#ddeeff');
  drawFilledRect(0, horizon, width, height, 'white');
  drawLine(0, horizon, width, horizon, '#bbb');
}

const drawEyes = (eyeSpacing, headY) => {
  drawFilledCircle(x - eyeSpacing, headY - eyeSpacing, 4, 'black');
  drawFilledCircle(x + eyeSpacing, headY - eyeSpacing, 4, 'black');
}

const drawNose = (noseLength, headY) => {
  drawFilledTriangle(x, headY, x + noseLength, headY + noseLength * 0.2, x, headY + noseLength * 0.3, 'orange');
}

const drawMouth = (headRadius, headY) => {
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (2.1 ** Math.abs(i - 2));
    drawFilledCircle(x - (i - 2.3) * headRadius * 0.21, headY + headRadius * 0.65 + dy, 4, 'black');
  }
}

const drawHat = (brimTop, brimWidth, headRadius) => {
  const hatWidth = brimWidth * 0.7;
  const hatHeight = headRadius * 1.25;
  drawFilledRect(x - brimWidth / 2, brimTop, brimWidth, brimWidth * 0.08, 'black');
  drawFilledRect(x - hatWidth / 2, brimTop - hatHeight, hatWidth, hatHeight, 'black');
}
const drawTorso = (torsoY, torsoRadius) => {
  drawCircle(x, torsoY, torsoRadius + 2, 'black', 3);
  drawFilledCircle(x, torsoY, torsoRadius, 'white', 3);
}

const drawArms = (torsoRadius, torsoY) => {
  let x1 = x + torsoRadius * 0.6;
  let x2 = x + torsoRadius * 2.35;
  drawLine(x1, torsoY - torsoRadius * 0.25, x2, torsoY - torsoRadius * 0.85, 'black', 3);
  x1 = x + torsoRadius * 0.6 * -1;
  x2 = x + torsoRadius * 2.35 * -1;
  drawLine(x1, torsoY - torsoRadius * 0.25, x2, torsoY - torsoRadius * 0.85, 'black', 3);
}

const drawButtons = (torsoY, torsoRadius) => {
  for (let i = 0; i < 3; i++) {
    drawFilledCircle(x, torsoY - torsoRadius * 0.5 + i * torsoRadius * 0.5, 4, 'black');
  }
}

const drawButt = (buttSize, torsoY, torsoSize) => {
  const buttY = torsoY + torsoSize / 2 + buttSize / 2;
  const buttRadius = buttSize / 2;
  drawCircle(x, buttY, buttRadius + 2, 'black', 3);
  drawFilledCircle(x, buttY, buttRadius, 'white', 3);
}

const drawPicture = (horizon, base, size, proportions) => {

  const total = proportions.reduce((tot, p) => tot + p, 0);

  const headSize = size * (proportions[0] / total);
  const torsoSize = size * (proportions[1] / total)
  const buttSize = size * (proportions[2] / total);

  const headY = (base - size) + headSize / 2;
  const torsoY = headY + headSize / 2 + torsoSize / 2;
  const torsoRadius = torsoSize / 2;
  const headRadius = headSize / 2;

  //draw the background
  drawBackground(horizon)

  // Draw the head
  drawHead(headY, headRadius)

  // Draw the eyes
  drawEyes(headRadius * 0.25, headY)

  // Draw the nose
  drawNose(headRadius * 0.8, headY)

  // Draw the mouth
  drawMouth(headRadius, headY)

  // Draw the hat
  drawHat(headY - headRadius * 0.9, headRadius * 2.25, headRadius)

  // Draw the torso
  drawTorso(torsoY, torsoRadius)

  // Draw the arms
  drawArms(torsoRadius, torsoY)

  // Draw the buttons
  drawButtons(torsoY, torsoRadius)

  // Draw the butt
  drawButt(buttSize, torsoY, torsoSize)
};

drawPicture(height * 0.7, height * 0.9, height * 0.7, [3, 4, 5]);
