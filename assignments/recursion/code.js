const factorial = (n) => {
  if (n < 2) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};

const triangular = (n) => {
  if (n === 0) {
    return 0;
  } else {
    return n + triangular(n - 1);
  }
};

const fibonacci= (n) => {
  if (n < 2) {
    return n;
  } else {
    return fibonacci(n - 2) + fibonacci(n - 1);
  }
};

const gcd = (a, b) => {
  if (b === 0) {
    return a;
  } else {
    return gcd(b, a % b);
  }
};

const sum = (ns) => {
  if (ns.length === 0) {
    return 0;
  } else {
    return ns[0] + sum(ns.slice(1));
  }
};

const search = (xs, x) => xs.length > 0 && (xs[0] === x || search(xs.slice(1), x));

const reverseString = (s) => s === "" ? s : reverseString(s.substring(1)) + s[0];

const treeMap = (tree, fn) => {
  if (isLeaf(tree)) {
    return fn(tree);
  } else {
    return { left: treeMap(tree.left, fn), right: treeMap(tree.right, fn) };
  }
};

const change = (amt, coins) => {

  const table = coins.map((c) => [1, ...Array(c - 1).fill(1)]);

  const get = (i, c) => (i < 0 || c < 0) ? 0 : table[c][i % table[c].length];
  const put = (i, c, value) => table[c][i % table[c].length] = value;

  for (let i = 1; i <= amt; i++) {
    for (let c = 0; c < coins.length; c++) {
      put(i, c, get(i - coins[c], c) + get(i, c - 1));
    }
  }

  return get(amt, coins.length - 1);
};

const changex = (c, v) => c === 0 ? 1 : c < 0 || v.length === 0 ? 0 : change(c - v[0], v) + change(c, v.slice(1))