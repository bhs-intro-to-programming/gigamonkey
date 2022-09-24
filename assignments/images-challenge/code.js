const cx = width / 2;
const cy = height / 2;
const zoom = 0.005;

const z_sqr = ([x, y]) => {
  return [x ** 2 - y ** 2, 2 * x * y];
};

const f = (z, c) => {
  // z_n+1 = z_n^2 + c
  const [i1, j1] = z_sqr(z);
  const [i2, j2] = c;
  return [i1 + i2, j1 + j2];
};

const isPixelInSet = (c, iterations) => {
  let z = [0, 0];
  for (let i = 0; i < iterations; i++) {
    z = f(z, c);
    if (z[0] === Infinity || z[1] === Infinity) {
      return false;
    }
  }
  return true;
};


const coord = (gx, gy) => {
  return [(gx - cx) * zoom, (cy - gy) * zoom];
};

const drawMandel = (iterations) => {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      //console.log(isPixelInSet([xmath, ymath], iterations))
      if (isPixelInSet(coord(x, y), iterations)) {
        drawFilledRect(x, y, 1, 1, 'black')
      }
    }
  }
}

drawMandel(1000)