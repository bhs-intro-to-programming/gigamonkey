const CELLSIZE = 4;
const rows = Math.floor(height / CELLSIZE)
const cols = Math.floor(width / CELLSIZE)

let current =
  Array(rows).fill().map(() =>
    Array(cols).fill().map(() => (false)));

let next =
  Array(rows).fill().map(() =>
    Array(cols).fill().map(() => (false)));

const originalCells = () => {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (Math.random() > (1 - .23)) {
        drawFilledRect(x * CELLSIZE, y * CELLSIZE, CELLSIZE, CELLSIZE, 'green');
        current[y][x] = true
      } else {
        drawFilledRect(x * CELLSIZE, y * CELLSIZE, CELLSIZE, CELLSIZE, 'black');
      }
    }
  }
};

const drawNext = () => {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (next[y][x]) {
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
      let currentCellState = current[i][j]
      let locations = getLocationsForCell(i, j)
      let livingNeighborCount = countLivingNeighbors(locations, i, j)

      if (currentCellState) {
        // populated
        if (livingNeighborCount <= 1)
          next[i][j] = false
        else if (livingNeighborCount >= 4)
          next[i][j] = false
        else
          next[i][j] = true
      } else {
        // empty
        if (livingNeighborCount === 3) {
          next[i][j] = true
        } else {
          next[i][j] = false
        }
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

const without = (locations, items) => locations.filter(loc => !items.includes(loc));

const getLocationsForCell = (row, column) => {
  let locations = [0, 45, 90, 135, 180, 225, 270, 315];
  let idx;
  if (row === 0) {
    locations = without(locations, [315, 0, 45]);
  }
  if (row === rows - 1) {
    locations = without(locations, [225, 180, 135]);
  }
  if (column === cols - 1) {
    locations = without(locations, [45, 90, 135]);
  }
  if (column === 0) {
    locations = without(locations, [315, 270, 225]);
  }
  return locations;
}

const go = () => {
  doTheyLive()
  drawNext()
  current = next
  next = Array(rows).fill().map(() =>
    Array(cols).fill().map(() => (false)));
  setTimeout(go, 100);
}

originalCells()
go();