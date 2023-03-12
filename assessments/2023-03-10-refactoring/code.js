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

const drawSky = (horizon) => {
  drawFilledRect(0, 0, width, horizon, 'skyblue');
}

const drawGround = (horizon) => {
  drawFilledRect(0, horizon, width, horizon, 'green');
}

const drawSun = (sunSize) => {
  drawSunRays(100, 2, 6, 7)
  drawFilledCircle(width, 0, sunSize, 'yellow');
}

const drawSunRays = (sunSize, sunRayProportion, sunRays, sunRayWidth) => {
  let startAngle = (Math.PI / 2) * 0.023;
  let r = ((Math.PI / 2) - 2 * startAngle) / (sunRays - 1);
  for (let i = 0; i < sunRays; i++) {
    let angle = startAngle + Math.PI + (i * r);
    let x2 = width + sunSize * sunRayProportion * Math.cos(angle);
    let y2 = 0 - sunSize * sunRayProportion * Math.sin(angle);
    drawLine(width, 0, x2, y2, 'yellow', sunRayWidth);
  }
}

const drawClouds = () => {
  let y = height * 0.2;
  drawCloud(width * 0.1, y, 25)
  drawCloud(width * 0.5, y, 35)
}

const drawCloud = (x, y, cloudSize) => {
  drawFilledCircle(x, y, cloudSize, 'white');
  drawFilledCircle(x + cloudSize * 2.5, y, cloudSize, 'white');
  drawFilledCircle(x + (cloudSize * 1.25), y - cloudSize * 0.5, cloudSize, 'white');
  drawFilledCircle(x + (cloudSize * 1.25), y + cloudSize * 0.5, cloudSize, 'white');
}

const drawTree = (treeBaseX, treeBaseY, minApples, maxApples) => {
  let trunkWidth = 20;
  let trunkHeight = 55;
  let numApples = minApples + Math.floor(Math.random() * (maxApples - minApples));
  let leavesX = treeBaseX + trunkWidth / 2;
  let leavesRadius = 40;
  let leavesY = treeBaseY - trunkHeight - (leavesRadius - 2);
  drawTrunk(treeBaseX, treeBaseY, trunkHeight, trunkWidth)
  drawLeaves(leavesX, leavesY, leavesRadius)
  drawApples(leavesX, leavesY, numApples, leavesRadius)
}

const drawTrunk = (treeBaseX, treeBaseY, trunkHeight, trunkWidth) => {
  drawFilledRect(treeBaseX, treeBaseY - trunkHeight, trunkWidth, trunkHeight, 'sienna');
}

const drawLeaves = (leavesX, leavesY, leavesRadius) => {
  drawFilledCircle(leavesX, leavesY, leavesRadius, 'forestgreen');
}

const drawApples = (leavesX, leavesY, numApples, leavesRadius) => {
  const appleRadius = 6;
  drawRadialApples(leavesX, leavesY, numApples, leavesRadius, appleRadius)
  drawCenterApple(leavesX, leavesY, appleRadius)
}

const drawCenterApple = (leavesX, leavesY, appleRadius) => {
  drawFilledCircle(leavesX + -appleRadius / 2 + Math.random() * appleRadius, leavesY + -appleRadius / 2 + Math.random() * appleRadius, appleRadius, 'crimson');

}

const drawRadialApples = (leavesX, leavesY, numApples, leavesRadius, appleRadius) => {
  for (let i = 0; i < numApples; i++) {
    const angle = i * ((Math.PI * 2) / numApples);
    const d = leavesRadius - appleRadius * 1.25 - (Math.random() * appleRadius * 2);
    const ax = leavesX + d * Math.cos(angle);
    const ay = leavesY + d * Math.sin(angle);
    drawFilledCircle(ax + -appleRadius / 2 + Math.random() * appleRadius, ay + -appleRadius / 2 + Math.random() * appleRadius, appleRadius, 'crimson');
  }
}

const drawBackground = (horizon) => {
  drawSky(horizon)
  drawGround(horizon)
  drawSun(100)
  drawClouds()
}

const drawTrees = (horizon) => {
  let numTrees = 5;
  let minApples = 5;
  let maxApples = 8;
  let gap = width / (numTrees + 1);
  for (let i = 0; i < numTrees; i++) {
    let treeBaseY = horizon * 1.1;
    let treeBaseX = (i + 1) * gap;
    drawTree(treeBaseX, treeBaseY, minApples, maxApples)
  }
}

const drawPicture = (horizon) => {
  drawBackground(horizon)
  drawTrees(horizon)
};

drawPicture(height * 0.78);
