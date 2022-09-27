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
//const coord = (gx, gy, x, y, zoom) => [(gx - (cx - (x * zoom))) / zoom, ((cy - (y * zoom)) - gy) / zoom];

const adjust = (g, c, zoom, offset) => ((g - c) / zoom) + offset;

const coord = (gx, gy, x, y, zoom) => [adjust(gx, cx, zoom, x), adjust(gy, cy, zoom, y)];

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
const drawMandelbrot = (iterations, cx, cy, zoom) => {
  const start = performance.now();
  for (let gx = 0; gx < width; gx++) {
    for (let gy = 0; gy < height; gy++) {
      const e = escapeVelocity(coord(gx, gy, cx, cy, zoom), iterations);
      const c = e === 0 ? 'black' : color(e / iterations);
      drawFilledRect(gx, gy, 1, 1, c);
    }
  }
  const t = Math.round(performance.now() - start);
  console.log(`Rendered in ${t / 1000} seconds.`);
};

drawMandelbrot(5000, -Math.E/7, -Math.E/20, 200);
