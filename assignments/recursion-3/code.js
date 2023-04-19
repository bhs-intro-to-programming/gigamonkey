const product = (ns) => {
  let r = 1;
  for (let i = 0; i < ns.length; i++) {
    r *= ns[i];
  }
  return r;
}

const sumSquares = (n) => n === 0 ? 0 : n ** 2 + sumSquares(n - 1);