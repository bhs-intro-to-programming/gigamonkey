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

const whatLives = (b) => {
  const newboard = [];
  for (let i = 0; i < b.length; i++) {
    newboard.push([]);
    for (let j = 0; j < b[i].length; j++) {
      const n = neighbors(b, i, j);
      const alive = b[i][j] === 1 ? (n === 2 || n === 3) : n === 3;
      newboard[i].push(alive ? 1 : 0);
    }
  }
  return newboard;
}


let board = makeArray(Math.floor(height / cellsize), Math.floor(width / cellsize));

const redraw = (t) => {
  if (Math.floor(t) % 1000 === 0) {
    console.log(`redrawing ${t}`);
    clear()
    board = whatLives(board)
    drawTheThings(board, cellsize)
  } else {
    //console.log(`not redrawing ${t}`);

  }
}

drawTheThings(board, cellsize);

animate(redraw)