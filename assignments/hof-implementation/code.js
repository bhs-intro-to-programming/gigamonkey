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

//-------  Actual functions start here: ---------

const evens = (ary) =>{
  return filter((n) => n % 2 === 0, ary)
};

const odds = (ary) =>{
  return filter((n) => n % 2 !== 0, ary)
};

const big = (ary) =>{
  return filter((n) => n > 100, ary)
};

const names = (ary) =>{
  return map((n) => n["name"], ary)
};

const grades = (ary) =>{
  return map((n) => n["grade"], ary)
};

//????  i dont get it why does it work but then it doesnt work why it do this ugghhhhhhh
const pairs = (ary) =>{
  return flatMap((n) => [[n, n]], ary)
};

const averageGrade = (ary) =>{
  return reduce((tot, n) => n["grade"] / tot, 0, ary)
};

const flatpairs = (ary) =>{
  return flatMap((n) => [n, n], ary)
};

const allEven = (ary) =>{
  return every((n) => n % 2 === 0, ary)
};

const someEven = (ary) =>{
  return some((n) => n % 2 === 0, ary)
};

const lengthOfNames = (ary) =>{
  return map((n) => n.length, filter((n) => n[0].toUpperCase() === n[0], ary))
};