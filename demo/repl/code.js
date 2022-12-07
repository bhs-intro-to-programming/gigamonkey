// If we list all the natural numbers below 
// 10 that are multiples of 3 or 5, we get 
// 3, 5, 6 and 9. The sum of these multiples is 23.

// Find the sum of all the multiples of 3 or 5
// below 1000.

const euler1 = (n) => {
  let sum = 0;
  for (let i = 1; i < n; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }
  return sum;
}

const hash = (o) => {
  const s = JSON.stringify(o);
  return [...s].reduce((hash, c) => ((hash << 5) + hash) + c.codePointAt(0), 5381);
}

const isGood = (x) => hash(x) % 2 == 0;