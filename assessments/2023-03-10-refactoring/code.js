//
// Notes:
//
//  - Factor out all new functions to the top level of the file, i.e. not nested
//    within other functions.
//
//  - Do not introduce any new global variables. Write your new functions to
//    take the values they need as arguments and then pass them when you call
//    the function.
//
//  - When you are done you should still have a drawPicture function and the
//    call to it at the bottom of the file should be unchanged. The thing that
//    should have changed is drawPicture should be much shorter, having been
//    rewritten in terms of new functions you have defined.
//

let sunSize = 100;
let sunRays = 6;
let sunRayProportion = 2;
let sunRayWidth = 7;
let size = 30;
let numTrees = 5;
let trunkWidth = 20;
let trunkHeight = 55;
let leavesRadius = 40;
let minApples = 5;
let maxApples = 8;
let appleRadius = 6;

const drawPicture = (horizon) => {

  drawSky(horizon);

  drawGround(horizon, width);

  drawSun(sunSize);

  drawRays(sunRays, sunSize, sunRayProportion, sunRayWidth);

  drawClouds(size);

  drawTrees(numTrees, horizon, trunkWidth, trunkHeight, leavesRadius, minApples, maxApples, appleRadius);

};

const drawSky = (horizon) => {
  drawFilledRect(0, 0, width, horizon, 'skyblue');
};

const drawGround = (horizon) => {
  drawFilledRect(0, horizon, width, horizon, 'green');
};

const drawSun = (size) => {
  drawFilledCircle(width, 0, size, 'yellow');
};

const drawRays = (rays, sunSize, proportions, rayWidth) => {
  const startAngle = (Math.PI / 2) * 0.023;
  const r = ((Math.PI / 2) - 2 * startAngle) / (rays - 1);
  for (let i = 0; i < rays; i++) {
    const angle = startAngle + Math.PI + (i * r);
    const x2 = width + sunSize * proportions * Math.cos(angle);
    const y2 = 0 - sunSize * proportions * Math.sin(angle);
    drawLine(width, 0, x2, y2, 'yellow', rayWidth);
  }
};

const drawClouds = (size) => {
  // Small Cloud
  let x = width * 0.1;
  let y = height * 0.2;

  cloud(x, y, size, -5)

  // Big Cloud
  x = width * 0.5;

  cloud(x, y, size, 5);
};

const cloud = (x, y, size, sign) => {
  drawFilledCircle(x, y, (size + sign), 'white');
  drawFilledCircle(x + (size + sign) * 2.5, y, (size + sign), 'white');
  drawFilledCircle(x + ((size + sign) * 1.25), y - (size + sign) * 0.5, (size + sign), 'white');
  drawFilledCircle(x + ((size + sign) * 1.25), y + (size + sign) * 0.5, (size + sign), 'white');
};

const drawTrees = (trees, horizon, trunkWidth, trunkHeight, lRadius, min, max, aRadius) => {
  const gap = width / (trees + 1);
  const treeBaseY = horizon * 1.1;
  for (let i = 0; i < trees; i++) {
    // Draw one tree
    const treeBaseX = (i + 1) * gap;
    const leavesX = treeBaseX + trunkWidth / 2;
    const leavesY = treeBaseY - trunkHeight - (lRadius - 2);
    const numApples = min + Math.floor(Math.random() * (max - min));

    // Draw trunk
    drawFilledRect(treeBaseX, treeBaseY - trunkHeight, trunkWidth, trunkHeight, 'sienna');

    // Draw leaves
    drawFilledCircle(leavesX, leavesY, lRadius, 'forestgreen');

    // Draw apples
    let r = aRadius;
    drawFilledCircle(leavesX + -r / 2 + Math.random() * r, leavesY + -r / 2 + Math.random() * r, r, 'crimson');
    for (let i = 0; i < numApples; i++) {
      const angle = i * ((Math.PI * 2) / numApples);
      const d = lRadius - aRadius * 1.25 - (Math.random() * aRadius * 2);
      const ax = leavesX + d * Math.cos(angle);
      const ay = leavesY + d * Math.sin(angle);
      drawFilledCircle(ax + -r / 2 + Math.random() * r, ay + -r / 2 + Math.random() * r, r, 'crimson');
    }
  }
};
drawPicture(height * 0.78);
