const RISE = Math.sin(60 * Math.PI / 180);
const MAX = Math.max(width, height);

const bottom = MAX * RISE;

const upTriangle = (x, y, side, color) => {
  drawFilledTriangle(x, y, side/2, y - side * RISE, x + side, y, color);
}

//drawFilledTriangle(0, bottom, width/2, 0, width, bottom, 'blue');
upTriangle(0, bottom, MAX, 'blue');

//drawFilledTriangle(10, 10, 10,height/2, width/2, height/3, 'blue');
//drawFilledCircle(width/2, height/2, 20, 'red');