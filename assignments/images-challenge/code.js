const cx = width / 2;
const cy = height / 2;
const zoom = 0.005;
const cZero = [0, 0];

// The main function F is used to iterate from z_0 = 0 via the
// recurrance: z_n+1 = z_n^2 + c

const f = (z, c) => square(z).map((n, i) => n + c[i]);

const square = ([i, j]) => [i ** 2 - j ** 2, 2 * i * j];

const coord = (gx, gy) => [(gx - cx) * zoom, (cy - gy) * zoom];

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

const color = (n, max) => {
  const c = Math.round((n / max) * ((2 ** 24) - 1));
  const [r, g, b] = Array(3).fill().map((_, i) => (c >> ((3 - i) * 8)) & 0xff);
  const n = (r << 16) | (b << 8) | g;
  return `#${n.toString(16).padStart(6, 0)}`;
};

const drawMandel = (iterations) => {
  const start = performance.now();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const e = escapeVelocity(coord(x, y), iterations);
      const c = e === 0 ? 'black' : color(e, iterations);
      drawFilledRect(x, y, 1, 1, c);
    }
  }
  const t = Math.round(performance.now() - start);
  console.log(`Rendered in ${t/1000} seconds.`);
};

drawMandel(5000);