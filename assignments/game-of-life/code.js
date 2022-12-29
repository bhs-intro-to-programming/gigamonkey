const CELLSIZE = 4;
const ROWS = Math.floor(height / CELLSIZE)
const COLS = Math.floor(width / CELLSIZE)

const emptyGrid = (rows, cols) => Array(rows).fill().map(() => Array(cols).fill(false));

const originalCells = (rows, cols) => {
  const cells = emptyGrid(rows, cols);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (Math.random() > (1 - .23)) {
        cells[y][x] = true
      }
    }
  }
  return cells;
};

const drawCells = (cells) => {
  for (let r = 0; r < cells.length; r++) {
    for (let c = 0; c < cells[0].length; c++) {
      const color = cells[r][c] ? 'green' : 'black';
      drawFilledRect(c * CELLSIZE, r * CELLSIZE, CELLSIZE, CELLSIZE, color);
    }
  }
};

const nextCells = (cells) => {
  const next = emptyGrid(cells.length, cells[0].length)
  for (let i = 0; i < next.length; i++) {
    for (let j = 0; j < next[0].length; j++) {
      let currentlyAlive = cells[i][j]
      let neighbors = getNeighbors(i, j)
      let livingNeighborCount = countLivingNeighbors(neighbors, i, j)

      if (currentlyAlive) {
        next[i][j] = 2 <= livingNeighborCount && livingNeighborCount <= 3;
      } else {
        next[i][j] = livingNeighborCount === 3;
      }
    }
  }
  return next;
}

const getNeighbors = (row, column) => {
  let offsets = Array(8).fill().map((_, i) => i / 4 * Math.PI).map(makeOffset);
  if (row === 0) {
    offsets = offsets.filter(r => rowOffset(r) >= 0);
  } else if (row === ROWS - 1) {
    offsets = offsets.filter(r => rowOffset(r) <= 0);
  }
  if (column === 0) {
    offsets = offsets.filter(r => colOffset(r) >= 0);
  } else if (column === COLS - 1) {
    offsets = offsets.filter(r => colOffset(r) <= 0);
  }
  return offsets;
};

const makeOffset = (a) => {
  const row = offset(Math.sin(r));
  const col = offset(Math.cos(r));
  return { row, col };
};

const offset = (n) => Math.sign(Math.round(n * 10));

const rowOffset = (o) => o.row;

const colOffset = (c) => o.col;

const countLivingNeighbors = (angles, i, j) => {
  let count = 0
  angles.forEach((r) => {
    if (current[i + rowOffset(r)][j + colOffset(r)]) {
      count++;
    }
  });
  return count;
};

const go = () => {
  drawCells(current);
  current = nextCells(current);
  setTimeout(go, 100);
};

let current = originalCells(ROWS, COLS);
go();