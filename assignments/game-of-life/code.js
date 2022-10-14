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
  return grid;
};

const render = (grid) => {
  drawFilledRect(0, 0, width, height, 'white');
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c]) {
        fill(r, c);
      }
    }
  }
};

const inBounds = (index, array) => 0 <= index && index < array.length;

const neighborsAlive = (grid, r, c) => {
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (!(dx === 0 && dy === 0)) {
        const nr = r + dx;
        const nc = c + dy;
        if (inBounds(nr, grid) && inBounds(nc, grid[nr])) {
          if (grid[nr][nc]) {
            count++
          }
        }
      }
    }
  }
  return count;
};

const alive = (grid, r, c) => {
  const n = neighborsAlive(grid, r, c);
  return n === 3 || grid[r][c] && n == 2;
};

const nextGeneration = (grid) => {
  const next = [];
  for (let r = 0; r < grid.length; r++) {
    const row = [];
    for (let c = 0; c < grid[r].length; c++) {
      row.push(alive(grid, r, c));
    }
    next.push(row);
  }
  return next;
};

let state = randomStart(0.2);

render(state);

const step = () => {
  state = nextGeneration(state);
  render(state);
}