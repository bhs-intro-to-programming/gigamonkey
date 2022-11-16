// For a change of pace, I'm providing you with all the function skeletons. This
// should save you some time.

const area = (rect) => {
  return rect.width * rect.height;
};

const higherPaid = (e1, e2) => {
  if (e1.salary > e2.salary) {
    return e1;
  } else {
    return e2;
  }
};

const isSamePoint = (p1, p2) => {
  return p1.x === p2.x && p1.y === p2.y;
};

const totalWithTip = (bill, tipPercentage) => {
  const tip = bill.subtotal * tipPercentage;
  return {
    subtotal: bill.subtotal,
    tip: tip,
    total: bill.subtotal + tip,
  };
};

const isWinner = (player) => {
};

const updateWins = (players) => {
};

const bigWinners = (players) => {
};

const fillTimesTable = (table) => {
};

const sums = (n) => {
  const r = [];
  let tot = 0;
  for (let i = 0; i < n + 1; i++) {
    tot += i;
    r[i] = tot;
  }
  return r;
};

const rule110 = (cells) => {
};
