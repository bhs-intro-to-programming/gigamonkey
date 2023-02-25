
// Draw the background
const backGround = (horizon) => {

  drawFilledRect(0, 0, width, horizon, '#ddeeff');
  drawFilledRect(0, horizon, width, height, 'white');
  drawLine(0, horizon, width, horizon, '#bbb');
}

// Draw the snowman
const drawSnowMan = (base, size) => {
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

  const torsoObj = { size: torsoSize, y: torsoY, radius: torsoSize / 2 }

  const headObj = { size: headSize, y: headY, radius: headSize / 2 };

  const buttObj = { size: buttSize, y: buttY, radius: buttSize / 2 }
  
  head(headObj, x);
  eyes(headObj, x);
  nose(headObj, x);
  mouth(headObj, x);
  hat(headObj, x);
  torso(torsoObj, x);
  arms(torsoObj, x);
  buttons(torsoObj, x);
  butt(buttObj, x);
};
// Draw the head
const head = (headObj, x) => {
  drawCircle(x, headObj.y, headObj.radius + 2, 'black', 3);
  drawFilledCircle(x, headObj.y, headObj.radius, 'white', 3);
}

// Draw the eyes
const eyes = (headObj, x) => {
  const eyeSpacing = headObj.radius * 0.25;
  drawFilledCircle(x - eyeSpacing, headObj.y - eyeSpacing, 4, 'black');
  drawFilledCircle(x + eyeSpacing, headObj.y - eyeSpacing, 4, 'black');
}

// Draw the nose
const nose = (headObj, x) => {
  const noseLength = headObj.radius * 0.8;
  drawFilledTriangle(x, headObj.y, x + noseLength, headObj.y + noseLength * 0.2, x, headObj.y + noseLength * 0.3, 'orange');
}
// Draw the mouth
const mouth = (headObj, x) => {
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (2.1 ** Math.abs(i - 2));
    drawFilledCircle(x - (i - 2.3) * headObj.radius * 0.21, headObj.y + headObj.radius * 0.65 + dy, 4, 'black');
  }
}

// Draw the hat
const hat = (headObj, x) => {
  const brimTop = headObj.y - headObj.radius * 0.9;
  const brimWidth = headObj.radius * 2.25;
  const brimHeight = brimWidth * 0.08;
  const hatWidth = brimWidth * 0.7;
  const hatHeight = headObj.radius * 1.25;
  drawFilledRect(x - brimWidth / 2, brimTop, brimWidth, brimHeight, 'black');
  drawFilledRect(x - hatWidth / 2, brimTop - hatHeight, hatWidth, hatHeight, 'black');
};
// Draw the torso
const torso = (torsoObj, x) => {
  drawCircle(x, torsoObj.y, torsoObj.radius + 2, 'black', 3);
  drawFilledCircle(x, torsoObj.y, torsoObj.radius, 'white', 3);
}
// Draw the arms
const arms = (torsoObj, x) => {
  let x1 = x + torsoObj.radius * 0.6;
  let x2 = x + torsoObj.radius * 2.35;
  drawLine(x1, torsoObj.y - torsoObj.radius * 0.25, x2, torsoObj.y - torsoObj.radius * 0.85, 'black', 3);
  x1 = x + torsoObj.radius * 0.6 * -1;
  x2 = x + torsoObj.radius * 2.35 * -1;
  drawLine(x1, torsoObj.y - torsoObj.radius * 0.25, x2, torsoObj.y - torsoObj.radius * 0.85, 'black', 3);
}
// Draw the buttons
const buttons = (torsoObj, x) => {
  for (let i = 0; i < 3; i++) {
    drawFilledCircle(x, torsoObj.y - torsoObj.radius * 0.5 + i * torsoObj.radius * 0.5, 4, 'black');
  }
}
// Draw the butt
const butt = (buttObj, x) => {
  drawCircle(x, buttObj.y, buttObj.radius + 2, 'black', 3);
  drawFilledCircle(x, buttObj.y, buttObj.radius, 'white', 3);
}
const drawPicture = (horizon, base, size) => {
  backGround(horizon);
  drawSnowMan(base, size);
}
drawPicture(height * 0.7, height * 0.9, height * 0.7);
