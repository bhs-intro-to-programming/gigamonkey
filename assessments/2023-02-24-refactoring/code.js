
const drawPicture = (horizon, base, size) => {

  // Draw the background
  const drawBackground = () => {
    drawFilledRect(0, 0, width, horizon, '#ddeeff');
    drawFilledRect(0, horizon, width, height, 'white');
    drawLine(0, horizon, width, horizon, '#bbb');
  }
  drawBackground()
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
  const drawHead = (headSize) => {
    const headRadius = headSize / 2;
    drawCircle(x, headY, (headSize / 2) + 2, 'black', 3);
    drawFilledCircle(x, headY, headRadius, 'white', 3);
  }
  drawHead(headSize)
  // Draw the eyes
  const drawEyes = () => {
  const eyeSpacing = (headSize / 2) * 0.25;
  drawFilledCircle(x - eyeSpacing, headY - eyeSpacing, 4, 'black');
  drawFilledCircle(x + eyeSpacing, headY - eyeSpacing, 4, 'black');
  }
  drawEyes()
  // Draw the nose
  const drawNose = () => {
  const noseLength = (headSize / 2) * 0.8;
  drawFilledTriangle(x, headY, x + noseLength, headY + noseLength * 0.2, x, headY + noseLength * 0.3, 'orange');
  }
  drawNose()
  // Draw the mouth
  const drawMouth = () => {
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (2.1 ** Math.abs(i - 2));
    drawFilledCircle(x - (i - 2.3) * (headSize / 2) * 0.21, headY + (headSize / 2) * 0.65 + dy, 4, 'black');
  }
  }
  drawMouth()

  // Draw the hat
  const drawHat = () => {
  const brimTop = headY - (headSize / 2) * 0.9;
  const brimWidth = (headSize / 2) * 2.25;
  const brimHeight = brimWidth * 0.08;
  const hatWidth = brimWidth * 0.7;
  const hatHeight = (headSize / 2) * 1.25;
  drawFilledRect(x - brimWidth / 2, brimTop, brimWidth, brimHeight, 'black');
  drawFilledRect(x - hatWidth / 2, brimTop - hatHeight, hatWidth, hatHeight, 'black');
  }
  drawHat()
  // Draw the torso
  const drawTorso = (torsoSize) => {
  const torsoRadius = torsoSize / 2;
  drawCircle(x, torsoY, torsoRadius + 2, 'black', 3);
  drawFilledCircle(x, torsoY, torsoRadius, 'white', 3);
  }
  drawTorso(torsoSize)
  // Draw the arms
  const drawArms = () => {
  let x1 = x + (torsoSize / 2) * 0.6;
  let x2 = x + (torsoSize / 2) * 2.35;
  drawLine(x1, torsoY - (torsoSize / 2) * 0.25, x2, torsoY - (torsoSize / 2) * 0.85, 'black', 3);
  x1 = x + (torsoSize / 2) * 0.6 * -1;
  x2 = x + (torsoSize / 2) * 2.35 * -1;
  drawLine(x1, torsoY - (torsoSize / 2) * 0.25, x2, torsoY - (torsoSize / 2) * 0.85, 'black', 3);
  }
  drawArms()
  // Draw the buttons
  const drawButtons = () => {
  for (let i = 0; i < 3; i++) {
    drawFilledCircle(x, torsoY - (torsoSize / 2) * 0.5 + i * (torsoSize / 2) * 0.5, 4, 'black');
  }
  }
  drawButtons()

  // Draw the butt
  const drawButt = (buttSize) => {
  const buttRadius = buttSize / 2;
  drawCircle(x, buttY, (buttSize / 2) + 2, 'black', 3);
  drawFilledCircle(x, buttY, (buttSize / 2), 'white', 3);
};
drawButt(buttSize)
}

drawPicture(height * 0.7, height * 0.9, height * 0.7);

