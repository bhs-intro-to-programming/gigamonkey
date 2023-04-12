const factorial = (n) => n < 2 ? 1 : n * factorial(n - 1);

const triangular = (n) => n === 0 ? 0 : n + triangular(n - 1);

const fibonacci = (n) => {
  const helper = (n, a, b) => {
    return n === 0 ? a : helper(n - 1, b, a + b);
  }
  return helper(n, 0, 1);
}

const fibonacciX = (n) => n < 2 ? n : fibonacci(n - 2) + fibonacci(n - 1);

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

const sum = (ns) => ns.length === 0 ? 0 : ns[0] + sum(ns.slice(1));

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

  const table = coins.map((c) => [1, ...Array(c - 1).fill(0)]);

  const get = (i, c) => (i < 0 || c < 0) ? 0 : table[c][i % table[c].length];
  const put = (i, c, value) => table[c][i % table[c].length] = value;

  for (let i = 1; i <= amt; i++) {
    for (let c = 0; c < coins.length; c++) {
      put(i, c, get(i - coins[c], c) + get(i, c - 1));
    }
  }

  return get(amt, coins.length - 1);
};
