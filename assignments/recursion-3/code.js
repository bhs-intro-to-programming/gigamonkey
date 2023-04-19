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

const isAscending = (ns) => {
  const copy = [...ns].sort();
  for (let i = 0; i < ns.length; i++) {
    if (ns[i] !== copy[i]) {
      return false;
    }
  }
  return true;
}

const isDescending = (ns) => {
  const copy = [...ns].sort((a, b) => b - a);
  for (let i = 0; i < ns.length; i++) {
    if (ns[i] !== copy[i]) {
      return false;
    }
  }
  return true;
}

const sumNested = (arg) => {
  if (isNumber(arg)) {
    return arg;
  } else {
    return arg.reduce((acc, arg) => acc + sumNested(arg), 0);
  }
}