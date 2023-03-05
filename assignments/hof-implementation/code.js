const filter = (pre, ary) => {
  let ary2 = []
  for (let i = 0; i < ary.length; i++){
    if (pre(ary[i])){
      ary2.push(ary[i])
    }
  }
  return ary2
};

const map = (fn, ary) => {
  let ary2 = []
  for (let i = 0; i < ary.length; i++){
    ary2.push(fn(ary[i]))
  }
  return ary2
};

const flatMap = (fn, ary) => {
  let ary2 = []
  for (let i = 1; i < ary.length + 1; i++){
    for (let n = 0; n < fn(i).length; n++){
      ary2.push(fn(i)[n])
    }
  }
  return ary2
};

const reduce = (fn, initVal, ary) => {
  let lastNum = initVal
  for (let i = 0; i < ary.length; i++){
    lastNum = fn(lastNum, ary[i])
  }
  return lastNum
};

const every = (pred, ary) => {
  let trueCount = 0
  for (let i = 0; i < ary.length; i++){
    if (pred(ary[i])){
      trueCount ++
    }
  }
  return trueCount === ary.length
};

const some = (pred, ary) => {
  let trueCount = 0
  for (let i = 0; i < ary.length; i++){
    if (pred(ary[i])){
      trueCount ++
    }
  }
  return trueCount !== 0
};