// Riley's code
const square = height / 10;
const boardTop = square / 2;
const bottom = boardTop + square * 9;
const left = (width / 2) - (height / 2);
const right = left + square * 9;

const drawBoard = () => {

  for (let i = 0; i < 10; i++) {
    const x = left + square * i;
    drawLine(x, boardTop, x, bottom, 'black', 1);
  }
  for (let j = 0; j < 10; j++) {
    const y = boardTop + square * j;
    drawLine(left, y, right, y, 'black', 1);
  }
  for (let i = 0; i < 4; i++) {
    const x = left + square * i * 3;
    drawLine(x, boardTop, x, bottom, 'black', 3)
  }
  for (let j = 0; j < 4; j++) {
    const y = boardTop + square * j * 3;
    drawLine(left, y, right, y, 'black', 3);
  }
}

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

const addSelect2Array = () => {
  for (let i = 0; i < 9; i++) {
    board[i][0] = i + 1
  }
  return board
}
//addSelect2Array()

const drawArray = (b) => {
  for (let j = 0; j < b.length; j++)
    for (let i = 0; i < b[j].length; i++) {
      drawText(b[j][i], (width / 2) - (height / 2) + (height / 10) * j, height / 9 * i, 'black', 25);
    }
}

const row = (y) => Math.floor(y / (height / 9))
const column = (x) => Math.floor(x / (width / 9))

/*
let aSelect = []
const move = (x, y) => {
  if (aSelect.length === 1) {
    drawText(aSelect, width / 9 * column(x), height / 9 * (row(y) + 1), 'black', 20)
    board[row(y)][column(x)] = aSelect[0]
    aSelect.pop(board[row(y)][column(x)])
    draw()
  } else {
    drawText(board[column(x)], (198 / 9 - 20) * column(x), 30, 'blue', 30)
    aSelect.push(board[column(x)])
  }
}
registerOnclick(move);
*/

const board = makeArray(9, 9)

const draw = () => {
  clear()
  drawBoard()
  drawArray(board)
}

draw();