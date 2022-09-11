const RISE = Math.sin(60 * Math.PI / 180);
const MAX = Math.min(width, height);
const BOTTOM = height - (height - MAX * RISE) * 0.75;

/*
 * Draw a filled equilateral triange pointing up with bottom-left corner at 
 * x,y and a given side length and color.
 */
const upTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, side / 2, y - side * RISE, x + side, y, color);
};

/*
 * Draw a filled equilateral triange pointing down with top-left corner at 
 * x,y and a given side length and color.
 */
const downTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, x + side / 2, y + side * RISE, x + side, y, color);
};

/*
 * Cut all the holes in the triangle with its bottom-left corner at x,y and
 * given side length. Also returns total number of triangles cut.
 */
const cutHoles = (x, y, side, smallest) => {
  let t = 1;
  cutBigHole(x, y, side);
  if (side > smallest) {
    t += cutSmallerHoles(x, y, side, smallest);
  }
  return t;
};

/*
 * Cut the big hole out of the middle of the given triangle.
 */
const cutBigHole = (x, y, side) => {
  downTriangle(x + side * 0.25, y - (side/2 * RISE), side/2, '#eeeeef');
};

/*
 * Cut the holes out of the three smaller triangles left after cutting the
 * big hole.
 */
const cutSmallerHoles = (x, y, side, smallest) => {
  let t = 0;
  t += cutHoles(x, y, side/2, smallest);
  t += cutHoles(x + side/2, y, side/2, smallest);
  t += cutHoles(x + side/4, y - side/2 * RISE, side/2, smallest);
  return t;
};

const sierpinski = (x, y, size, smallest) => {
  upTriangle(x, y, size, 'blue');
  const t = cutHoles(x, y, size, smallest);
  console.log(`${t} triangles.`);
};

const thingy = (top, left, size, divisions) => {
  let gap = size / divisions;
  drawLine(left, top, left, top + size);
  drawLine(left, top + size, left + size, top + size);
  for (let i = 0; i < size / gap; i++) {
    drawLine(left, top + i * gap, left + (i+1) * gap, top + size)
  }
};

const squareOfCircles = (x, y, size, rows, columns) => {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      drawFilledCircle(x + r * size * 2, y + c * size * 2, size, 'blue');
    }
  }
}

thingy(50, 10, Math.min(width, height) - 20, 60);

//sierpinski(0, BOTTOM, MAX, 1);