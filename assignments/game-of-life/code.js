const SIZE = 50;
const P = 0.2;
let RATE = 0;

const GOSPER_GG = `
........................#...........
......................#.#...........
............##......##............##
...........#...#....##............##
##........#.....#...##..............
##........#...#.##....#.#...........
..........#.....#.......#...........
...........#...#....................
............##......................
`;

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

const isAlive = (grid, r, c) => {
  const n = neighborsAlive(grid, r, c);
  return n === 3 || grid[r][c] && n == 2;
};

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

const inBounds = (index, array) => 0 <= index && index < array.length;

const newGrid = () => {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < columns; c++) {
      row.push(false);
    }
    grid.push(row);
  }
  return grid;
};

const addPattern = (grid, top, left, pattern) => {
  const p = pattern.trim().split('\n');
  for (let r = 0; r < p.length; r++) {
    for (let c = 0; c < p[r].length; c++) {
      grid[top + r][left + c] = p[r][c] === '#';
    }
  }
}

const randomState = (p) => {
  const grid = newGrid();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      grid[r][c] = Math.random() < p;
    }
  }
  return grid;
};

//let state = randomState(P);
let state = newGrid();
addPattern(state, 1, 1, GOSPER_GG);
let next = now();

const drawFrame = (t) => {
  if (t > next) {
    render(state);
    state = nextGeneration(state);
    next += RATE;
  }
};

animate(drawFrame);