const cellsize = 5

const makeArrayRow = (columns) => {
  let row = []
  for (let i = 0; i < columns; i++) {
    if (Math.random() < 0.2) {
      row.push(1)
    } else {
      row.push(0)
    }
  }
  return row
}
const makeArray = (rows, columns) => {
  let b = []
  for (let i = 0; i < rows; i++) {
    b.push(makeArrayRow(columns))
  }
  return b;
}

const drawTheThings = (b, cellsize) => {
  drawFilledRect(0, 0, width, height, 'black')

  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < b[i].length; j++) {
      if (b[i][j] === 1) {
        drawFilledRect(j * cellsize, i * cellsize, cellsize, cellsize, 'palevioletred')
      }
    }
  }
}

const neighbors = (b, y, x) => {
  let n = 0
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i !== 0 || j !== 0) {
        const r = y + i;
        const c = x + j;
        if (0 <= r && r < b.length && 0 <= c && c < b[r].length) {
          if (b[r][c] === 1) n++;
        }
      }
    }
  }
  return n
}

const copyBoard = (b) => {
  const copy = [];
  for (let i = 0; i < b.length; i++) {
    copy[i] = [];
    for (let j = 0; j < b[i].length; j++) {
      copy[i].push(b[i][j]);
    }
  }
  return copy;
}

const updateBoard = (b) => {
  const old = copyBoard(b);;
  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < b[i].length; j++) {
      const n = neighbors(old, i, j);
      const alive = old[i][j] === 1 ? (n === 2 || n === 3) : n === 3;
      b[i][j] = alive ? 1 : 0;
    }
  }
}


let board = makeArray(Math.floor(height / cellsize), Math.floor(width / cellsize));

const redraw = (t) => {
  clear()
  updateBoard(board)
  drawTheThings(board, cellsize)
}

drawTheThings(board, cellsize);

animate(redraw)