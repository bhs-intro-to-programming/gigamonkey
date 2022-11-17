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