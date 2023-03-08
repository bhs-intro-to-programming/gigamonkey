const evens = (numbers) => {
  return numbers.filter((n) => n % 2 === 0);
};

const odds = (numbers) => {
  return numbers.filter((n) => n % 2 !== 0);
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