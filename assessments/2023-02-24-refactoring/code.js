const horizonH = height * 0.7
const base = height * 0.9

const halfW = width / 2;
const ratio = [3, 4, 5];
const total = ratio.reduce((tot, p) => tot + p, 0);

const headSize = horizonH * (3 / total);
const torsoSize = horizonH * (4 / total)
const buttSize = horizonH * (5 / total);

const headY = (base - horizonH) + headSize / 2;
const torsoY = headY + headSize / 2 + torsoSize / 2;
const buttY = torsoY + torsoSize / 2 + buttSize / 2;


const torsoRadius = torsoSize / 2;

const headRadius = headSize / 2;



const head = () => { 
  drawCircle(halfW, headY, headRadius + 2, 'black', 3);
  drawFilledCircle(halfW, headY, headRadius, 'white', 3);
}

const eyes = () => {
  const eyeSpacing = headRadius * 0.25;
  drawFilledCircle(halfW - eyeSpacing, headY - eyeSpacing, 4, 'black');
  drawFilledCircle(halfW + eyeSpacing, headY - eyeSpacing, 4, 'black');
}

const nose = () => {
  const noseLength = headRadius * 0.8;
  drawFilledTriangle(halfW, headY, halfW + noseLength, headY + noseLength * 0.2, halfW, headY + noseLength * 0.3, 'orange');
}

const mouth = () => {
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (2.1 ** Math.abs(i - 2));
    drawFilledCircle(halfW - (i - 2.3) * headRadius * 0.21, headY + headRadius * 0.65 + dy, 4, 'black');
  }
}

const hat = () => {
  const brimTop = headY - headRadius * 0.9;
  const brimWidth = headRadius * 2.25;
  const brimHeight = brimWidth * 0.08;
  const hatWidth = brimWidth * 0.7;
  const hatHeight = headRadius * 1.25;
  drawFilledRect(halfW - brimWidth / 2, brimTop, brimWidth, brimHeight, 'black');
  drawFilledRect(halfW - hatWidth / 2, brimTop - hatHeight, hatWidth, hatHeight, 'black');
}


const arms = () => {
  let x1 = halfW + torsoRadius * 0.6;
  let x2 = halfW + torsoRadius * 2.35;
  drawLine(x1, torsoY - torsoRadius * 0.25, x2, torsoY - torsoRadius * 0.85, 'black', 3);
  x1 = halfW + torsoRadius * 0.6 * -1;
  x2 = halfW + torsoRadius * 2.35 * -1;
  drawLine(x1, torsoY - torsoRadius * 0.25, x2, torsoY - torsoRadius * 0.85, 'black', 3);
}

const torsoButtons = () => {
drawCircle(halfW, torsoY, torsoRadius + 2, 'black', 3);
drawFilledCircle(halfW, torsoY, torsoRadius, 'white', 3);
  for (let i = 0; i < 3; i++) {
    drawFilledCircle(halfW, torsoY - torsoRadius * 0.5 + i * torsoRadius * 0.5, 4, 'black');
  }
}  

const butt = () => {
const buttRadius = buttSize / 2;
drawCircle(halfW, buttY, buttRadius + 2, 'black', 3);
drawFilledCircle(halfW, buttY, buttRadius, 'white', 3);
}

const background = () => {
drawFilledRect(0, 0, width, horizonH, '#ddeeff');
  drawFilledRect(0, horizonH, width, height, 'white');
  drawLine(0, horizonH, width, horizonH, '#bbb');
}

background();

butt();

torsoButtons();

arms();

head();

eyes();

nose();

mouth();

hat();