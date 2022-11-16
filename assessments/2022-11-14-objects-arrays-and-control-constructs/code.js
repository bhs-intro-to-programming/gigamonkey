// For a change of pace, I'm providing you with all the function skeletons. This
// should save you some time.

const area = (rect) => rect.width * rect.height;

const higherPaid = (e1, e2) => e1.salary > e2.salary ? e1 : e2;

const isSamePoint = (p1, p2) => p1.x === p2.x && p1.y === p2.y;

const totalWithTip = (bill, tipPercentage) => {
  const subtotal = bill.subtotal;
  const tip = bill.subtotal * tipPercentage;
  const total = subtotal + tip;
  return { subtotal, tip, total };
};

const isWinner = (player) => player.score > 100;

const updateWins = (players) => {
  players.forEach((p) => {
    if (isWinner(p)) p.wins++;
  });
};

const bigWinners = (players) => players.filter((p) => p.wins > 10);

const fillTimesTable = (table) => {
  table.forEach((row, i) => {
    row.forEach((_, j) => {
      row[i][j] = (i + 1) * (j + 1);
    });
  });
};

const sums = (n) => Array(n + 1).fill().map((_, i) => (i * (i + 1)) / 2);

const rule110 = (cells) => {
  let next = [];
  for (let i = 0; i < cells.length; i++) {
    let left;
    let right;
    const center = cells[i];
    if (i === 0) {
      left = 0;
    } else {
      left = cells[i - 1];
    }
    if (i === cells.length - 1) {
      right = 0;
    } else {
      right = cells[i + 1];
    }

    const allZeros = (left === 0 && center === 0 && right === 0);
    const oneAndSame = (left === 1 && center === right);

    if (allZeros || oneAndSame) {
      next.push(0);
    } else {
      next.push(1);
    }
  }
  return next;
};
