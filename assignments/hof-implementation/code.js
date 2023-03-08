const filter = (fn, array) => {
  let r = [];
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i])) {
      r.push(array[i]);
    }
  }
  return r;
};