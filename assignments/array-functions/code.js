const countTens = (ns) => ns.reduce((acc, n) => acc + (n === 10 ? 1 : 0), 0);

const sum = (ns) => ns.reduce((acc, n) => acc + n, 0);

const evens = (ns) => ns.filter(n => n % 2 === 0);

const anyOverOneHundred = (ns) => ns.some(n => n > 100);

const xpyramid = (n) => Array(n).fill().flatMap((_, i) => Array(i + 1).fill(i + 1));


const pyramid = (int) => {
 const array = [];
 for (let pos = 1; pos <= int; pos++){
   for (let ipos = 1; ipos <= pos; ipos++){
   array.push(pos)
 }}
 return array
}