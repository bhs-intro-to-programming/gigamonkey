const pyramid = (n) => {
  const r = [];
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      r.push(i);
    }
  }
  return r;
}