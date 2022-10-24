const pyramid1 = (n) => {
  const r = [];
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      r.push(i);
    }
  }
  return r;
}

const pyramid = (n) => Array(n).fill().flatMap((_, i) => Array(i).fill(i));