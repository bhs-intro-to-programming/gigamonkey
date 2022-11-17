const countTens = (ns) => ns.reduce((acc, n) => acc + (n === 10 ? 1 : 0), 0);

const sum = (ns) => ns.reduce((acc, n) => acc + n, 0);

const evens = (ns) => ns.filter(n => n % 2 === 0);

const anyOverOneHundred = (ns) => ns.some(n => n > 100);

const pyramid = (n) => Array(n).fill().flatMap((_, i) => Array(i + 1).fill(i + 1));
