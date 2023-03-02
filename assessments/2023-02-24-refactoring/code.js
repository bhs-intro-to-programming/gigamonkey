const drawPicture = (horizon, base, size) => {
drawBackground(width,horizon);
drawSnowman(width,base,size);
};

const drawBackground =(width,horizon)=>{
  drawFilledRect(0, 0, width, horizon, '#ddeeff');
  drawFilledRect(0, horizon, width, height, 'white');
  drawLine(0, horizon, width, horizon, '#bbb');
};

const drawSnowman = (width,base,size)=> {
  const x = width / 2;
  const proportions = [3, 4, 5];
  const [headP, torsoP, buttP] = proportions;
  const total = proportions.reduce((tot, p) => tot + p, 0);

  const headSize = size * (headP / total);
  const torsoSize = size * (torsoP / total)
  const buttSize = size * (buttP / total);

  const y = (base - size) + headSize / 2;
  const torsoY = y + headSize / 2 + torsoSize / 2;
  const buttY = torsoY + torsoSize / 2 + buttSize / 2;

  drawHead(x, y , headSize);
  drawTorso(x ,torsoY , torsoSize);
  drawButt(x ,buttY , buttSize);
};
const drawHead = (x, y ,headSize) => {
    const headRadius = headSize / 2;
  drawCircle(x, y, headRadius + 2, 'black', 3);
  drawFilledCircle(x, y, headRadius, 'white', 3);

drawEyes(x, y , headRadius);
drawNose(x , y ,headRadius);
drawMouth(x,y,headRadius);
drawHat(x, y ,headRadius);
};

const drawEyes = (x, y , headRadius) => {
  const eyeSpacing = headRadius * 0.25;
  drawFilledCircle(x - eyeSpacing, y - eyeSpacing, 4, 'black');
  drawFilledCircle(x + eyeSpacing, y - eyeSpacing, 4, 'black');
}

const drawNose = (x , y ,headRadius) => {
  const noseLength = headRadius * 0.8;
  drawFilledTriangle(x, y, x + noseLength, y + noseLength * 0.2, x, y + noseLength * 0.3, 'orange');
}

const drawMouth = (x,y,headRadius) => {
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (2.1 ** Math.abs(i - 2));
    drawFilledCircle(x - (i - 2.3) * headRadius * 0.21, y + headRadius * 0.65 + dy, 4, 'black');
  }
};

const drawHat = (x ,y ,headRadius) => {
  const brimTop = y - headRadius * 0.9;
  const brimWidth = headRadius * 2.25;
  const brimHeight = brimWidth * 0.08;
  const hatWidth = brimWidth * 0.7;
  const hatHeight = headRadius * 1.25;
  drawFilledRect(x - brimWidth / 2, brimTop, brimWidth, brimHeight, 'black');
  drawFilledRect(x - hatWidth / 2, brimTop - hatHeight, hatWidth, hatHeight, 'black');
};


const drawTorso= (x ,torsoY , torsoSize) => {
  const torsoRadius = torsoSize / 2;
  drawCircle(x, torsoY, torsoRadius + 2, 'black', 3);
  drawFilledCircle(x, torsoY, torsoRadius, 'white', 3);

drawArms(x,torsoY ,torsoRadius);
drawButtons(x ,torsoY ,torsoRadius);


};


const drawArms =(x,torsoY, torsoRadius) => {
  drawArm1(x, torsoY , torsoRadius ,1);
  drawArm1(x, torsoY , torsoRadius,- 1);
};

const drawArm1 = (x, torsoY , torsoRadius ,sign) => {
  let x1 = x + torsoRadius * 0.6 * sign;
  let x2 = x + torsoRadius * 2.35 * sign;
  drawLine(x1, torsoY - torsoRadius * 0.25, x2, torsoY - torsoRadius * 0.85, 'black', 3);
}

const drawButtons = (x ,torsoY , torsoRadius) => {
    
  for (let i = 0; i < 3; i++) {
    drawFilledCircle(x, torsoY - torsoRadius * 0.5 + i * torsoRadius * 0.5, 4, 'black');
  }
}

const drawButt =(x ,buttY , buttSize) => {
  const buttRadius = buttSize / 2;
  drawCircle(x, buttY, buttRadius + 2, 'black', 3);
  drawFilledCircle(x, buttY, buttRadius, 'white', 3);
};

drawPicture(height * 0.7, height * 0.9, height * 0.7);