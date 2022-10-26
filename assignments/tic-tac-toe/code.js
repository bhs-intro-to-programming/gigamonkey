// This is a bit of a new thing. registerOnclick is a function provided by the
// framework. But the argument we're passing to it is *another* function. Notice
// how the argument here looks like what we normally put on the righthand side
// of the equals sign in our normal `const foo = ...` function definition. This
// is called an anonymous function. We'll discuss this in more detail in a few
// weeks but for now you can just adapt this code.

const BOARD_COLOR = 'grey';
const MARK_COLOR = 'black';
const LINE_COLOR = 'red';

let move = 0;
let gameOver = false;

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
const cols = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
const diags = [[0, 4, 8], [6, 4, 2]];

const lines = [...rows, ...cols, ...diags];

const boardSize = Math.min(width, height) * 0.8;
const boxSize = boardSize / 3;
const boardX = (width - boardSize) / 2
const boardY = (height - boardSize) / 2;
const fontSize = boardSize / 3;

// Translate from 0-2 rows and column x and y on the canvas at the center
// of the corresponding box on the board
const centerX = (c) => boardX + boxSize / 2 + (c * boxSize);
const centerY = (r) => boardY + boxSize / 2 + (r * boxSize);

// Translate graphical x, y points on the canvas to 0-2 rows and columns.
// Note: may generate values outside the 0-2 range.
const xToColumn = (x) => Math.floor((x - boardX) / boxSize);
const yToRow = (y) => Math.floor((y - boardY) / boxSize);

// Check whether a coordinate returned by xToColumn and yToRow is 
// actually valid.
const valid = (coord) => 0 <= coord && coord < 3;

// Translate from the 0-2 rows and columns to the x, y point on the canvas
// where we should draw the text marker.
const textX = (c) => centerX(c) - boxSize / 3;
const textY = (r) => centerY(r) + boxSize / 3;

// Translate from the single numbers used in lines to row and column 
// coordinates used in board. Probably would be better to just use all
// 1-d arrays but I want to show how to represent the board in 2d.
const row = (n) => Math.floor(n / 3);
const col = (n) => n % 3;

const click = (x, y) => {
  if (!gameOver) {
    const column = xToColumn(x);
    const row = yToRow(y);
    maybeMakeMove(row, column);
  } else {
    reset();
  }
};

const maybeMakeMove = (row, column) => {
  if (valid(row) && valid(column) && board[row][column] === '') {
    const mark = move++ % 2 === 0 ? 'X' : 'O';
    board[row][column] = mark;
    drawText(mark, textX(column), textY(row), MARK_COLOR, fontSize);
    const w = findWinner(board);
    if (w !== null) {
      markThreeInARow(w);
      gameOver = true;
    }
    if (move === 9) gameOver = true;
  }
};

const findWinner = (board) => {
  for (let i = 0; i < lines.length; i++) {
    if (isWinner(extractLine(lines[i], board))) return lines[i];
  }
  return null;
};

const extractLine = (spec, board) => {
  let line = [];
  for (let i = 0; i < spec.length; i++) {
    const n = spec[i];
    line.push(board[row(n)][col(n)]);
  }
  return line;
};

const isWinner = (markers) => {
  if (markers[0] === '') return false;

  for (let i = 1; i < markers.length; i++) {
    if (markers[i] !== markers[0]) {
      return false;
    }
  }
  return true;
};

// Draw the empty board
const drawBoard = (size) => {
  for (let i = 0; i < 2; i++) {
    const x = boardX + (boardSize / 3) * (i + 1);
    drawLine(x, boardY, x, boardY + boardSize, BOARD_COLOR, 3);
  }
  for (let i = 0; i < 2; i++) {
    const y = boardY + (boardSize / 3) * (i + 1);
    drawLine(boardX, y, boardX + boardSize, y, BOARD_COLOR, 3);
  }
};

// Draw the fat line through the winning three-in-a-row. Slightly
// complex because we to extend the line a bit beyond the center of the
// start and end square.
const markThreeInARow = (line) => {
  const start = line[0];
  const end = line[line.length - 1];

  let startX = centerX(col(start));
  let startY = centerY(row(start));
  let endX = centerX(col(end));
  let endY = centerY(row(end));

  startY -= 0.25 * (endY - startY);
  startX -= 0.25 * (endX - startX);
  endY += 0.25 * (endY - startY);
  endX += 0.25 * (endX - startX);

  drawLine(startX, startY, endX, endY, LINE_COLOR, 16);
};

const reset = () => {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      board[r][c] = '';
    }
  }
  clear();
  drawBoard();
  move = 0;
  gameOver = false;
}

registerOnclick(click);
reset();