const CELLSIZE = 4;
const rows = Math.floor(height / CELLSIZE)
const cols = Math.floor(width / CELLSIZE)

let next =
  Array(rows).fill().map(() =>
    Array(cols).fill().map(() => (false)));

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

const drawWorld = (world) => {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (world[y][x]) {
        drawFilledRect(x * CELLSIZE, y * CELLSIZE, CELLSIZE, CELLSIZE, 'green');
      } else {
        drawFilledRect(x * CELLSIZE, y * CELLSIZE, CELLSIZE, CELLSIZE, 'black');
      }
    }
  }
};

const doTheyLive = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let currentlyAlive = current[i][j]
      let locations = getLocationsForCell(i, j)
      let livingNeighborCount = countLivingNeighbors(locations, i, j)

      if (currentlyAlive) {
        next[i][j] = !(livingNeighborCount <= 1 || livingNeighborCount >= 4);
      } else {
        next[i][j] = livingNeighborCount === 3;
      }
    }
  }
}

const countLivingNeighbors = (locations, i, j) => {
  let livingthings = 0
  locations.forEach(function (location) {
    switch (location) {
      case 0:
        if (current[i - 1][j])
          livingthings++
        break;
      case 45:
        if (current[i - 1][j + 1])
          livingthings++
        break;
      case 90:
        if (current[i][j + 1])
          livingthings++
        break;
      case 135:
        if (current[i + 1][j + 1])
          livingthings++
        break;
      case 180:
        if (current[i + 1][j])
          livingthings++
        break;
      case 225:
        if (current[i + 1][j - 1])
          livingthings++
        break;
      case 270:
        if (current[i][j - 1])
          livingthings++
        break;
      case 315:
        if (current[i - 1][j - 1])
          livingthings++
        break;
      default:
        break;
    }
  }
  )
  return livingthings
}

const without = (xs, toRemove) => xs.filter(x => !toRemove.includes(x));

const getLocationsForCell = (row, column) => {
  let locations = [0, 45, 90, 135, 180, 225, 270, 315];
  if (row === 0) {
    locations = without(locations, [315, 0, 45]);
  } else if (row === rows - 1) {
    locations = without(locations, [225, 180, 135]);
  }
  if (column === cols - 1) {
    locations = without(locations, [45, 90, 135]);
  } else if (column === 0) {
    locations = without(locations, [315, 270, 225]);
  }
  return locations;
}

const go = () => {
  doTheyLive()
  drawWorld(next)
  current = next
  next = Array(rows).fill().map(() =>
    Array(cols).fill().map(() => (false)));
  setTimeout(go, 100);
}

const current = originalCells(rows, cols)
go();