const getX = (obj) => {
  return obj.x;
}

const point = (x, y) => {
  return { x: x, y: y }
}

const emptyObject = () => {
  return {}
}

const distance = (p1, p2) => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

const midpoint = (p1, p2) => {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2
  }
}

const sumSalaries = (objs) => {
  let sum = 0
  for (let i = 0; i < objs.length; i++) {
    sum = sum + objs[i].salary;
  }
  return sum;
}

const newHighScore = (currentHighScore, players) => {
  let high = currentHighScore
  for (let i = 0; i < players.length; i++) {
    if (players[i].score > high) {
      high = players[i].score
    }
  }
  return high
}

const summarizeBooks = (books) => {
  const summary = { titles: [], pages: 0 }
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    summary.titles.push(book.title)
    summary.pages = summary.pages + book.pages
  }
  return summary
}
