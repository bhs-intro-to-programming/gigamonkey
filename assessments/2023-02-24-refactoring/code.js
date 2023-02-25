  const horizon = height * 0.7
  const base = height * 0.9
  const size = height * 0.8
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
  const headRadius = headSize / 2
  const torsoRadius = torsoSize / 2;

  const drawHead = () => {
    drawCircle(x, headY, headRadius + 2, 'black', 3);
    drawFilledCircle(x, headY, headRadius, 'white', 3);
  }
  drawHead()
  const drawEyes = (eyeSpacing) => {
    drawFilledCircle(x - eyeSpacing, headY - eyeSpacing, 4, 'black');
    drawFilledCircle(x + eyeSpacing, headY - eyeSpacing, 4, 'black');
  }
  drawEyes(headRadius * 0.25)


  const drawNose = (noseLength) => {
    drawFilledTriangle(x, headY, x + noseLength, headY + noseLength * 0.2, x, headY + noseLength * 0.3, 'orange');
  }
  drawNose(headRadius * 0.8)
  const drawMouth = () => {
    for (let i = 0; i < 5; i++) {
      const dy = -2 * (2.1 ** Math.abs(i - 2));
      drawFilledCircle(x - (i - 2.3) * headRadius * 0.21, headY + headRadius * 0.65 + dy, 4, 'black');
    }
  }
  drawMouth()
  const drawHat = (brimTop, brimWidth, hatHeight) => {
    let brimHeight = brimWidth * 0.08;
    let hatWidth = brimWidth * 0.7;
    drawFilledRect(x - brimWidth / 2, brimTop, brimWidth, brimHeight, 'black');
    drawFilledRect(x - hatWidth / 2, brimTop - hatHeight, hatWidth, hatHeight, 'black');
  }
  drawHat(headY - headRadius * 0.9, headRadius * 2.25, headRadius * 1.25)

  const drawTorso = () => {
    drawCircle(x, torsoY, torsoRadius + 2, 'black', 3);
    drawFilledCircle(x, torsoY, torsoRadius, 'white', 3);
  }
  drawTorso()


  const drawArms = (x1, x2) => {
    drawLine(x1, torsoY - torsoRadius * 0.25, x2, torsoY - torsoRadius * 0.85, 'black', 3);
    x1 = x + torsoRadius * 0.6 * -1;
    x2 = x + torsoRadius * 2.35 * -1;
    drawLine(x1, torsoY - torsoRadius * 0.25, x2, torsoY - torsoRadius * 0.85, 'black', 3);
  }
  drawArms(x + torsoRadius * 0.6, x + torsoRadius * 2.35);




  const drawButtons = () => {
    for (let i = 0; i < 3; i++) {
      drawFilledCircle(x, torsoY - torsoRadius * 0.5 + i * torsoRadius * 0.5, 4, 'black');
    }
  }
  drawButtons()
  const drawButt = (buttRadius) => {
    drawCircle(x, buttY, buttRadius + 2, 'black', 3);
    drawFilledCircle(x, buttY, buttRadius, 'white', 3);
  }
  drawButt(buttSize / 2)


