const SIZE = 50;
const P = 0.2;
const RATE = 1500;

const columns = Math.floor(width / SIZE);
const rows = Math.floor(height / SIZE);
const xoffset = (width - columns * SIZE) / 2;
const yoffset = (height - rows * SIZE) / 2;

const render = (grid) => {
  drawFilledRect(0, 0, width, height, 'black');
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c]) {
        drawFilledRect(
          xoffset + c * SIZE,
          yoffset + r * SIZE,
          SIZE,
          SIZE,
          'rgb(0, 255, 0)'
        );
      }
    }
  }
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

const inBounds = (index, array) => 0 <= index && index < array.length;

const neighborsAlive = (grid, r, c) => {
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (!(dx === 0 && dy === 0)) {
        const nr = r + dx;
        const nc = c + dy;
        if (inBounds(nr, grid) && inBounds(nc, grid[nr]) && grid[nr][nc]) {
          count++
        }
      }
    }
  }
  return count;
};

const isAlive = (grid, r, c) => {
  const n = neighborsAlive(grid, r, c);
  return n === 3 || grid[r][c] && n == 2;
};

const nextGeneration = (grid) => {
  const next = [];
  for (let r = 0; r < grid.length; r++) {
    const row = [];
    for (let c = 0; c < grid[r].length; c++) {
      row.push(isAlive(grid, r, c));
    }
    next.push(row);
  }
  return next;
};

let state = randomStart(P);
let next = now();

const drawFrame = (t) => {
  if (t > next) {
    render(state);
    state = nextGeneration(state);
    next += RATE;
  }
};

animate(drawFrame);