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

const drawPicture = (horizon) => {
  drawbackround(horizon, bigCloudSize, smallCloudSize);
  drawTrees(numTrees, horizon, trunkWidth, trunkHeight, leavesRadius);
  drawSun(sunSize, sunRays, sunRayProportion, sunRayWidth);
}
const sunSize = 100;
const sunRays = 6;
const sunRayProportion = 2;
const sunRayWidth = 7;
const smallCloudSize = 25;
const bigCloudSize = 35;
const numTrees = 5;
const trunkWidth = 20;
const trunkHeight = 55;
const leavesRadius = 40;
const cloudSize = 30;

const drawSun = (sunSize, sunRays, sunRayProportion, sunRayWidth) => {
  drawFilledCircle(width, 0, sunSize, 'yellow');
  const startAngle = (Math.PI / 2) * 0.023;
  const r = ((Math.PI / 2) - 2 * startAngle) / (sunRays - 1);
  for (let i = 0; i < sunRays; i++) {
    const angle = startAngle + Math.PI + (i * r);
    const x2 = width + sunSize * sunRayProportion * Math.cos(angle);
    const y2 = 0 - sunSize * sunRayProportion * Math.sin(angle);
    drawLine(width, 0, x2, y2, 'yellow', sunRayWidth);
  }
}

const drawbackround = (horizon, bigCloudSize, smallCloudSize) => {
  drawFilledRect(0, 0, width, horizon, 'skyblue');
  drawFilledRect(0, horizon, width, horizon, 'green');
  drawBigCloud(bigCloudSize);
  drawSmallCloud(smallCloudSize);
};

const drawBigCloud = (bigCloudSize) => {
  let y = height * 0.2;
  let x = width * 0.5;
  drawCloud(x,y,bigCloudSize);
}

const drawSmallCloud = (smallCloudSize) => {
  let x = width * 0.1;
  let y = height * 0.2;
  drawCloud(x,y,smallCloudSize);
}

const drawCloud = (x,y,cloudSize) => {
  drawFilledCircle(x, y, cloudSize, 'white');
  drawFilledCircle(x + cloudSize * 2.5, y, cloudSize, 'white');
  drawFilledCircle(x + (cloudSize * 1.25), y - cloudSize * 0.5, cloudSize, 'white');
  drawFilledCircle(x + (cloudSize * 1.25), y + cloudSize * 0.5, cloudSize, 'white');
}

const drawTrees = (numTrees, horizon, trunkWidth, trunkHeight, leavesRadius) => {
  const minApples = 5;
  const maxApples = 8;
  const gap = width / (numTrees + 1);
  const treeBaseY = horizon * 1.1;
  for (let i = 0; i < numTrees; i++) {

    const treeBaseX = (i + 1) * gap;
    const leavesX = treeBaseX + trunkWidth / 2;
    const leavesY = treeBaseY - trunkHeight - (leavesRadius - 2);
    const numApples = minApples + Math.floor(Math.random() * (maxApples - minApples));
    drawTrunk(treeBaseX, treeBaseY, trunkWidth, trunkHeight);
    drawLeaves(leavesX, leavesY, leavesRadius);
    drawApples(leavesY, numApples, leavesX);
  }
}

const drawTrunk = (treeBaseX, treeBaseY, trunkWidth, trunkHeight) => {
  drawFilledRect(treeBaseX, treeBaseY - trunkHeight, trunkWidth, trunkHeight, 'sienna');

}

const drawLeaves = (leavesX, leavesY, leavesRadius) => {
  drawFilledCircle(leavesX, leavesY, leavesRadius, 'forestgreen');
}

const drawApples = (leavesY, numApples, leavesX) => {
  const appleRadius = 6;
  let r = appleRadius;
  drawFilledCircle(leavesX + -r / 2 + Math.random() * r, leavesY + -r / 2 + Math.random() * r, r, 'crimson');
  for (let i = 0; i < numApples; i++) {
    const angle = i * ((Math.PI * 2) / numApples);
    const d = leavesRadius - appleRadius * 1.25 - (Math.random() * appleRadius * 2);
    const ax = leavesX + d * Math.cos(angle);
    const ay = leavesY + d * Math.sin(angle);
    drawFilledCircle(ax + -r / 2 + Math.random() * r, ay + -r / 2 + Math.random() * r, r, 'crimson');
  }
}
drawPicture(height * 0.78);
