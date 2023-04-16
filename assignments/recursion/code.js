const factorial = (n) => n === 0 ? 1 : n * factorial(n - 1);

const triangular = (n) => n === 0 ? 0 : n + triangular(n - 1);

const fibonacci= (n) => n < 2 ? n : fibonacci(n - 2) + fibonacci(n - 1);

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

const sum = (ns) => ns.length === 0 ? 0 : ns[0] + sum(ns.slice(1));

const search = (xs, x) => xs.length > 0 && (xs[0] === x || search(xs.slice(1), x)); 

const reverseString = (s) => s === '' ? '' : reverseString(s.substring(1)) + s[0];

const treeMap = (tree, fn) => isLeaf(tree)
  ? fn(tree)
  : { left: treeMap(tree.left, fn), right: treeMap(tree.right, fn) };

const change = (amt, coins) => {
  if (amt === 0) {
    return 1;
  } else if (amt < 0 || coins.length === 0) {
    return 0;
  } else {
    return change(amt - coins[0], coins) + change(amt, coins.slice(1));
  }
};
