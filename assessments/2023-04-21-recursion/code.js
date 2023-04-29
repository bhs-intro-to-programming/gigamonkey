////////////////////////////////////////////////////////////////
// Write your code here ...

const factorial = (n) => {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};

const fibonacci = (n) => {
  if (n < 2) {
    return n;
  } else {
    return fibonacci(n - 2) + fibonacci(n - 1);
  }
};

const sumSquares = (n) => {
  if (n === 0) {
    return 0;
  } else {
    return n ** 2 + sumSquares(n - 1);
  }
};

const maximum = (numbers) => {
  if (numbers.length === 0) {
    return -Infinity;
  } else {
    return Math.max(numbers[0], maximum(numbers.slice(1)));
  }
};

const treeMap = (tree, fn) => {
  if (isLeaf(tree)) {
    return fn(tree);
  } else {
    return {
      left: treeMap(tree.left, fn),
      right: treeMap(tree.right, fn)
    };
  }
};

const sumPrimesBelow = (n) => {
  if (n === 2) {
    return n;
  } else {
    if (isPrime(n)) {
      return n + sumPrimesBelow(n - 1);
    } else {
      return sumPrimesBelow(n - 1);
    }
  }
};

const nvwls = (s) => {
  if (s === '') {
    return '';
  } else {
    if ("aeiou".indexOf(s[0].toLowerCase()) === -1) {
      return s[0] + nvwls(s.substring(1));
    } else {
      return nvwls(s.substring(1));
    }
  }
};

const caesar = (s, key) => {
  if (s === '') {
    return '';
  } else {
    return rotate(s[0], key) + caesar(s.substring(1), key);
  }
};

const toList = (array) => {
  if (array.length === 0) {
    return null;
  } else {
    return { first: array[0], rest: toList(array.slice(1)) }
  }
};

const map = (list, fn) => {
  if (list === null) {
    return null;
  } else {
    return { first: fn(list.first), rest: map(list.rest, fn) }
  }
};

////////////////////////////////////////////////////////////////
// Functions you will use in your code. No need to touch these
// or understand these beyond understanding what they do which
// is described in the appropriate questions.

const isLeaf = (o) => typeof o !== 'object' || (!(('left' in o) && ('right' in o)));

const isPrime = (n) => {
  const loop = (f) => f ** 2 > n || (n % f !== 0 && loop(f + 1));
  return n > 1 && loop(2);
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const mod = (n, m) => ((n % m) + m) % m;

const rotate = (char, places) => {
  const lower = char.toLowerCase();
  const i = alphabet.indexOf(lower);
  if (i === -1) {
    return char;
  } else {
    const rotated = alphabet[mod(i + places, alphabet.length)];
    return lower === char ? rotated : rotated.toUpperCase();
  }
}
