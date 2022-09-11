const RISE = Math.sin(60 * Math.PI / 180);
const MAX = Math.min(width, height);

const bottom = MAX * RISE;

const upTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, side/2, y - side * RISE, x + side, y, color);
}

const downTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, x + side/2, y + side * RISE, x + side, y, color);
}

// Draw the big blue triangle first
let side = MAX;
upTriangle(0, bottom, side, 'blue');

// Cut a hole out of the middle
downTriangle(side * 0.25, bottom - (side * RISE * 0.5), side/2, 'white');

// The next three holes
downTriangle(MAX * 0.25 * 0.5, bottom - (MAX * RISE * 0.5 * 0.5), MAX/2 * 0.5, 'white');
downTriangle(MAX/2 + MAX * 0.25 * 0.5, bottom - (MAX * RISE * 0.5 * 0.5), MAX/2 * 0.5, 'white');
downTriangle(MAX/2 - MAX * 0.125, bottom - (MAX * RISE * 0.75), MAX/2 * 0.5, 'white');
