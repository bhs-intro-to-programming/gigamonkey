//const countTens = (ns) => ns.filter(n => n === 10).length;

const countTens = (ns) => ns.reduce((c, n) => c + (n === 10 ? 1 : 0), 42)
