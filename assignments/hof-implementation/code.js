// N.B. Do not use the array methods of the same name to implement these functions!

const filter = (predicate, array) => {
  let a = []
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i]))
      a.push(array[i])
  }
  return a
};

const map = (fn, array) => {
  let a = []
  for (let i = 0; i < array.length; i++) {
    a.push(fn(array[i]))
  }
  return a
};


const flatMap = (fn, array) => {
  let a = []
  for (let i = 0; i < array.length; i++) {
    let p = fn(array[i])
    for (let j= 0; j < p.length; j++){
      a.push(p[j])
    }
  }
  return a
};


const reduce = (fn, initialValue, array) => {

  };


const every = (predicate, array) => {
  for (let i = 0; i < array.length; i++) {
    if (!predicate(array[i])){
  return false
    }
  }
  return true
}


const some = (predicate, array) => {
  return predicate(array[0]);
}