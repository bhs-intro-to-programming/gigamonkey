const RISE = Math.sin(60 * Math.PI / 180);
const MAX = Math.min(width, height);

const bottom = MAX * RISE;

const upTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, side / 2, y - side * RISE, x + side, y, color);
}

const downTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, x + side / 2, y + side * RISE, x + side, y, color);
}

const cutHole = (x, y, side) => {
  downTriangle(x + side * 0.25, y - (side/2 * RISE), side/2, 'white');
};

const cutSmallHoles = (x, y, side) => {
  cutHole(x, y, side/2);
  cutHole(x + side/2, y, side/2);
  cutHole(x + side/4, y - side/2 * RISE, side/2);
}

let side = MAX;

// Draw the big blue triangle first
upTriangle(0, bottom, side, 'blue');
cutHole(0, bottom, side);

cutSmallHoles(0, bottom, side);
// The next three holes
//downTriangle(MAX * 0.25 * 0.5, bottom - (MAX * RISE * 0.5 * 0.5), MAX / 2 * 0.5, 'white');
//downTriangle(MAX / 2 + MAX * 0.25 * 0.5, bottom - (MAX * RISE * 0.5 * 0.5), MAX / 2 * 0.5, 'white');
//downTriangle(MAX / 2 - MAX * 0.125, bottom - (MAX * RISE * 0.75), MAX / 2 * 0.5, 'white');
