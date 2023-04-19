const product = (ns) => {
  let r = 1;
  for (let i = 0; i < ns.length; i++) {
    r *= ns[i];
  }
  return r;
}

const sumSquares = (n) => n === 0 ? 0 : n ** 2 + sumSquares(n - 1);

const lucas = (n) => {
  if (n === 0) {
    return 2;
  } else if (n === 1) {
    return 1;
  } else {
    return lucas(n - 2) + lucas(n - 1);
  }
}