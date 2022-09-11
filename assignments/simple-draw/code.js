const RISE = Math.sin(60 * Math.PI / 180);
const MAX = Math.min(width, height);

const bottom = height - (height - MAX * RISE) * 0.75;

let triangles = 1;

/*
 * Draw a filled equilateral triange pointing up with bottom-left corner at 
 * x,y and a given side length and color.
 */
const upTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, side / 2, y - side * RISE, x + side, y, color);
}

/*
 * Draw a filled equilateral triange pointing down with top-left corner at 
 * x,y and a given side length and color.
 */
const downTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, x + side / 2, y + side * RISE, x + side, y, color);
}

/*
 * Cut all the holes in the triangle with its bottom-left corner at x,y and
 * sides of length side.
 */
const cutHoles = (x, y, side, smallest) => {
  cutBigHole(x, y, side);
  if (side > smallest) {
    cutSmallerHoles(x, y, side, smallest);
  }
};

/*
 * Cut the big hole out of the middle of the given triangle.
 */
const cutBigHole = (x, y, side) => {
  triangles++;
  downTriangle(x + side * 0.25, y - (side/2 * RISE), side/2, '#eeeeef');
};

/*
 * Cut the holes out of the three smaller triangles left after cutting the
 * big hole.
 */
const cutSmallerHoles = (x, y, side, smallest) => {
  cutHoles(x, y, side/2, smallest);
  cutHoles(x + side/2, y, side/2, smallest);
  cutHoles(x + side/4, y - side/2 * RISE, side/2, smallest);
};

const sierpinski = (x, y, size, smallest) {
  // Draw the big blue triangle first
  upTriangle(x, y, size, 'blue');
  cutHoles(x, y, size, smallest);
}

sierpinski(0, bottom, MAX, 1);

console.log(`${triangles} triangles.`);