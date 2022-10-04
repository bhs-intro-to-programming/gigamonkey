const cx = width / 2;
const cy = height / 2;

/* 
 * The main function F is used to iterate from z_0 = 0 via the
 * recurrence relation: z_n+1 = z_n ^ 2 + c
 */
const f = (z, c) => square(z).map((n, i) => n + c[i]);

/*
 * Square a complex number.
 */
const square = ([a, b]) => [a ** 2 - b ** 2, 2 * a * b];

/*
 * Translate graphical coordinates to zoomed coordinates with cx, cy in
 * the center of the drawing area.
 */
const coord = (gx, gy, x, y, zoom) => [adjust(gx, cx, zoom, x), adjust(gy, cy, zoom, y)];

const adjust = (g, c, zoom, offset) => ((g - c) / zoom) + offset;


/*
 * How fast (if at all) does the iteration of f head toward positive
 * or negative infinity?
 */
const escapeVelocity = (c, iterations) => {
  let z = [0, 0];
  for (let i = 0; i < iterations; i++) {
    z = f(z, c);
    if (z.some((x) => !isFinite(x))) {
      return i;
    }
  }
  return 0;
};

/*
 * Translate a number from 0 to 1 into an RGB color. Bias toward blue.
 */
const color = (n) => {
  const c = Math.round(n * (2 ** 24 - 1));
  const [r, g, b] = Array(3).fill().map((_, i) => (c >> ((2 - i) * 8)) & 0xff);
  return `rgb(${r}, ${b}, ${g})`;
};

/*
 * Draw the Mandelbrot set using a given number of iterations
 * with point cx, cy at the center of the drawing area and zoomed
 * by the given amount.  
 */
const drawMandelbrot = (iterations, x, y, zoom) => {
  const start = performance.now();
  for (let gx = 0; gx < width; gx++) {
    for (let gy = 0; gy < height; gy++) {
      const e = escapeVelocity(coord(gx, gy, x, y, zoom), iterations);
      const c = e === 0 ? 'black' : color(e / iterations);
      drawFilledRect(gx, gy, 1, 1, c);
    }
  }
  const t = Math.round(performance.now() - start);
  console.log(`Rendered in ${t / 1000} seconds.`);
};

// drawMandelbrot(5000, -0.5, 0, 200);


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
 * 
 *
 */

// Luke's code.

const notreallycurved = (num, base, rside) => {
  for (let linesD = 0; linesD != num; linesD++) {
    drawLine(rside / num * linesD, base, 0, base / num * linesD, "black", 0.5)
  }
}
const lineOfCircles = (r) => {
  const d = r * 2
  const num = Math.floor(width / d)
  const offset = (width - num * d) / 2
  for (let i = 0; i < num; i++) {
    drawFilledCircle(offset + r + d * i, height / 2, r, 'black')
  }
}
const lineOfCirclesColor = (r, color1, color2) => {
  const d = r * 2
  const num = Math.floor(width / d)
  const offset = (width - num * d) / 2
  for (let i = 0; i < num; i++) {
    if (i % 2 === 0) {
      drawFilledCircle(offset + r + d * i, height / 2, r, color1)
    }
    else {
      drawFilledCircle(offset + r + d * i, height / 2, r, color2)
    }
  }
}
const concentricCircles = (num, color1, color2) => {
  const smallerD = width > height ? height : width
  const inc = smallerD / num / 2
  for (let i = 0; i < num; i++) {
    if (i % 2 === 0) {
      drawFilledCircle(width / 2, height / 2, smallerD / 2 - inc * i, color1)
    }
    else {
      drawFilledCircle(width / 2, height / 2, smallerD / 2 - inc * i, color2)
    }
  }
}
const checkerBoard = (num, color1, color2) => {
  const smallerD = width > height ? height : width
  const size = smallerD / num
  let color11 = color1;
  let color22 = color2;
  for (let y = 0; y < num * size; y += size) {
    for (let x = 0; x < num * size; x += size) {
      console.log(x + y)
      drawFilledRect(x, y, size, size, color11)
      //swap
      let temp = color11;
      color11 = color22;
      color22 = temp
    }
  }
}
const fillWithCircles = (r, color) => {
  const d = r * 2
  const numx = Math.floor(width / d)
  const numy = Math.floor(height / d)
  const offsetx = (width - (numx * d)) / 2
  const offsety = (height - (numy * d)) / 2
  for (let y = offsetx + d; y < numy * d; y += d) {
    for (let x = offsety + d; x < numx * d; x += d) {
      drawCircle(x, y, r, color)
    }
  }
}
const fillWithCirclesRandomlyFilled = (r, prob, color) => {
  const d = r * 2
  const numx = Math.floor(width / d)
  const numy = Math.floor(height / d)
  const offsetx = (width - (numx * d)) / 2
  const offsety = (height - (numy * d)) / 2
  for (let y = offsetx + d; y < numy * d; y += d) {
    for (let x = offsety + d; x < numx * d; x += d) {
      if (Math.random() <= prob) {
        drawFilledCircle(x, y, r, color)
      }
      else {
        drawCircle(x, y, r, color)

      }
    }
  }
}

const squareOfCircles = (radius, color) => {
  const diameter = 2 * radius
  const cNum = Math.floor(height / diameter)
  const cExtra = (height - (diameter * cNum)) / 2 + radius
  let xCheese;
  for (let xPos = (width - height + cExtra) / 2; xPos < width - ((width - height) - cExtra) / 2 - radius; xPos += diameter) {
    drawCircle(xPos, height - cExtra, radius, color)
    drawCircle(xPos, cExtra, radius, color)
    xCheese = xPos
  }
  for (let yPos = cExtra + diameter; yPos < height - cExtra; yPos += diameter) {
    drawCircle((width - height + cExtra) / 2, yPos, radius, color)
    drawCircle(xCheese, yPos, radius, color)
  }
}




notreallycurved(5, height, width/2)
//lineOfCircles(23)
//lineOfCirclesColor(12, 'pink', 'teal')
//concentricCircles(11, 'teal', 'pink')
//checkerBoard(5, 'black', 'red')
//fillWithCircles(30, 'blue') //FIX
//fillWithCirclesRandomlyFilled(30, 0.99, 'blue')
//squareOfCircles(10, 'blue') //not done 

