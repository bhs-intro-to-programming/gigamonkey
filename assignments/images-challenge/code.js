const cx = width / 2;
const cy = height / 2;
const zoom = 0.005;
const cZero = [0, 0];

const square = ([i, j]) => {
  return [i ** 2 - j ** 2, 2 * i * j];
};

const f = (z, c) => {
  // z_n+1 = z_n^2 + c
  return square(z).map((n, i) => n + c[i]);
};

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

const coord = (gx, gy) => {
  return [(gx - cx) * zoom, (cy - gy) * zoom];
};

const color = (n, max) => {
  const c = Math.round(255 * n / max).toString(16).padStart(0);
  return `rgb(${c}, ${c}, ${c})`;
}

const drawMandel = (iterations) => {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const e = escapeVelocity(coord(x, y), iterations);
      if (e === 0) {
        drawFilledRect(x, y, 1, 1, 'black')
      } else {
        drawFilledRect(x, y, 1, 1, color(e, iterations));
      }
    }
  }
}

drawMandel(1000)