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
  downTriangle(x + side * 0.25, y - (side / 2 * RISE), side / 2, '#eeeeef');
};

/*
 * Cut the holes out of the three smaller triangles left after cutting the
 * big hole.
 */
const cutSmallerHoles = (x, y, side, smallest) => {
  let t = 0;
  t += cutHoles(x, y, side / 2, smallest);
  t += cutHoles(x + side / 2, y, side / 2, smallest);
  t += cutHoles(x + side / 4, y - side / 2 * RISE, side / 2, smallest);
  return t;
};

const sierpinski = (x, y, size, smallest) => {
  upTriangle(x, y, size, 'blue');
  const t = cutHoles(x, y, size, smallest);
  console.log(`${t} triangles.`);
};

const lineOfCircles = (radius) => {
  const d = radius * 2;
  const num = Math.floor(width / d);
  const xOffset = ((width % d) / 2) + radius;
  for (let i = 0; i < num; i++) {
    drawFilledCircle(xOffset + i * d, height / 2, radius, 'red');
  }
}


const lineOfCirclesAlternating = (radius) => {
  const d = radius * 2;
  const num = Math.floor(width / d);
  const xOffset = ((width % d) / 2) + radius;
  for (let i = 0; i < num; i++) {
    drawFilledCircle(xOffset + i * d, height / 2, radius, i % 2 === 0 ? 'blue' : 'red');
  }
}

const thingy = (lines) => {
  const divisions = lines - 1;
  const size = Math.min(width, height);
  const top = (height % size) / 2;
  const bottom = top + size;
  const gap = size / divisions;
  for (let i = 0; i <= size / gap; i++) {
    drawLine(0, top + i * gap, i * gap, bottom)
  }
};

const fillWithCircles = (radius) => {
  let d = radius * 2;
  let rows = Math.floor(height / d);
  let columns = Math.floor(width / d);
  let xOffset = (width % d) / 2 + radius;
  let yOffset = (height % d) / 2 + radius;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      drawCircle(xOffset + c * d, yOffset + r * d, radius, 'blue');
    }
  }
};

const fillWithCirclesRandomFill = (radius, p) => {
  let d = radius * 2;
  let rows = Math.floor(height / d);
  let columns = Math.floor(width / d);
  let xOffset = (width % d) / 2 + radius;
  let yOffset = (height % d) / 2 + radius;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (Math.random() < p) {
        drawFilledCircle(xOffset + c * d, yOffset + r * d, radius, 'blue');
      } else {
        drawCircle(xOffset + c * d, yOffset + r * d, radius, 'blue');
      }
    }
  }
};

const OLDsquareOfCircles = (radius) => {
  const d = radius * 2;
  const num = Math.floor(Math.min(width, height) / d);
  const xOffset = (width % (num * d)) / 2 + radius;
  const yOffset = (height % (num * d)) / 2 + radius;
  for (let r = 0; r < num; r++) {
    for (let c = 0; c < num; c++) {
      const topOrBottom = r === 0 || r === (num - 1);
      const side = c === 0 || c === (num - 1);
      if (topOrBottom || side) {
        drawCircle(xOffset + r * d, yOffset + c * d, radius, 'blue');
      }
    }
  }
};

const squareOfCircles = (radius) => {
  const d = radius * 2;
  const num = Math.floor(Math.min(width, height) / d);
  const xOffset = (width % (num * d)) / 2 + radius;
  const yOffset = (height % (num * d)) / 2 + radius;
  for (let r = 0; r < num; r++) {
    for (let c = 0; c < num; c++) {
      if ((r % (num - 1)) * (c % (num - 1)) === 0) {
        drawCircle(xOffset + r * d, yOffset + c * d, radius, 'blue');
      }
    }
  }
};

const concentricCircles = (num) => {
  const radius = Math.min(width, height) / 2;
  const step = radius / num;
  let color = 'blue';
  for (let r = radius; r > 0; r -= step) {
    drawFilledCircle(width / 2, height / 2, r, color);
    color = color === 'red' ? 'blue' : 'red';
  }
};

const checkerBoard = (dim) => {
  const size = Math.min(width, height);
  const sq = Math.floor(size / dim);
  const xOffset = width % (sq * dim) / 2;
  const yOffset = height % (sq * dim) / 2;
  for (let r = 0; r < dim; r++) {
    for (let c = 0; c < dim; c++) {
      const color = (r + c) % 2 === 0 ? 'blue' : 'red';
      drawFilledRect(xOffset + c * sq, yOffset + r * sq, sq, sq, color);
    }
  }
}

//lineOfCircles(12);
//lineOfCirclesAlternating(12);
//thingy(23);
//concentricCircles(11);
//fillWithCircles(17);
//fillWithCirclesRandomFill(17, 0.19);
squareOfCircles(27);
//checkerBoard(13);

//sierpinski(0, BOTTOM, MAX, 1);


const szeting = (r) => {

  const d = r * 2;
  const totalWidth = Math.ceil(width / d) * d;
  const center = width - totalWidth;

  let x = center + d - (center / 2);
  console.log(x);
  while (x < width - (center / 2)) {
    drawFilledCircle(x, height / 2, r, 'red')
    x += d;
  }

};

if (false) {
  drawFilledCircle(width / 2, height / 2, 50, 'blue');
  drawRect(width * 0.25, 50, width * 0.5, 100, 'red');
  drawCircle(55, height - 50, 30, 'blue');
  drawCircle(width - 70, height - 150, 30, 'blue');
  drawLine(55, height - 50, width - 70, height - 150, 'black');
  drawTriangle(width * 0.25 + 5, 145, width / 2, 55, width * 0.75 - 5, 145, 'blue');
}