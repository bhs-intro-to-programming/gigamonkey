const RISE = Math.sin(60 * Math.PI / 180);
const MAX = Math.min(width, height);

const bottom = MAX * RISE;

const upTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, side/2, y - side * RISE, x + side, y, color);
}

const downTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, x + side/2, y + side * RISE, x + side, y, color);
}

upTriangle(0, bottom, MAX, 'blue');
downTriangle(MAX * 0.25, bottom - (MAX * RISE * 0.5), MAX/2, 'white');

downTriangle(MAX * 0.25 * 0.5, bottom - (MAX * RISE * 0.5 * 0.5), MAX/2 * 0.5, 'white');
downTriangle(MAX/2 + MAX * 0.25 * 0.5, bottom - (MAX * RISE * 0.5 * 0.5), MAX/2 * 0.5, 'white');
downTriangle(MAX/2 - MAX * 0.25, bottom - (MAX * RISE * 0.75), MAX/2 * 0.5, 'white');
