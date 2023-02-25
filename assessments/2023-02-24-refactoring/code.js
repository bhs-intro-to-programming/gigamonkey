//The big function was bothering me it doesnt hurt too much to change 6 or so values instead of calling it different also who wants a different size snowman thats not art thats just picky sooooo I guess im just using societal logic
const x = width / 2;
const proportions = [3, 4, 5];
const [headP, torsoP, buttP] = proportions;
const total = proportions.reduce((tot, p) => tot + p, 0);

const headSize = height * 0.7 * (headP / total);
const torsoSize = height * 0.7 * (torsoP / total)
const buttSize = height * 0.7 * (buttP / total);

const headY = (height * 0.9 - height * 0.7) + headSize / 2;
const torsoY = headY + headSize / 2 + torsoSize / 2;
const buttY = torsoY + torsoSize / 2 + buttSize / 2;

const drawBackground = (horizon) => {
  drawFilledRect(0, 0, width, horizon, '#ddeeff');
  drawFilledRect(0, horizon, width, height, 'white');
  drawLine(0, horizon, width, horizon, '#bbb');
}

const drawHead = () => {
  const headRadius = headSize / 2;
  drawCircle(x, headY, headRadius + 2, 'black', 3);
  drawFilledCircle(x, headY, headRadius, 'white', 3);
  return headRadius
}

const drawEyes = (sy, headRadius) => {
  const eyeSpacing = headRadius * 0.25;
  drawFilledCircle(x + eyeSpacing * sy, headY - eyeSpacing, 4, 'black');
}

const drawNose = (headRadius) => {
  const noseLength = headRadius * 0.8;
  drawFilledTriangle(x, headY, x + noseLength, headY + noseLength * 0.2, x, headY + noseLength * 0.3, 'orange');
}

const drawMouth = (headRadius) => {
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (2.1 ** Math.abs(i - 2));
    drawFilledCircle(x - (i - 2.3) * headRadius * 0.21, headY + headRadius * 0.65 + dy, 4, 'black');
  }
}

const drawHat = (headRadius) => {
  const brimTop = headY - headRadius * 0.9;
  const brimWidth = headRadius * 2.25;
  const brimHeight = brimWidth * 0.08;
  const hatWidth = brimWidth * 0.7;
  const hatHeight = headRadius * 1.25;
  drawFilledRect(x - brimWidth / 2, brimTop, brimWidth, brimHeight, 'black');
  drawFilledRect(x - hatWidth / 2, brimTop - hatHeight, hatWidth, hatHeight, 'black');
}

const drawTorso = () => {
  const torsoRadius = torsoSize / 2;
  drawCircle(x, torsoY, torsoRadius + 2, 'black', 3);
  drawFilledCircle(x, torsoY, torsoRadius, 'white', 3);
  return torsoRadius
}

const drawArms = (sy, torsoRadius) => {
  let x1 = x + torsoRadius * 0.6 * sy;
  let x2 = x + torsoRadius * 2.35 * sy;
  const offMiddle = (mul) => torsoY - torsoRadius * mul
  drawLine(x1, offMiddle(0.25), x2, offMiddle(0.85), 'black', 3);
}

const drawButtons = (torsoRadius) => {
  for (let i = 0; i < 3; i++) {
    drawFilledCircle(x, torsoY - torsoRadius * 0.5 + i * torsoRadius * 0.5, 4, 'black');
  }
}

const drawButt = () => {
  const buttRadius = buttSize / 2;
  drawCircle(x, buttY, buttRadius + 2, 'black', 3);
  drawFilledCircle(x, buttY, buttRadius, 'white', 3);
}

const protrusions = (headRadius, torsoRadius) => {
  drawNose(headRadius)
  drawMouth(headRadius)
  drawHat(headRadius)
  drawButtons(torsoRadius)
}

const drawThing = () => {
  drawBackground(height * 0.7)
  const headRadius = drawHead()
  const torsoRadius = drawTorso()
  drawButt()
  for (let i = -1; i < 2; i += 2) {
    drawEyes(i, headRadius)
    drawArms(i, torsoRadius)
  }
  protrusions(headRadius, torsoRadius)
}

drawThing()

//it hurts me that this is more lines than the origional