// N.B. Do not use the array methods of the same name to implement these functions!

const filter = (predicate, array) => {
  let list = []
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])){
      list.push(array[i])
    }
  }
  return list
};

const map = (fn, array) => {
  let list = []
  for (let i = 0; i < array.length; i++) {
    list.push(fn(array[i]))
  }
  return list
};

const reduce = (fn, initialValue, array) => {
  let number = initialValue
  for (let i = 0; i < array.length; i++) {
    number = fn(number, array[i])
  }
  return number
};

const flatMap = (fn, array) => {
  let list = []
  
  for ( let i = 0; i < array.length; i++) {
    let abc = fn(array[i])
    for (let l = 0; l < abc.length; l++) {
      list.push(abc[l])
    }
  }
  return list
};

const every = (predicate, array) => {
  for (let i = 0; i < array.length; i++) {
    if (!predicate(array[i])) {
      return false
    }
  }
  return true
};

const some = (predicate, array) => {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return true
    }
  }
  return false
};