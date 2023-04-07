const triangular = (n) => n === 0 ? 0 : n + triangular(n - 1);

const factorial = (n) => n < 2 ? 1 : n * factorial(n - 1);

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

const sum = (ns) => ns.length === 0 ? 0 : ns[0] + sum(ns.slice(1));

const search = (xs, x) => xs.length === 0 ? true : xs[0] === x || search(xs.slice(1), x);
