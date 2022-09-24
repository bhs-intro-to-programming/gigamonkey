const z_sqr = ([x, y]) => {
  return [x ** 2 - y ** 2, 2 * x * y];
}
const f = (z, c) => {
  // z_n+1 = z_n^2 + c
  const [i1, j1] = z_sqr(z);
  const [i2, j2] = c;
  return [i1 + i2, j1 + j2];
}
const isPixelInSet = (c, iterations) => {
  let z = [0, 0];
  for (let i = 0; i < iterations; i++) {
    z = f(z, c);
    if (z[0] === Infinity || z[1] === Infinity) {
      return false;
    }
  }
  return true;
}

const drawMandel = (iterations) => {
  let xmath = 0
  let ymath = 0
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      //console.log(isPixelInSet([xmath, ymath], iterations))
      if (isPixelInSet([xmath, ymath], iterations)) {
        drawFilledRect(x, y, 1, 1, 'black')
      }
      xmath += 2 / width
    }
    ymath += 2 / height
  }
}

drawMandel(10)