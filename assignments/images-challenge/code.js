const cx = width / 2 + 50;
const cy = height / 2;
const cZero = [0, 0];

/* 
 * The main function F is used to iterate from z_0 = 0 via the
 * recurrance: z_n+1 = z_n^2 + c
*/
const f = (z, c) => square(z).map((n, i) => n + c[i]);

/*
 * Square a complex number.
 */
const square = ([i, j]) => [i ** 2 - j ** 2, 2 * i * j];

/*
 * Translate graphical coordinates to zoomed coordinates with 0,0 in
 * the center of the drawing area.
 */
const coord = (gx, gy, zoom) => [(gx - cx) * zoom, (cy - gy) * zoom];

/*
 * How fast (if at all) does the iteration of f head toward positive
 * or negative infinity?
 */
const escapeVelocity = (c, iterations) => {
  let z = cZero;
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
  const c = Math.round(n * ((2 ** 24) - 1));
  const [r, g, b] = Array(3).fill().map((_, i) => (c >> ((2 - i) * 8)) & 0xff);
  return `rgb(${r}, ${b}, ${g})`;
};

/*
 * Draw the Mandelbrot set using a given number of iterations.
 */
const drawMandelbrot = (iterations, zoom) => {
  const start = performance.now();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const e = escapeVelocity(coord(x, y, zoom), iterations);
      const c = e === 0 ? 'black' : color(e / iterations);
      drawFilledRect(x, y, 1, 1, c);
    }
  }
  const t = Math.round(performance.now() - start);
  console.log(`Rendered in ${t/1000} seconds.`);
};

drawMandelbrot(500, 0.005);
