const RISE = Math.sin(60 * Math.PI / 180);
const MAX = Math.min(width, height);

const bottom = MAX * RISE;

const upTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, side / 2, y - side * RISE, x + side, y, color);
}

const downTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, x + side / 2, y + side * RISE, x + side, y, color);
}

const cutHoles = (x, y, side) => {
  cutBigHole(x, y, side);
  if (side > 2) {
    cutSmallHoles(x, y, side);
  }
};

const cutBigHole = (x, y, side) => {
  downTriangle(x + side * 0.25, y - (side/2 * RISE), side/2, 'grey');
};

const cutSmallHoles = (x, y, side) => {
  cutHoles(x, y, side/2);
  cutHoles(x + side/2, y, side/2);
  cutHoles(x + side/4, y - side/2 * RISE, side/2);
};

let side = MAX;

// Draw the big blue triangle first
upTriangle(0, bottom, side, 'blue');
cutHoles(0, bottom, side);

//cutSmallHoles(0, bottom, side);