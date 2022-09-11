const RISE = Math.sin(60 * Math.PI / 180);
const MAX = Math.min(width, height);

const bottom = MAX * RISE;

const upTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, side/2, y - side * RISE, x + side, y, color);
}

const downTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, side/2, y + side * RISE, x + side, y, color);
}

//upTriangle(0, bottom, MAX, 'blue');
downTriangle(0, 20, MAX, 'red');
