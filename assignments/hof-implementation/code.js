// N.B. Do not use the array methods of the same name to implement these functions!

const filter = (predicate, array) => {
 return array.filter(predicate)
};

const map = (fn, array) => {
  return array.map(fn)
};

const flatMap = (fn, array) => {
  const r = [];
  for (const a of array) {
    for (const x of fn(a)) {
      r.push(x);
    }
  }
  return r;
};

const reduce = (fn, initialValue, array) => {
  return array.reduce(fn, initialValue)
};

const every = (predicate, array) => {
  return array.every(predicate)
};

const some = (predicate, array) => {
  return array.some(predicate)
};