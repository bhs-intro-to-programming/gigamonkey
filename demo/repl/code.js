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

const isOk = (x) => hash(x) % 2 == 0;

const nextNumber = (n) => hash(n); 

const isLeet = (n) => n % 1337 === 0;

const random = () => Math.floor(Math.random() * 10000);

const foo = () => {
  let c = 0;
  while (!isLeet(random())) { c++ };
  return c;
}

const sumOfSquares = (n) => {
  let sum = 0;
  for (let i = 0; i < n; i++){
    sum += i ** 2;
  }
  return sum;
}

const pair = (a, b) => {
  console.log(`pair: ${a},${b}`);
};


const pairs = (n) => {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      pair(i, j);
    }
  }
}