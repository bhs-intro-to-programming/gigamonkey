const filter = (predicate, array) => {
  let r = [];
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      r.push(array[i]);
    }
  }
  return r;
};

const map = (fn, array) => {
  let r = [];
  for (let i = 0; i < array.length; i++) {
    r.push(fn(array[i]));    
  }
  return r;
};