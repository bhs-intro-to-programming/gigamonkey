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
const minApples = 5;
const maxApples = 8;
const appleRadius = 6;

const sun = (width, size, ray, rP, rW) => {
  drawFilledCircle(width, 0, size, 'yellow');
  rays(width, size, ray, rP, rW)

}

const rays = (width, sunSize, ray, rayProp, rayW) => {
  const startAngle = (Math.PI / 2) * 0.023;
  const r = ((Math.PI / 2) - 2 * startAngle) / (ray - 1);
  for (let i = 0; i < ray; i++) {
    const angle = startAngle + Math.PI + (i * r);
    const x2 = width + sunSize * rayProp * Math.cos(angle);
    const y2 = 0 - sunSize * rayProp * Math.sin(angle);
    drawLine(width, 0, x2, y2, 'yellow', rayW);
  }
}

const ground = (width, horizon) => {
  drawFilledRect(0, horizon, width, horizon, 'green');
}

const sky = (width, horizon) => {
  drawFilledRect(0, 0, width, horizon, 'skyblue');
}

const clouds = (width, height, smallCloudSize, bigCloudSize) => {
  smallCloud(width, height, smallCloudSize)
  bigCloud(width, bigCloudSize)
}

const smallCloud = (width, height, smallCloudSize) => {
  cloudCircles(width * 0.1, height * 0.2, smallCloudSize)
}

const bigCloud = (width, bigCloudSize) => {
  cloudCircles(width * 0.5, width * 0.2, bigCloudSize)
}

const cloudCircles = (cX, cY, cloudSize) => {
  const x = cX
  const y = cY
  drawFilledCircle(x, y, cloudSize, 'white');
  drawFilledCircle(x + cloudSize * 2.5, y, cloudSize, 'white');
  drawFilledCircle(x + (cloudSize * 1.25), y - cloudSize * 0.5, cloudSize, 'white');
  drawFilledCircle(x + (cloudSize * 1.25), y + cloudSize * 0.5, cloudSize, 'white');
}

const trees = (width, numTrees, horizon, trunkWidth, trunkHeight, leavesRadius, minApples, maxApples, appleRadius) => {
  const gap = width / (numTrees + 1);
  const treeBaseY = horizon * 1.1;
  for (let i = 0; i < numTrees; i++) {
    tree(i, treeBaseY, gap, trunkWidth, trunkHeight, leavesRadius, minApples, maxApples, appleRadius)
  }
};

const tree = (i, treeBaseY, gap, trunkWidth, trunkHeight, leavesRadius, minApples, maxApples, appleRadius) => {
  const treeBaseX = (i + 1) * gap;
  const leavesX = treeBaseX + trunkWidth / 2;
  const leavesY = treeBaseY - trunkHeight - (leavesRadius - 2);
  const numApples = minApples + Math.floor(Math.random() * (maxApples - minApples));

  trunk(treeBaseX, treeBaseY, trunkHeight, trunkWidth)

  leaves(leavesX, leavesY, leavesRadius)

  apples(appleRadius, leavesX, leavesY, numApples, leavesRadius)
}

const trunk = (treeBaseX, treeBaseY, trunkHeight, trunkWidth) => {
  drawFilledRect(treeBaseX, treeBaseY - trunkHeight, trunkWidth, trunkHeight, 'sienna');
}

const leaves = (x, y, r) => {
  drawFilledCircle(x, y, r, 'forestgreen');
}

const apples = (radius, leavesX, leavesY, num, leavesRadius) => {
  const r = radius;
  drawFilledCircle(leavesX + -r / 2 + Math.random() * r, leavesY + -r / 2 + Math.random() * r, r, 'crimson');
  for (let i = 0; i < num; i++) {
    const angle = i * ((Math.PI * 2) / num);
    const d = leavesRadius - radius * 1.25 - (Math.random() * radius * 2);
    const ax = leavesX + d * Math.cos(angle);
    const ay = leavesY + d * Math.sin(angle);
    drawFilledCircle(ax + -r / 2 + Math.random() * r, ay + -r / 2 + Math.random() * r, r, 'crimson');
  }
}

const drawPicture = (horizon) => {
  sun(width, sunSize, sunRays, sunRayProportion, sunRayWidth)
  sky(width, horizon)
  ground(width, horizon)
  sun(width, sunSize, sunRays, sunRayProportion, sunRayWidth);
  clouds(width, height, smallCloudSize, bigCloudSize)
  trees(width, numTrees, horizon, trunkWidth, trunkHeight, leavesRadius, minApples, maxApples, appleRadius)
};

drawPicture(height * 0.78);