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
      let locations = getLocationsForCell(i, j)
      let livingNeighborCount = countLivingNeighbors(locations, i, j)

      if (currentlyAlive) {
        next[i][j] = !(livingNeighborCount <= 1 || livingNeighborCount >= 4);
      } else {
        next[i][j] = livingNeighborCount === 3;
      }
    }
  }
  return next;
}

const countLivingNeighbors = (locations, i, j) => {
  let livingthings = 0

  locations.forEach(function (location) {
    let row = i;
    let col = j;
    switch (location) {
      case 0:
      case 45:
      case 315:
        row--;
        break;
      case 135:
      case 180:
      case 225:
        row++;
        break;
    }
    switch (location) {
      case 225:
      case 270:
      case 315:
        col--;
        break;
      case 45:
      case 90:
      case 135:
        col++;
        break;
    }
    if (current[row][col]) {
      livingthings++;
    }
  });
  return livingthings
}

const getLocationsForCell = (row, column) => {
  let locations = new Set(Array(8).fill().map((_, i) => i * 45));
  const remove = (...xs) => xs.forEach(n => locations.delete(n))
  if (row === 0) {
    remove(315, 0, 45);
  } else if (row === ROWS - 1) {
    remove(225, 180, 135);
  }
  if (column === 0) {
    remove(315, 270, 225);
  } else if (column === COLS - 1) {
    remove(45, 90, 135);
  }
  return locations;
}

const go = () => {
  drawCells(current);
  current = nextCells(current);
  setTimeout(go, 100);
};

let current = originalCells(ROWS, COLS);
go();