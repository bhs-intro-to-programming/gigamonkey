const upToX = (s) => {
  return s.substring(0, s.indexOf('x'));
};

const charactersAround = (s, i) => {
  return s[i - 1] + s[i + 1];
};

 