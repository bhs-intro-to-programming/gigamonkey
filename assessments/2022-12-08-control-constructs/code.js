const yesIfEven = (n) => {
  if (n % 2 === 0) {
    return 'yes';
  } else {
    return 'no';
  }
};

const countXs = (s) => {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'x') {
      count++;
    }
  }
  return count;
}