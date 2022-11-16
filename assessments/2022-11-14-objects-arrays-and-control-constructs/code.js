// Advanced solutions using various features I've shown some of you (plus maybe even a couple that )



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
      table[i][j] = (i + 1) * (j + 1);
    });
  });
};

const sums = (n) => Array(n + 1).fill().map((_, i) => (i * (i + 1)) / 2);

const rule110 = (cells) => {
  return cells.map((center, i) => {
    const left = i === 0 ? 0 : cells[i - 1];
    const right = i === cells.length - 1 ? 0 : cells[i + 1];

    const allZeros = (left === 0 && center === 0 && right === 0);
    const oneAndSame = (left === 1 && center === right);

    return allZeros || oneAndSame ? 0 : 1;
  });
};
