const size = 4;

const columns = Math.floor(width / size);
const rows = Math.floor(height / size);

const fill = (r, c) => {
  drawFilledRect(c * size, r * size, size, size, 'green');
};

const randomStart = (p) => {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < columns; c++) {
      row.push(Math.random() < p);
    }
    grid.push(row);
  }
};

const render = (grid) => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c]) {
        fill(r, c);
      }
    }
  }
}

render(randomStart(0.2));