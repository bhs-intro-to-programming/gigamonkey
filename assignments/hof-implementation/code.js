// N.B. Do not use the array methods of the same name to implement these functions!

const filter = (predicate, array) => {
 return array.filter(predicate)
};

const map = (fn, array) => {
  return array.map(fn)
};

const flatMap = (fn, array) => {
  return array.flatMap(fn)
};

const reduce = (fn, initialValue, array) => {
  return array.reduce(initialValue(fn))
};

const every = (predicate, array) => {
  return array.every(predicate)
};

const some = (predicate, array) => {
  return array.some(predicate)
};