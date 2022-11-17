const getX = (obj) => obj.x;

const point = (x, y) => ({x, y});

const emptyObject = () => ({});

const distance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

const midpoint = (p1, p2) => ({
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2
  });

const sumSalaries = (objs) => objs.reduce((acc, o) => acc + o.salary, 0);

const newHighScore = (current, players) => 
  players.reduce((high, p) => Math.max(high, p.score), current);

const summarizeBooks = (books) => {
  const summary = { titles: [], pages: 0 }
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    summary.titles.push(book.title)
    summary.pages = summary.pages + book.pages
  }
  return summary
}
