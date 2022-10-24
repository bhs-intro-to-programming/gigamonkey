const countTens = (ns) => ns.reduce((acc, n) => acc + n === 10 ? 1 : 0, 0);


const pyramid = (n) => Array(n).fill().flatMap((_, i) => Array(i+1).fill(i+1));