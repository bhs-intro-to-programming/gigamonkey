const x = width / 2;
const proportions = [3, 4, 5];
const [headP, torsoP, buttP, size, base, horizon] = proportions;
const total = proportions.reduce((tot, p) => tot + p, 0);


const headSize = size * (headP / total);
const torsoSize = size * (torsoP / total)
const buttSize = size * (buttP / total);

const headY = (base - size) + headSize / 2;
const torsoY = headY + headSize / 2 + torsoSize / 2;
const buttY = torsoY + torsoSize / 2 + buttSize / 2;

const headRadius = headSize / 2;
const torsoRadius = torsoSize / 2;
const eyeSpacing = headRadius * 0.25;
const noseLength = headRadius * 0.8;


// Draw the background
const drawBack = (horizon) => {
  drawFilledRect(0, 0, width, horizon, '#ddeeff');
  drawFilledRect(0, horizon, width, height, 'white');
  drawLine(0, horizon, width, horizon, '#bbb');
}; drawBack(horizon);


// Draw the head
const drawHead = () => {
  drawCircle(x, headY, headRadius + 2, 'black', 3);
  drawFilledCircle(x, headY, headRadius, 'white', 3);
}; drawHead();

// Draw the eyes
const drawEyes = () => {
  drawFilledCircle(x - eyeSpacing, headY - eyeSpacing, 4, 'black');
  drawFilledCircle(x + eyeSpacing, headY - eyeSpacing, 4, 'black');
}; drawEyes();


// Draw the nose
const drawNose = () => {
  drawFilledTriangle(x, headY, x + noseLength, headY + noseLength * 0.2, x, headY + noseLength * 0.3, 'orange');
}; drawNose();

// Draw the mouth
const drawMouth = () => {
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (2.1 ** Math.abs(i - 2));
    drawFilledCircle(x - (i - 2.3) * headRadius * 0.21, headY + headRadius * 0.65 + dy, 4, 'black');
  }
}; drawMouth();

// Draw the hat
const drawHat = () => {
  const brimTop = headY - headRadius * 0.9;
  const brimWidth = headRadius * 2.25;
  const brimHeight = brimWidth * 0.08;
  const hatWidth = brimWidth * 0.7;
  const hatHeight = headRadius * 1.25;
  drawFilledRect(x - brimWidth / 2, brimTop, brimWidth, brimHeight, 'black');
  drawFilledRect(x - hatWidth / 2, brimTop - hatHeight, hatWidth, hatHeight, 'black');
}; drawHat();

// Draw the torso
const drawTorso = () => {
  drawCircle(x, torsoY, torsoRadius + 2, 'black', 3);
  drawFilledCircle(x, torsoY, torsoRadius, 'white', 3);
}; drawTorso();

// Draw the arms
const drawArms = () => {
  let x1 = x + torsoRadius * 0.6;
  let x2 = x + torsoRadius * 2.35;
  drawLine(x1, torsoY - torsoRadius * 0.25, x2, torsoY - torsoRadius * 0.85, 'black', 3);
  x1 = x + torsoRadius * 0.6 * -1;
  x2 = x + torsoRadius * 2.35 * -1;
  drawLine(x1, torsoY - torsoRadius * 0.25, x2, torsoY - torsoRadius * 0.85, 'black', 3);
}; drawArms();

// Draw the buttons
const drawButton = () => {
  for (let i = 0; i < 3; i++) {
    drawFilledCircle(x, torsoY - torsoRadius * 0.5 + i * torsoRadius * 0.5, 4, 'black');
  }
}; drawButton();

// Draw the butt
const drawButt = () => {
  const buttRadius = buttSize / 2;
  drawCircle(x, buttY, buttRadius + 2, 'black', 3);
  drawFilledCircle(x, buttY, buttRadius, 'white', 3);
}; drawButt();

const drawPicture = (horizon) => {
  drawBack(horizon);
  drawHead()
  drawEyes()
  drawMouth()
  drawNose()
  drawArms()
  drawButt()
  drawTorso()
  drawHat()
  drawButton()
};

drawPicture(height * 0.7, height * 0.9, height * 0.7);