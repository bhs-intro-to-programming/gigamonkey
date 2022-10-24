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
const gasket = (x, y, size, smallest) => {
  upTriangle(x, y, size, 'blue');
  cutHoles(x, y, size, smallest);
};

/*
 * Draw the Sierpinki Carpet with the top left corner at x, y and the side of size,
 * recursing down until we cut out squares of the size smallest.
 */
const carpet = (x, y, size, smallest, extra = () => { }) => {
  drawFilledRect(x, y, size, size, 'blue');
  cutCarpetHoles(x, y, size, smallest, extra);
};

/*
 * Draw a Sierpinski Carpet with each big hole decorated with a Sierpinski Gasket.
 */
const garpet = (x, y, size, smallest) => carpet(x, y, size, smallest, embedGasket);

const cutCarpetHoles = (x, y, size, smallest, decorateBigHole) => {
  cutBigCarpetHole(x, y, size, decorateBigHole);
  if (size >= smallest) {
    cutSmallCarpetHoles(x, y, size, smallest, decorateBigHole);
  }
};

const cutBigCarpetHole = (x, y, size, decorateBigHole) => {
  const third = size / 3;
  drawFilledRect(x + third, y + third, third, third, 'white');
  decorateBigHole(x + third, y + third, third);
};

const embedGasket = (x, y, size) => {
  const h = RISE * size;
  gasket(x, (y + size) - ((size - h) / 2), size, 1);
};

const cutSmallCarpetHoles = (x, y, size, smallest, decorateBigHole) => {
  const third = size / 3;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (row != 1 || col != 1) {
        const nx = x + (third * col);
        const ny = y + (third * row);
        cutCarpetHoles(nx, ny, third, smallest, decorateBigHole);
      }
    }
  }
};

// gasket((width - MAX_SIDE) / 2, BOTTOM, MAX_SIDE, 1);
// carpet((width - MAX_SIDE) / 2, (height - MAX_SIDE) / 2, MAX_SIDE, 1);
//garpet((width - MAX_SIDE) / 2, (height - MAX_SIDE) / 2, MAX_SIDE, 1);


const colorfulCurve = () => {
  const a = 25
  const s = 15
  const colors = ['violet', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo'];
  for (let y = 0; y < a; y++) {
    for (let x = 0; x < a; x++) {
      const color = colors[y % colors.length];
      drawLine(0, y * s, y * s, height - 1, color, 1)
    }
  }
}



/*
* This code is running in an environment the same as simple-draw. Thus you have
* two variables that will be helpful.
*
*  width - the width of the drawing area.
*  height - the height of the drawing area.
*
* And these methods which do the same thing as in simple-draw.
*
*  drawLine(x1, y1, x2, y2, color, lineWidth)
*
*  drawCircle(x, y, radius, color, lineWidth=1)
*
*  drawRect(x, y, w, h, color, lineWidth=1)
*
*  drawTriangle(x1, y1, x2, y2, x3, y3, color, lineWidth=1)
*
*  drawFilledCircle(x, y, r, color)
*
*  drawFilledRect(x, y, width, height, color)
*
*  drawFilledTriangle(x1, y1, x2, y2, x3, y3, color)
*
*  clear()
*/



const drawCircleLine = (d, color) => {
  for (let i = 0; d * i < width - (d + d); i++) {
    let x = i * d + d
    let y = height / 2
    drawFilledCircle(x, y, d / 2, color)
  }
}
//drawCircleLine(20, 'red')

const drawSpicyCircleLine = (d, color) => {
  for (let i = 0; d * i < width - (d + d); i++) {
    let x = i * d + d
    let y = height / 2
    drawFilledCircle(x, y, d / 2, color)
    if (color === 'red') {
      color = 'blue'
    } else {
      color = 'red'
    }
  }
}
//drawSpicyCircleLine(20, 'red')

const drawSpicyCircles = (c, color) => {
  for (let r = width / 2; ; r = r - width / 2 / c) {
    drawFilledCircle(width / 2, height / 2, r, color)
    if (color === 'red') {
      color = 'blue'
    } else {
      color = 'red'
    }
  }
}
//drawSpicyCircles(11, 'red')

const drawSpicyCheckers = (n, color) => {
  if (n % 2 === 0) {
    n = n + 0.0000000000001
  }
  for (let y = 0; y < height; y = y + width / n) {
    for (let x = 0; x < width; x = x + width / n) {
      let a = width / n
      drawFilledRect(x, y, a, a, color)
      if (color === 'blue') {
        color = 'red'
      } else {
        color = 'blue'
      }
    }
  }
}
//drawSpicyCheckers(12, 'blue')

const drawTooManyLines = (n) => {
  for (let i = 0; i < n; i++) {
    let x2 = (width / n) * i
    let y2 = height
    let y1 = (height / n) * i
    let x1 = 0
    drawLine(x1, y1, x2, y2, 'black', 1)
  }
}
//drawTooManyLines(20)


const drawTooManyCircles = (d, color) => {
  for (let j = 1; d * j < height - (d); j++) {
    for (let i = 0; d * i < width - (d + d); i++) {
      let x = i * d + d
      let y = j * d
      drawCircle(x, y, d / 2, color)
    }
  }
}
//drawTooManyCircles(17, 'blue')

const drawSomeFunnyCircles = (r, p, color) => {
  for (let y = r * 2; y < height - r * 2; y = y + r * 2) {
    for (let n = 0; r * n < width - (r * 2); n = n + 2) {
      let x = r * 2
      drawCircle(x + r * n, y, r, color)
      if (Math.random() < p) {
        drawFilledCircle(x + r * n, y, r, color)
      }
    }
  }
}
//drawSomeFunnyCircles(17, .23, 'blue')

const drawStrangePictureFrame = (d, color) => {
  const across = Math.floor(width / d);
  const down = Math.floor(height / d);

  const xOffset = d / 2 + (width - across * d) / 2;
  const yOffset = d / 2 + (height - down * d) / 2;

  for (let i = 0; i < across; i++) {
    for (let j = 0; j < down; j++) {
      if (i === 0 || i === across - 1 || j === down - 1 || j === 0) {
        const x = xOffset + d * i
        const y = yOffset + d * j
        drawCircle(x, y, d / 2, color)
      }
    }
  }
}
drawStrangePictureFrame(height * Math.random(), 'blue') 