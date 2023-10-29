//const countTens = (ns) => ns.filter(n => n === 10).length;

const pyramid = (n) => {
  const p = [];
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      p.push(i);
    }
  }
  return p;
}