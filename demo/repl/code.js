const euler1 = (n) => {
  for (let i = 1; i < n; i++) {
    if (i % 3 === 0) {
      console.log(i);
    }
    if (i % 5 === 0) {
      console.log(i);
    }
  }
};

