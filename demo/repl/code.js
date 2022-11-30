const euler1 = (n) => {
  let p = 1;
  for (let i = 1; i < n; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      p *= i;
    }
  }
  return p;
};

