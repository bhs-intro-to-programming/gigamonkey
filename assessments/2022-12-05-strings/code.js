const upToX = (s) => {
  return s.substring(0, s.indexOf('x'));
};

const charactersAround = (s, i) => {
  return s[i - 1] + s[i + 1];
};

const middle = (s) => {
  return s.substring(s.length * 0.25, s.length * 0.75);
};

const pair = (a, b) => {
  return a + ' and ' + b;
};