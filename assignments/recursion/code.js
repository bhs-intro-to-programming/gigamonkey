const triangular = (n) => n === 0 ? 0 : n + triangular(n - 1);

const factorial = (n) => n < 2 ? 1 : n * factorial(n - 1);