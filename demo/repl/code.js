// Warning! Do not call this function with numbers much bigger than 40 unless
// you want to kill this tab.
const fib = (n) => (n < 2 ? n : fib(n - 2) + fib(n - 1));

// This one you can safely call with as big numbers as you want though after
// MAX_FIB_N it will return Infinity.
const fib2 = (n) => {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
    if (!isFinite(a)) break;
  }
  return a;
};

const x = { a: 1, b: 2, c: 3 };
const y = [ 'a', 'b', 'c'];


const add=(a,b)=>a+b;

const MAX_FIB_N = 1476;

const MAX_FIB = fib2(MAX_FIB_N);

const foo = () => { console.log(this.value); };

const bar = function () { console.log(this.value); };
/*
const x = { 
  value: 10, 
  baz: () => console.log(this),
  quux: function () { console.log(this) },
  biff() { console.log(this.value); }
};
x.foo = foo;
x.bar = bar;
*/