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

const squareSize = height / 10;
const boardTop = 0;
const boardBottom = boardTop + squareSize * 9;
const boardLeft = (width / 2) - (height / 2);
const boardRight = boardLeft + squareSize * 9;

const drawBoard = () => {
  for (let i = 0; i < 10; i++) {
    const x = boardLeft + squareSize * i;
    drawLine(x, boardTop, x, boardBottom, 'black', 1);
  }
  for (let j = 0; j < 10; j++) {
    const y = boardTop + squareSize * j;
    drawLine(boardLeft, y, boardRight, y, 'black', 1);
  }

  for (let i = 0; i < 4; i++) {
    const x = boardLeft + squareSize * i * 3;
    drawLine(x, boardTop, x, boardBottom, 'black', 3);
  }
  for (let j = 0; j < 4; j++) {
    const y = boardTop + squareSize * j * 3;
    drawLine(boardLeft, y, boardRight, y, 'black', 3);
  }
}

const drawArray = (b) => {
  for (let j = 0; j < b.length; j++)
    for (let i = 0; i < 10; i++) {
      drawText(b[j][i], boardLeft + squareSize * j, squareSize * i, 'black', 25);
    }
}

const draw = (b) => {
  clear()
  drawBoard()
  drawArray(b)
}

const board = makeArray(9, 10)

draw(board);
