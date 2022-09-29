// Could also figure this out with Pythagorean theorem
const RISE = Math.sin(60 * Math.PI / 180); 
const MAX_SIDE = Math.min(width, height);
const BOTTOM = height - (height - MAX_SIDE * RISE) * 0.75;

/*
 * Draw a filled equilateral triange pointing up with bottom-left corner at 
 * x,y and a given side length and color.
 */
const upTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, x + side / 2, y - side * RISE, x + side, y, color);
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
  cutBigHole(x, y, side);
  if (side >= smallest) {
    cutSmallerHoles(x, y, side, smallest);
  }
};

/*
 * Cut the big hole out of the middle of the given triangle.
 */
const cutBigHole = (x, y, side) => {
  downTriangle(x + side * 0.25, y - (side / 2 * RISE), side / 2, '#ffffff');
};

/*
 * Cut the holes out of the three smaller triangles left after cutting the
 * big hole.
 */
const cutSmallerHoles = (x, y, side, smallest) => {
  cutHoles(x, y, side / 2, smallest);
  cutHoles(x + side / 2, y, side / 2, smallest);
  cutHoles(x + side / 4, y - side / 2 * RISE, side / 2, smallest);
};

/*
 * Draw the Sierpinski Gasket with the bottom left corner at x, y and side of size,
 * recursing down until we cut out triangles of size smallest. 
 */
const sierpinski = (x, y, size, smallest) => {
  upTriangle(x, y, size, 'blue');
  cutHoles(x, y, size, smallest);
};

sierpinski((width - MAX_SIDE) / 2, BOTTOM, MAX_SIDE, 1);
