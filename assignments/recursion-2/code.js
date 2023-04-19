const add = (a, b) => {
  if (b === 0) {
    return a;
   } else {
     return 1 + add(a, b - 1);
   }
};

const multiply = (a, b) => {
  if (b === 0) {
    return 0;
  } else if (b === 1) {
    return a;
   } else {
     return a + multiply(a, b - 1);
   }
};

const double = (a, b) => b === 0 ? a : 2 * double(a, b - 1);

const triple = (a, b) => b === 0 ? a : 3 * triple(a, b - 1);

const power = (a, b) => b === 0 ? 1 : a * power(a, b - 1);

const deleteXs = (s) => {
  if (s === '') {
    return s;
   } else {
     if (s[0] === 'x') {
       return deleteXs(s.substring(1));       
     } else {
       return s[0] + deleteXs(s.substring(1));
     }
   }
};

const countXs = (s) => {
  return [...s].reduce((count, c) => count + (c === 'x' ? 1 : 0), 0);
}

const maximum = (ns) => ns.length === 0 ? -Infinity : Math.max(ns[0], maximum(ns.slice(1)));

const every = (xs, p) => xs.length === 0 || p(xs[0]) && every(xs.slice(1), p);

const some = (xs, p) => xs.length !== 0 && (p(xs[0]) || some(xs.slice(1), p));


/*

const add = (a, b) => b === 0 ? a : 1 + add(a, b - 1);

const multiply = (a, b) => b === 0 ? 0 : b === 1 ? a : a + multiply(a, b - 1);

const double = (a, b) => b === 0 ? a : 2 * double(a, b - 1);

const triple = (a, b) => b === 0 ? a : 3 * triple(a, b - 1);

const power = (a, b) => b === 0 ? 1 : a * power(a, b - 1);

const deleteXs = (s) => {
  if (s === '') {
    return s;
   } else {
     if (s[0] === 'x') {
       return deleteXs(s.substring(1));       
     } else {
       return s[0] + deleteXs(s.substring(1));
     }
   }
};

const countXs = (s) => {
  return [...s].reduce((count, c) => count + (c === 'x' ? 1 : 0), 0);
}

const maximum = (ns) => ns.length === 0 ? -Infinity : Math.max(ns[0], maximum(ns.slice(1)));

const every = (xs, p) => xs.length === 0 || p(xs[0]) && every(xs.slice(1), p);

const some = (xs, p) => xs.length !== 0 && (p(xs[0]) || some(xs.slice(1), p));

*/