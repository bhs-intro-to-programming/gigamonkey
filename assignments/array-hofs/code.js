// Helper function
const isEven = (n) => n % 2 === 0;

const evens = (numbers) => {
  return numbers.filter(isEven);
};

const odds = (numbers) => {
  return numbers.filter((n) => !isEven(n));
};

const big = (numbers) => {
  return numbers.filter((n) => n > 100);
};

const names = (students) => {
  return students.map((s) => s.name);
};

const grades = (students) => {
  return students.map((s) => s.grade);
};

const pairs = (xs) => {
  return xs.map((x) => [x, x]);
};

const averageGrade = (students) => {
  return students.reduce((tot, s) => tot + s.grade, 0) / students.length;
};

const flatpairs = (xs) => {
  return xs.flatMap((x) => [x, x]);
};

const allEven = (numbers) => {
  return numbers.every(isEven);
};

const someEven = (numbers) => {
  return numbers.some(isEven);
};

const lengthOfNames = (strings) => {
  return strings.filter((s) => s[0] === s[0].toUpperCase()).map((s) => s.length);
};