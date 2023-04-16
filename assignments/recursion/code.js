const factorial = (n) => {
  if (n === 0) {
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

const search = (xs, x) => {
  if (xs.length === 0) {
    return false;
  } else {
    return xs[0] === x || search(xs.slice(1), x);
  }
};

const reverseString = (s) => {
  if (s === '') {
    return s;
   } else {
     return reverseString(s.substring(1)) + s[0];
   }
};

const treeMap = (tree, fn) => {
  if (isLeaf(tree)) {
    return fn(tree);
  } else {
    return { left: treeMap(tree.left, fn), right: treeMap(tree.right, fn) };
  }
};

const change = (amt, coins) => {
  if (amt === 0) {
    return 1;
  } else if (amt < 0 || coins.length === 0) {
    return 0;
  } else {
    return change(amt - coins[0], coins) + change(amt, coins.slice(1));
  }
};
