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

const isPrime = (n) => {

  const helper = (d) => {
    if (d === 1) {
      return true;
    } else if (n % d === 0) {
      return false;
    } else {
      return helper(d - 1);
    }
  }

  return helper(Math.floor(Math.sqrt(n)));
}