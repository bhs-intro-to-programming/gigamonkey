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

const reduce = (fn, initialValue, array) => {
  let value = initialValue;
  for (let i = 0; i < array.length; i++) {
    value = fn(value, array[i]);
  }
  return value;
};

const flatMap = (fn, array) => {
  let r = [];
  for (let i = 0; i < array.length; i++) {
    const subarray = fn(array[i]);
    for (let j = 0; j < subarray.length; j++) {
      r.push(subarray[j]);
    }
  }
  return r;
};

const every = (predicate, array) => {
  for (let i = 0; i < array.length; i++) {
    if (!predicate(array[i])) {
      return false;
    }
  }
  return true;
};

const some = (predicate, array) => {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return true;
    }
  }
  return false;
};