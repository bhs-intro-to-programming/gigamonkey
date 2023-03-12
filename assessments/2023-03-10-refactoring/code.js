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

const drawSun = () => {
  const size = 100
  drawFilledCircle(width, 0, size, 'yellow');
  drawRays()
}

const drawRays = () => {
  let size = 100;
  let ray = 6;
  let rayProportion = 2;
  let rayWidth = 7;
  const startAngle = (Math.PI / 2) * 0.023;
  const f = ((Math.PI / 2) - 2 * startAngle) / (ray - 1);
  for (let i = 0; i < ray; i++) {
    const angle = startAngle + Math.PI + (i * f);
    let x2 = width + size * rayProportion * Math.cos(angle);
    let y2 = 0 - size * rayProportion * Math.sin(angle);
    drawLine(width, 0, x2, y2, 'yellow', rayWidth);

  }
}

const drawSmallCloud = (width, height) => {
  let size = 25;
  let x = width * 0.1;
  let y = height * 0.2;
  drawFilledCircle(x, y, size, 'white');
  drawFilledCircle(x + size * 2.5, y, size, 'white');
  drawFilledCircle(x + (size * 1.25), y - size * 0.5, size, 'white');
  drawFilledCircle(x + (size * 1.25), y + size * 0.5, size, 'white');
}

const drawBigCloud = (height, width) => {
  const bigCloudSize = 35;
  let x = width * 0.1;
  let y = height * 0.2;
  drawFilledCircle(x, y, bigCloudSize, 'white');
  drawFilledCircle(x + bigCloudSize * 2.5, y, bigCloudSize, 'white');
  drawFilledCircle(x + (bigCloudSize * 1.25), y - bigCloudSize * 0.5, bigCloudSize, 'white');
  drawFilledCircle(x + (bigCloudSize * 1.25), y + bigCloudSize * 0.5, bigCloudSize, 'white');
}

const drawBack = (horizon) => {
  drawFilledRect(0, 0, width, horizon, 'skyblue');

  // Draw ground
  drawFilledRect(0, horizon, width, horizon, 'green');
}

const drawLeaves = (horizon) => {
  const leavesRadius = 40;
  for (let i = 0; i < 5; i++) {
    const treeBaseX = (i + 1) * width / (5 + 1);
    const leavesX = treeBaseX + 20 / 2;
    const treeBaseY = horizon * 1.1;
    const leavesY = treeBaseY - 55 - (leavesRadius - 2);
    drawFilledCircle(leavesX, leavesY, leavesRadius, 'forestgreen');
  }
}

const drawTrees = (horizon) => {

  drawLeaves(horizon * .78);

  const numTrees = 5;
  const trunkWidth = 20;
  const trunkHeight = 55;
  const minApples = 5;
  const maxApples = 8;
  const appleRadius = 6;

  const gap = width / (numTrees + 1);
  const treeBaseY = horizon * 1.1;
  const leavesRadius = 40;

  for (let i = 0; i < numTrees; i++) {
    const treeBaseX = (i + 1) * gap;
    const leavesX = treeBaseX + trunkWidth / 2;
    const leavesY = treeBaseY - trunkHeight - (leavesRadius - 2);
    const numApples = minApples + Math.floor(Math.random() * (maxApples - minApples));
    //trunk
    drawFilledRect(treeBaseX, treeBaseY - trunkHeight, trunkWidth, trunkHeight, 'sienna');



    // Draw apples
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
};
drawBack(height * 0.78);
drawSun();
drawBigCloud(height, width);
drawSmallCloud(height, width);
drawTrees(height * .78) 