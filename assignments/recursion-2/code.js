const addition = (a, b) => b === 0 ? a : 1 + addition(a, b - 1);

const multiply = (a, b) => b === 0 ? 0 : b === 1 ? a : a + multiply(a, b - 1);