// Riley's code
const boardSize = Math.min(width, height) * 0.9;
const square = boardSize / 9;
const boardTop = (height - boardSize) / 2;
const boardBottom = boardTop + square * 9;
const boardLeft = (width - boardSize) / 2;
const boardRight = boardLeft + square * 9;

const drawBoard = () => {
  for (let i = 0; i < 10; i++) {
    const x = boardLeft + square * i;
    drawLine(x, boardTop, x, boardBottom, 'black', 1);
  }
  for (let j = 0; j < 10; j++) {
    const y = boardTop + square * j;
    drawLine(boardLeft, y, boardRight, y, 'black', 1);
  }
  for (let i = 0; i < 4; i++) {
    const x = boardLeft + square * i * 3;
    drawLine(x, boardTop, x, boardBottom, 'black', 3)
  }
  for (let j = 0; j < 4; j++) {
    const y = boardTop + square * j * 3;
    drawLine(boardLeft, y, boardRight, y, 'black', 3);
  }
};

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

const drawArray = (b) => {
  for (let j = 0; j < b.length; j++)
    for (let i = 0; i < b[j].length; i++) {
      const x = boardLeft + square * j + square * 0.33;
      const y = boardTop + square * i + square * 0.75;
      drawText(b[j][i], x, y, 'black', square * 0.75);
    }
}

const row = (y) => Math.floor((y - boardTop) / square);
const column = (x) => Math.floor((x - boardLeft) / square);

registerOnclick((x, y) => {
  console.log(`row: ${row(y)}; column: ${column(x)}`);
});

const board = makeArray(9, 9)

const draw = () => {
  clear()
  drawBoard()
  drawArray(board)
}

draw();