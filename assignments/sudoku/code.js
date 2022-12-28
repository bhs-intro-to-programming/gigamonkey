const makeArrayRow = (columns) => {
  let row = []
  for (let i = 0; i < columns; i++) {
    row.push(0)
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

const drawBoard = () => {
  for (let i = 0; i < 10; i++) {
    drawLine((width / 2) - (height / 2) + (height / 10) * i, 0, (width / 2) - (height / 2) + height / 10 * i, height, 'black', 1)
  }
  for (let j = 0; j < 11; j++) {
    drawLine((width / 2) - (height / 2 - height / 10), height / 9 * j, (width / 2) + (height / 2), height / 9 * j, 'black', 1)
  }
  for (let i = 0; i < 4; i++) {
    drawLine((width / 2) - (height / 2) + (height / 10) * i * 3 + height / 10, 0, (width / 2) - (height / 2) + height / 10 * i * 3 + height / 10, height, 'black', 3)
  }
  for (let j = 0; j < 4; j++) {
    drawLine((width / 2) - (height / 2 - height / 10), height / 9 * j * 3, (width / 2) + (height / 2), height / 9 * j * 3, 'black', 3)
  }
}

const drawArray = (b) => {
  for (let j = 0; j < b.length; j++)
    for (let i = 0; i < 10; i++) {
      drawText(b[j][i], (width / 2) - (height / 2) + (height / 10) * j, height / 9 * i, 'black', 25);
    }
}

const draw = (b) => {
  clear()
  drawBoard()
  drawArray(b)
}

const board = makeArray(9, 10)

draw(board);
