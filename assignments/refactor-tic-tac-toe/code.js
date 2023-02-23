const boardSize = Math.min(width, height) * 0.75;
const boardLeft = (width - boardSize) / 2;
const boardTop = (height - boardSize) / 2;
const cellSize = boardSize / 3;
const fontSize = boardSize / 3;
const lineEndAdjustment = cellSize * 0.7;

let move = 0;

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const lines = [
  // Rows
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],

  // Cols
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],

  // Diagonals
  [[0, 0], [1, 1], [2, 2]],
  [[2, 0], [1, 1], [0, 2]],
];

const drawTheBoard = () => {
  for (let i = 1; i <= 2; i++) {
    drawVerticalLine(boardLeft + i * cellSize);
    drawHorizontalLine(boardTop + i * cellSize);
  }
};

const drawVerticalLine = (x) => {
  drawLine(x, boardTop, x, boardTop + boardSize, 'grey', 2);
};

const drawHorizontalLine = (y) => {
  drawLine(boardLeft, y, boardLeft + boardSize, y, 'grey', 2);
};

const findWinner = () => {
  for (let i = 0; i < lines.length; i++) {
    const marks = [];
    let r = lines[i][0][0];
    let c = lines[i][0][1];
    marks.push(board[r][c]);
    r = lines[i][1][0];
    c = lines[i][1][1];
    marks.push(board[r][c]);
    r = lines[i][2][0];
    c = lines[i][2][1];
    marks.push(board[r][c]);
    if (marks[0] !== '' && marks[0] === marks[1] && marks[0] === marks[2]) {
      return lines[i];
    }
  }
  return null;
};

const drawWinningLine = (winner) => {
  const [r1, c1] = winner[0];
  const [r2, c2] = winner[winner.length - 1];

  const x1 = boardLeft + c1 * cellSize + cellSize / 2;
  const y1 = boardTop + r1 * cellSize + cellSize / 2;
  const x2 = boardLeft + c2 * cellSize + cellSize / 2;
  const y2 = boardTop + r2 * cellSize + cellSize / 2;

  let adjX1 = x1;
  let adjX2 = x2;
  let adjY1 = y1;
  let adjY2 = y2;

  if (y1 === y2 || x1 !== x2) {
    adjX1 -= lineEndAdjustment;
    adjX2 += lineEndAdjustment;
  }

  if (x1 === x2 || y1 !== y2) {
    const slope = y1 < y2 ? 1 : -1;
    adjY1 -= (slope * lineEndAdjustment);
    adjY2 += (slope * lineEndAdjustment);
  }

  drawLine(adjX1, adjY1, adjX2, adjY2, 'red', 15);
};

const makeMove = (r, c) => {
  const marker = move % 2 === 0 ? 'X' : 'O';
  const x = boardLeft + c * cellSize + cellSize / 2;
  const y = boardTop + r * cellSize + cellSize / 2;
  const nudge = marker === 'O' ? cellSize / 9 : cellSize / 19;
  drawText(marker, x - (fontSize * 0.3 + nudge), y + fontSize * 0.3, 'black', fontSize);
  board[r][c] = marker;
  move++;
};

const gameOver = () => findWinner() !== null || move === 9;

const isLegalMove = (r, c) => {
  return 0 <= r && r < 3 && 0 <= c && c < 3 && board[r][c] === '';
};

const maybeDrawWinningLine = (winner) => {
  if (winner !== null) {
    drawWinningLine(winner);
  }
};

registerOnclick((x, y) => {

  const r = Math.floor((y - boardTop) / cellSize);
  const c = Math.floor((x - boardLeft) / cellSize);

  if (!gameOver()) {
    if (isLegalMove(r, c)) {
      makeMove(r, c);
      maybeDrawWinningLine(findWinner());
    }
  }
});

drawTheBoard();