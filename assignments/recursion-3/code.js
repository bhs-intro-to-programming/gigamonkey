const product = (ns) => ns.length === 0 ? 1 : ns[0] * product(ns.slice(1));

const sumSquares = (n) => n === 0 ? 0 : n ** 2 + sumSquares(n - 1);

const lucas = (n) => n < 2 ? [2, 1][n] : lucas(n - 2) + lucas(n - 1);

const isAscending = (ns) => ns.length < 2 || ns[0] <= ns[1] && isAscending(ns.slice(1));

const isDescending = (ns) => ns.length < 2 || ns[0] >= ns[1] && isDescending(ns.slice(1));

const sumNested = (arg) => arg.length === 0 ? 0 : isNumber(arg) ? arg : sumNested(arg[0]) + sumNested(arg.slice(1));

const searchNested = (tree, target) => {
  if (isNumber(tree)) {
    return tree === target;
  } else if (tree.length === 0) {
    return false;
  } else {
    return searchNested(tree[0], target) || searchNested(tree.slice(1), target);
  }
};

const evaluate = (expr) => {
  if (isNumber(expr)) {
    return expr;
  } else {
    const left = evaluate(expr.left);
    const right = evaluate(expr.right);
    if (expr.op === '+') {
      return left + right;
    } else if (expr.op === '-') {
      return left - right;
    } else if (expr.op === '*') {
      return left * right;
    } else if (expr.op === '/') {
      return left / right;
    }
  }
};

/*

const product = (ns) => {
  if (ns.length === 0) {
    return 1;
  } else {
    return ns[0] * product(ns.slice(1));
  }
};

const sumSquares = (n) => {
  if (n === 0) {
    return 0;
  } else {
    return n ** 2 + sumSquares(n - 1);
  }
};

const lucas = (n) => {
  if (n === 0) {
    return 2;
  } else if (n === 1) {
    return 1;
  } else {
    return lucas(n - 2) + lucas(n - 1);
  }
};

const isAscending = (ns) => {
  if (ns.length < 2) {
    return true;
  } else {
    return ns[0] <= ns[1] && isAscending(ns.slice(1));
  }
};

const isDescending = (ns) => {
  if (ns.length < 2) {
    return true;
  } else {
    return ns[0] >= ns[1] && isDescending(ns.slice(1));
  }
};

const sumNested = (arg) => {
  if (arg.length === 0) {
    return 0; 
  } else if (isNumber(arg)) {
    return arg;
  } else {
    return sumNested(arg[0]) + sumNested(arg.slice(1));
  }
};

const searchNested = (tree, target) => {
  if (isNumber(tree)) {
    return tree === target;
  } else if (tree.length === 0) {
    return false;
  } else {
    return searchNested(tree[0], target) || searchNested(tree.slice(1), target);
  }
};

const evaluate = (expr) => {
  if (isNumber(expr)) {
    return expr;
  } else {
    const left = evaluate(expr.left);
    const right = evaluate(expr.right);
    if (expr.op === '+') {
      return left + right;
    } else if (expr.op === '-') {
      return left - right;
    } else if (expr.op === '*') {
      return left * right;
    } else if (expr.op === '/') {
      return left / right;
    }
  }
};

*/