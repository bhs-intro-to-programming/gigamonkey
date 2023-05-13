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

/*
console.log(Foo.random());
console.log(Bar.random());
console.log((Math.random() < 0.5 ? Foo : Bar).random());
*/

const reduce = (xs, fn, init) => {
  if (xs.length === 0) {
    return init;
  } else {
    return reduce(xs.slice(1), fn, fn(init, xs[0]));
  }
};

const filter = (xs, p) => {
  if (xs.length === 0) {
    return [];
  } else {
    if (p(xs[0])) {
      return [xs[0], ...filter(xs.slice(1), p)];
    } else {
      return filter(xs.slice(1), p);
    }
  }
};

const makeAnswer = (gu) => {

  const taken = Array(gu.length).fill().map((_, i) => i);

  const answer = []

  for (let j = 0; j < gu.length; j++) {
    // With some probability take a random unused value from the current gen and
    // push it on the answer. Otherwise push the current value
    if (Math.random() < 0.1 || taken.indexOf(gu[j]) === -1) {
      console.log(`here ${taken.indexOf(gu[j]) === -1}`)
      // Pick a random index that hasn't been used yet.
      const i = Math.floor(Math.random() * taken.length)
      answer.push(taken[i])
      taken.splice(i, 1)
    } else {
      answer.push(gu[j])
      taken.splice(taken.indexOf(gu[j]), 1)
    }
  }
  return answer;
}

const r = (n) => Math.floor(Math.random() * n);

const swap = (c) => {
  const a = r(c.length);
  const b = (a + 1 + r(c.length - 1)) % c.length;
  const tmp = c[a];
  c[a] = c[b];
  c[b] = tmp;
};

const foo = (c, n) => {
  const next = [...c];
  for (let i = 0; i < n; i++) {
    swap(next);
  }
  return next;
};

const start = Array(10).fill().map((_, i) => i)
const start2 = foo(start, 10);

const isPrimeR = (n) => {
  const lim = Math.sqrt(n);
  const loop = (f) => {
    if (f > lim) {
      return true;
    } else if (n % f === 0) {
      return false;
    } else {
      return loop(f + 1);
    }
  }
  return loop(2);
}

const isPrime = (n) => {
  for (let f = 2; f <= lim; f++) {
    if (n % f === 0) {
      return false;
    }
  }
  return true;
}

const coprime = (n, m) => {
  const nf = factors(n);
  const mf = factors(m);
  return !nf.some(f => mf.indexOf(f) !== -1);
}

const nextPrime = (p) => {
  const loop = (n) => isPrime(n) ? n : loop(n + 1);
  return loop(p + 1);
};

const factors = (n) => {
  const loop = (n, f, soFar) => {
    if (n === 1) {
      return soFar;
    } else {
      if (n % f === 0) {
        return loop(n / f, 2, [...soFar, f]);
      } else {
        return loop(n, nextPrime(f), soFar);
      }
    }
  }
  return loop(n, 2, []);
};

const triples = (n) => {
  let r = [];
  for (let a = 1; a <= n - 2; a++) {
    for (let b = a + 1; b <= n - 1; b++) {
      for (let c = b + 1; c < n; c++) {
        if (a ** 2 + b ** 2 === c ** 2) {
          if (coprime(a, b) && coprime(b, c) && coprime(a, c)) {
            r.push([a, b, c]);
          }
        }
      }
    }
  }
  return r;
}