// Warning! Do not call this function with numbers much bigger than 40 unless
// you want to kill this tab.
const fib = (n) => (n < 2 ? n : fib(n - 2) + fib(n - 1));

// This one you can safely call with as big numbers as you want though after
// MAX_FIB_N it will return Infinity.
const fib2 = (n) => {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
    if (!isFinite(a)) break;
  }
  return a;
};

const MAX_FIB_N = 1476;

const MAX_FIB = fib2(MAX_FIB_N);

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const encode = (c, k) => {
  const n = alphabet.indexOf(c.toLowerCase());
  if (n !== -1) {
    const encoded = alphabet[(n + k) % 26];
    return c.toUpperCase() === c ? encoded.toUpperCase()  : encoded;
 } else {
   return c;
 }
}

const cc = (s, k) => [...cc].map(c => encode(c, k)).join('');