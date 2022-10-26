// This is a bit of a new thing. registerOnclick is a function provided by the
// framework. But the argument we're passing to it is *another* function. Notice
// how the argument here looks like what we normally put on the righthand side
// of the equals sign in our normal `const foo = ...` function definition. This
// is called an anonymous function. We'll discuss this in more detail in a few
// weeks but for now you can just adapt this code.

let move = 0;

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const boardSize = Math.min(width, height) - 20;
const boardX = (width - boardSize) / 2
const boardY = (height - boardSize) / 2;

const clickToCell = (x, y) => {
  const cellX = Math.floor(3 * (x - boardX) / boardSize);
  const cellY = Math.floor(3 * (y - boardY) / boardSize);
  if (0 <= cellX && cellX < 3 && 0 <= cellY && cellY < 3) {
    console.log(`${cellX},${cellY}`);
    const m = move % 2 === 0 ? 'X' : 'O';
    board[cellX][cellY] = m;
    move++;
    drawText(m, textX(cellX), textY(cellY), 'black', boardSize/3);
  }
};

const textX = (c) => boardX + c * boardSize / 3 + boardSize / 24;
const textY = (r) => boardY + (r + 1) * boardSize / 3 - boardSize / 24;

const drawBoard = (size) => {
  for (let i = 0; i < 2; i++) {
    const x = boardX + (boardSize / 3) * (i + 1);
    drawLine(x, boardY, x, boardY + boardSize, 'black', 3);
  }
  for (let i = 0; i < 2; i++) {
    const y = boardY + (boardSize / 3) * (i + 1);
    drawLine(boardX, y, boardX + boardSize, y, 'black', 3);
  }
};

registerOnclick(clickToCell);

drawBoard();