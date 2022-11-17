const countTens = (ns) => {
  let count = 0;
  for (let i = 0; i < ns.length; i++) {
    if (ns[i] === 10) {
      count++;
    }
  }
  return count;
};