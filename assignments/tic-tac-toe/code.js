// This is a bit of a new thing. registerOnclick is a function provided by the
// framework. But the argument we're passing to it is *another* function. Notice
// how the argument here looks like what we normally put on the righthand side
// of the equals sign in our normal `const foo = ...` function definition. This
// is called an anonymous function. We'll discuss this in more detail in a few
// weeks but for now you can just adapt this code.

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


const boardSize = Math.min(width, height) - 20;
const boxSize = boardSize / 3;
const boardX = (width - boardSize) / 2
const boardY = (height - boardSize) / 2;
const fontSize = boardSize / 3;

const clickToCell = (x, y) => {
  if (!gameOver) {
    const column = Math.floor(3 * (x - boardX) / boardSize);
    const row = Math.floor(3 * (y - boardY) / boardSize);
    if (0 <= row && row < 3 && 0 <= column && column < 3) {
      if (board[row][column] === '') {
        const m = move % 2 === 0 ? 'X' : 'O';
        board[row][column] = m;
        move++;
        drawText(m, textX(column), textY(row), 'black', fontSize);
        if (isWon(board)) {
          console.log('Winner!');
          gameOver = true;
        }
      }
    }
  }
};

const isWon = (board) => {
  for (let i = 0; i < board.length; i++) {
    if (winner(row(board, i))) return true;
    if (winner(column(board, i))) return true;
    if (i < 3 && winner(diagonal(board, i))) return true;
  }
  return false;
};

const extractLine = (line, board) => {
  let line = [];
  for (let i = 0; i < line.length; i++) {
    const r = Math.floor(line[i] / 3);
    const c = line[i] % 3;
    line.push(board[r][c]);
  }
};

const winner = (line) => {
  if (line[0] === '') return false;

  for (let i = 1; i < line.length; i++) {
    if (line[i] !== line[0]) {
      return false;
    }
  }
  return true;
};

const row = (board, r) => {
  return board[r];
};

const column = (board, c) => {
  const col = [];
  for (let r = 0; r < board.length; r++) {
    col.push(board[r][c]);
  }
  return col;
};

const diagonal = (board, d) => {
  if (d === 0) {
    return [board[0][0], board[1][1], board[2][2]];
  } else {
    return [board[0][2], board[1][1], board[2][0]];
  }
}

const centerX = (c) => boardX + boxSize / 2 + (c * boxSize);
const centerY = (r) => boardY + boxSize / 2 + (r * boxSize);

const textX = (c) => centerX(c) - boxSize / 3;
const textY = (r) => centerY(r) + boxSize / 3;

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