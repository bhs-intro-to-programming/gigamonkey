const add = (a, b) => b === 0 ? a : 1 + add(a, b - 1);

const multiply = (a, b) => b === 0 ? 0 : b === 1 ? a : a + multiply(a, b - 1);

const double = (a, b) => b === 0 ? a : 2 * double(a, b - 1);

const triple = (a, b) => b === 0 ? a : 3 * triple(a, b - 1);

const power = (a, b) => b === 0 ? 1 : a * power(a, b - 1);