
const product = (ns) => ns.length === 0 ? 1 : ns[0] * product(ns.slice(1));

const sumSquares = (n) => n === 0 ? 0 : n ** 2 + sumSquares(n - 1);

const lucas = (n) => n < 2 ? [2, 1][n] : lucas(n - 2) + lucas(n - 1);

const isAscending = (ns) => ns.length < 2 || ns[0] <= ns[1] && isAscending(ns.slice(1));

const isDescending = (ns) => ns.length < 2 || ns[0] >= ns[1] && isDescending(ns.slice(1));

const sumNested = (arg) =>
  isNumber(arg)
    ? arg
    : arg.length === 0
      ? 0
      : sumNested(arg[0]) + sumNested(arg.slice(1));

const searchNested = (tree, target) =>
  isNumber(tree)
    ? tree === target
    : (tree.length !== 0 &&
      (searchNested(tree[0], target) || searchNested(tree.slice(1), target)));

const fns = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

const evaluatex = (expr) =>
  isNumber(expr) ? expr : fns[expr.op](evaluate(expr.left), evaluate(expr.right));

const evaluate = (expr) => 
  isNumber(expr) 
    ? expr 
    : new Function(`return ${evaluate(expr.left)} ${expr.op} ${evaluate(expr.right)}`)();

/*

const product = (ns) => {
  if (ns.length === 0) {
    return 1;
  } else {
    return ns[0] * product(ns.slice(1));
  }
};

const sumSquares = (n) => {
  if (n === 0) {
    return 0;
  } else {
    return n ** 2 + sumSquares(n - 1);
  }
};

const lucas = (n) => {
  if (n === 0) {
    return 2;
  } else if (n === 1) {
    return 1;
  } else {
    return lucas(n - 2) + lucas(n - 1);
  }
};

const isAscending = (ns) => {
  if (ns.length < 2) {
    return true;
  } else {
    return ns[0] <= ns[1] && isAscending(ns.slice(1));
  }
};

const isDescending = (ns) => {
  if (ns.length < 2) {
    return true;
  } else {
    return ns[0] >= ns[1] && isDescending(ns.slice(1));
  }
};

const sumNested = (tree) => {
  if (isNumber(tree)) {
    return tree;
  } else if (tree.length === 0) {
    return 0;
  } else {
    return sumNested(tree[0]) + sumNested(tree.slice(1));
  }
};

const searchNested = (tree, target) => {
  if (isNumber(tree)) {
    return tree === target;
  } else if (tree.length === 0) {
    return false;
  } else {
    return searchNested(tree[0], target) || searchNested(tree.slice(1), target);
  }
};

const evaluate = (expr) => {
  if (isNumber(expr)) {
    return expr;
  } else {
    const left = evaluate(expr.left);
    const right = evaluate(expr.right);
    if (expr.op === '+') {
      return left + right;
    } else if (expr.op === '-') {
      return left - right;
    } else if (expr.op === '*') {
      return left * right;
    } else if (expr.op === '/') {
      return left / right;
    }
  }
};

*/

const sumPrimesBelow = (n) => {
  if (n === 0) {
    return 0;
  } else {
    if (isPrime(n)) {
      return n + sumPrimesBelow(n - 1);
    } else {
      return sumPrimesBelow(n - 1);
    }
  }
}

const factors = (n, fs, i) => {
  if (i === undefined) i = 2;
  if (n === 1) {
    return fs;
  } else {
    if (i ** 2 > n) {
      return fs.concat([n]);
    } else if (n % i === 0) {
      return factors(n / i, fs.concat([i]), 2);
    } else {
      return factors(n, fs, i + 1);
    }
  }
};




const isPrime = (n) => {
  const loop = (f) => f ** 2 > n || (n % f !== 0 && loop(f + 1));
  return n > 1 && loop(2);
}

const nthPrime = (n) => {
  const loop = (i, c) => {
    if (isPrime(i)) {
      return c === n ? i : loop(i + 1, c + 1);
    } else {
      return loop(i + 1, c);
    }
  }
  return loop(2, 1);
}

const filter = (xs, p) => {
  if (xs.length === 0) {
    return [];
  } else {
    const [first, ...rest] = xs;
    if (p(first)) {
      return [first, ...filter(rest, p)];
    } else {
      return filter(rest, p);
    }
  }
}

const rreduce = (xs, fn, value) => {
  if (xs.length === 0) {
    return value;
  } else {
    return fn(value, reduce(xs.slice(1), fn, xs[0]));
  }
}


const lreduce = (xs, fn, value) => {
  if (xs.length === 0) {
    return value;
  } else {
    return reduce(xs.slice(1), fn, fn(value, xs[0]));
  }
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

const caesar = (s, key) => {
  if (s === '') {
    return s;
  } else {
    return rotate(s[0], key) + caesar(s.substring(1), key);
  }
};

const toList = (xs) => {
  if (xs.length === 0) {
    return null;
  } else {
    return { first: xs[0], rest: toList(xs.slice(1)) };
  }
};


const map = (list, f) => {
  if (list === null) {
    return null;
  } else {
    return { first: f(list.first), rest: map(list.rest, f) };
  }
}