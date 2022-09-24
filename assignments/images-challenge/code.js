const z_sqr = (x, y) => {
  return [x ** 2 - y ** 2, 2 * x * y];
}
const f = (z) => {
  const z_sqr1 = z_sqr(z[0], z[1])
  return [z_sqr1[0] + z[0], z_sqr1[1] + z[1]];
}
const isPixelInSet = (c, iterations) => {
  let z = c;
  for (let i = 0; i < iterations; i++) {
    z = f(z);
    //console.log(z)
    if (z[1] === Infinity || z[0] === Infinity) {
      return false
    }

  }
  return true

}
const drawmandel = (iterations) => {
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

drawmandel(4)