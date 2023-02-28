const snowBall = (x, y, radius) => {
  drawCircle(x, y, radius + 2, 'black', 3);
  drawFilledCircle(x, y, radius, 'white', 3);
};


const drawHead = (x, headY, headSize) => {
  const headRadius = headSize / 2;
  // Draw the head
  snowBall(x, headY, headRadius);


  // Draw the eyes
  const eyeSpacing = headRadius * 0.25;
  drawFilledCircle(x - eyeSpacing, headY - eyeSpacing, 4, 'black');
  drawFilledCircle(x + eyeSpacing, headY - eyeSpacing, 4, 'black');


  // Draw the nose
  const noseLength = headRadius * 0.8;
  drawFilledTriangle(x, headY, x + noseLength, headY + noseLength * 0.2, x, headY + noseLength * 0.3, 'orange');


  // Draw the mouth
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (2.1 ** Math.abs(i - 2));
    drawFilledCircle(x - (i - 2.3) * headRadius * 0.21, headY + headRadius * 0.65 + dy, 4, 'black');
  }


  // Draw the hat
  const brimTop = headY - headRadius * 0.9;
  const brimWidth = headRadius * 2.25;
  const brimHeight = brimWidth * 0.08;
  const hatWidth = brimWidth * 0.7;
  const hatHeight = headRadius * 1.25;
  drawFilledRect(x - brimWidth / 2, brimTop, brimWidth, brimHeight, 'black');
  drawFilledRect(x - hatWidth / 2, brimTop - hatHeight, hatWidth, hatHeight, 'black');
};


const drawArm = (x, y, radius, direction) => {
  let x1 = x + radius * 0.6 * direction;
  let x2 = x + radius * 2.35 * direction;
  /*
  // why doesn't this work?
  let x1 = x + radius * 0.6;
  let x2 = x + radius * 2.35;
  if (isLeftArm) {
    x1 = x1 * -1;
    x2 = x2 * -1;
  }
  */

  drawLine(x1, y - radius * 0.25, x2, y - radius * 0.85, 'black', 3);
};


const drawTorso = (x, torsoY, torsoSize) => {
  const torsoRadius = torsoSize / 2;
  // Draw the torso
  snowBall(x, torsoY, torsoRadius);


  // Draw the arms
  drawArm(x, torsoY, torsoRadius, 1);
  drawArm(x, torsoY, torsoRadius, -1);
 
  // Draw the buttons
  for (let i = 0; i < 3; i++) {
    drawFilledCircle(x, torsoY - torsoRadius * 0.5 + i * torsoRadius * 0.5, 4, 'black');
  }
};


const drawPicture = (horizon, base, size) => {


  // Draw the background
  drawFilledRect(0, 0, width, horizon, '#ddeeff');
  drawFilledRect(0, horizon, width, height, 'white');
  drawLine(0, horizon, width, horizon, '#bbb');


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
  drawHead(x, headY, headSize);


  // Draw the torso
  drawTorso(x, torsoY, torsoSize);


  // Draw the butt
  snowBall(x, buttY, buttSize / 2);
};


drawPicture(height * 0.7, height * 0.9, height * 0.7);

//I don't know crazy I'm supposed to go with the refactoring, so I just spent like 30 mins working on it and doing a reasonable amount. 
//I refactored the different sections of the snowman which I thought was enough to show that I know how to refactor code. 

