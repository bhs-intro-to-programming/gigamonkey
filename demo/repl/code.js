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

const encodeChar = (char, k) => {
  const n = alphabet.indexOf(char.toLowerCase());
  if (n !== -1) {
    const encoded = alphabet[(n + k) % 26];
    return char.toUpperCase() === char ? encoded.toUpperCase() : encoded;
  } else {
    return char;
  }
}

const cc = (s, k) => [...s].map(c => encodeChar(c, k)).join('');

const overRange = (start, end, fn, init) => {
  let acc = init;
  for (let n = start; n <= end; n++) {
    acc = fn(acc, n);
  };
  return acc;
};

const sigma = (start, end, fn) => overRange(start, end, (acc, n) => acc + fn(n), 0);

const pi = (start, end, fn) => overRange(start, end, (acc, n) => acc * fn(n), 1);

const ffh = (n, a, b) => {
  if (n === 0) {
    return a;
  } else {
    return ffh(n - 1, b, a + b);
  }
};

const fastFib = (n) => {
  return ffh(n, 0, 1);
}

const fibtree = (n) => {
  if (n < 2) {
    return 1;
  } else {
    return 1 + fibtree(n - 2) + fibtree(n - 1);
  }
}

const unaryToNumbers = (unary) => {
  const r = [];
  let n = 0;
  for (let i = 0; i < unary.length; i++) {
    if (unary[i] === 1) {
      n++;
    } else {
      if (n > 0) {
        r.push(n);
        n = 0;
      }
    }
  }
  if (n > 0) r.push(n);
  return r;
}

const unaryToNumbersR = (unary) => {
  const helper = (n, bits) => {
    if (bits.length === 0) {
      return n > 0 ? [n] : [];
    } else {
      if (bits[0] === 1) {
        return helper(n + 1, bits.slice(1));
      } else {
        if (n > 0) {
          return [n, ...helper(0, bits.slice(1))];
        } else {
          return helper(0, bits.slice(1));
        }
      }
    }
  };
  return helper(0, unary);
}

class Foo {
  static random() {
    return new Foo();
  }
  toString() {
    return "I'm a Foo!"
  }
}

class Bar {
  static random() {
    return new Bar();
  }
  toString() {
    return "I'm a Bar!"
  }
}

console.log(Foo.random());
console.log(Bar.random());
console.log((Math.random() < 0.5 ? Foo : Bar).random());
