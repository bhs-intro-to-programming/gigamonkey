const countTens = (ns) => {
  let count = 0;
  for (let i = 0; i < ns.length; i++) {
    if (ns[i] === 10) {
      count++;
    }
  }
  return count;
};

const sum = (ns) => {
  let total = 0;
  for (let i = 0; i < ns.length; i++) {
    total = total + ns[i];
  }
  return total;
};

const evens = (ns) => {
  const even = [];
  for (let i = 0; i < ns.length; i++) {
    if (ns[i] % 2 === 0) {
      even.push(ns[i]);
    }
  }
  return even;
};

const anyOverOneHundred = (ns) => {
  for (let i = 0; i < ns.length; i++) {
    if (ns[i] > 100) {
      return true;
    }
  }
  return false;
};

const xpyramid = (n) => {
  const p = [];
  for (let i = 1; i < n + 1; i++) {
    for (let j = 0; j < i; j++) {
      p.push(i);
    }
  }
  return p;
};

const xxpyramid = (integer) => {
  let product = []
  for (let i = 0; i < integer; i++) {
    for (let j = 0; j < i + 1; j++) {
      product.push(i + 1)
    }
  }
  return product
};

const pyramid = (integer) => {
  let product = []
  for (let i = 1; i < integer + 1; i++) {
    for (let j = 0; j < i; j++) {
      product.push(i)
    }
  }
  return product
};