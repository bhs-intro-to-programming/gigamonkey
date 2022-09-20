/*
 * This code is running in an environment the same as simple-draw. Thus you have
 * two variables that will be helpful.
 *
 *  width - the width of the drawing area.
 *  height - the height of the drawing area.
 *
 * And these methods which do the same thing as in simple-draw.
 *
 *  drawLine(x1, y1, x2, y2, color, lineWidth)
 *
 *  drawCircle(x, y, radius, color, lineWidth=1)
 *
 *  drawRect(x, y, w, h, color, lineWidth=1)
 *
 *  drawTriangle(x1, y1, x2, y2, x3, y3, color, lineWidth=1)
 *
 *  drawFilledCircle(x, y, r, color)
 *
 *  drawFilledRect(x, y, width, height, color)
 *
 *  drawFilledTriangle(x1, y1, x2, y2, x3, y3, color)
 *
 *  clear()
 */
/*
const drawLineCircle = (r) => {
  for(let i = 0; r * 2 * i < width; i++) {
    drawFilledCircle(r * 2 * i, 200, r, 'red');
  }
}

drawLineCircle(10);
*/
/*
const drawLineCircle = (r) => {
  for(let i = 0; r * 2 * i < width; i++) {
    let color;
    if (i % 2 === 1) {
      color = 'red';
    } else {
      color = 'blue';
    }
    drawFilledCircle(r * 2 * i, 200, r, color);
  }
}

drawLineCircle(10);
*/
/*
const drawTarget = (numRing) => {
  for (let i = 0; i < numRing; i++) {
    let color;
    if (i % 2 === 1) {
      color = 'red';
    } else {
      color = 'blue';
    }
    drawFilledCircle(width / 2, height / 2, ((numRing - i) / numRing) * (width / 2), color);
  }
}

drawTarget(12);
*/
/*
const drawCheckers = (edgeNum) => {
  var checkWidth = Math.min(width, height);
  var sqrWidth = checkWidth / edgeNum;
  var color;
  for (let i = 0; i < edgeNum; i++) {
    for (let j = 0; j < edgeNum + 1; j++) {
      if (i % 2 === 1 && j % 2 === 1) {
        color = 'red';
      } else if (i % 2 === 1 && j % 2 === 0) {
        color = 'blue';
      } else if (i % 2 === 0 && j % 2 === 1) {
        color = 'blue';
      } else {
        color = 'red';
      }
      drawFilledRect(j * sqrWidth, i * sqrWidth, sqrWidth, sqrWidth, color);
    }
  }
}

drawCheckers(10);
*/

const drawLineyCurve = (numLines) => {
  let heightDist;
  let widthDist;
  for (let i = 0; i < numLines; i++) {
    heightDist = height / numLines;
    widthDist = width / numLines;
    drawLine(0, heightDist * i, widthDist * i, height, 'blue', 1);
  }
}

drawLineyCurve(150);

/*
const drawRectCircle = (r) => {
  for(let i = 0; r * 2 * i < width; i++) {
    for(let j = 0; r * 2 * j < height; j++)
    drawCircle(r * 2 * i, r * 2 * j, r, 'red', 1);
  }
}

drawRectCircle(20);
*/
/*
const drawRanCircle = (r, prob) => {
  for (let i = 0; r * 2 * i < width; i++) {
    for (let j = 0; r * 2 * j < height; j++) {
      var colorNum = Math.random();
      if (colorNum > prob) {
        drawCircle(r * 2 * i, r * 2 * j, r, 'red', 1);
      } else {
        drawFilledCircle(r * 2 * i, r * 2 * j, r, 'red');
      }
    }
  }
}

drawRanCircle(10, 0.1);
*/
/*
const drawSqrCrc = (r) => {
  var checkLength = Math.min(width, height) - 1 * (r * 2);
  for(let i = 0; r * 2 * i < checkLength; i++) {
    drawCircle(r * 2 * i + r * 2, height / 2 - checkLength / 2, r, 'red', 1);
    drawCircle(r * 2 * i + r * 2, height / 2 + checkLength / 2 - 20, r, 'red', 1);
    drawCircle(width / 2 + checkLength / 2, r * 2 * i + 70, r, 'red', 1);
    drawCircle(width / 2 - checkLength / 2 + 20, r * 2 * i + 70, r, 'red', 1);
  }
}

drawSqrCrc(20);
*/