const getX = (o) => o.x;

const point = (x, y) => { return { x: x, y: y }; };

const emptyObject = () => ({});

const distance = (p1, p2) => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

const midpoint = (p1, p2) => point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);

const sumSalaries = (staff) => {
  let sum = 0;
  for (let i = 0; i < staff.length; i++) {
    sum += staff[i].salary;
  }
  return sum;
};

const newHighScore = (high, players) => {
  let max = high;
  for (let i = 0; i < players.length; i++) {
    max = Math.max(players[i].score, max);
  }
  return max;
};

const summarizeBooks = (books) => {
  let titles = [];
  let pages = 0;
  for (let i = 0; i < books.length; i++) {
    titles.push(books[i].title);
    pages += books[i].pages;
  }
  return { pages, titles };
};
