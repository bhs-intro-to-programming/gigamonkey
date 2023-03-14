const evens = (numbers) => {
  const r = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      r.push(numbers[i]);
    }
  }
  return r;
};

const shouty = (strings) => {
  const r = [];
  for (let i = 0; i < strings.length; i++) {
    r.push(strings[i].toUpperCase());    
  }
  return r;
};

const join = (strings, delimiter) => {
  let joined = null;
  for (let i = 0; i < strings.length; i++) {
    if (joined === null) {
      joined = strings[i];
    } else {
      joined += delimiter + strings[i];
    }
  }
  return joined;
};

const allSiblings = (students) => {
  const siblings = [];
  for (let i = 0; i < students.length; i++) {
    const sibs = students[i].siblings;
    for (let j = 0; j < sibs.length; j++) {
      siblings.push(sibs[j]);
    }
  }
  return siblings;
};