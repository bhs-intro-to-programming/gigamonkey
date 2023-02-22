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

const toBoardCoordinates = (x, y) => {
  return [
    Math.floor((y - boardTop) / cellSize),
    Math.floor((x - boardLeft) / cellSize)
  ];
};

const drawBoard = () => {
  const x1 = boardLeft + cellSize;
  const x2 = boardLeft + 2 * cellSize;
  const y1 = boardTop + cellSize;
  const y2 = boardTop + 2 * cellSize;;
  drawLine(x1, boardTop, x1, boardTop + boardSize, 'grey', 2);
  drawLine(x2, boardTop, x2, boardTop + boardSize, 'grey', 2);
  drawLine(boardLeft, y1, boardLeft + boardSize, y1, 'grey', 2);
  drawLine(boardLeft, y2, boardLeft + boardSize, y2, 'grey', 2);
};

const findWinner = () => {
  for (let i = 0; i < lines.length; i++) {
    const marks = extractLine(lines[i]);
    if (marks[0] !== '' && allTheSame(marks)) {
      return lines[i];
    }
  }
};

const extractLine = (line) => {
  const ms = [];
  for (let j = 0; j < 3; j++) {
    const [r, c] = line[j];
    ms.push(board[r][c]);
  }
  return ms;
};

const allTheSame = (ms) => ms[0] === ms[1] && ms[0] === ms[2];

const isLegalMove = (r, c) => isInBounds(r) && isInBounds(c) && board[r][c] === '';

const isInBounds = (n) => 0 <= n && n < 3;

const makeMove = (r, c) => {
  const marker = move % 2 === 0 ? 'X' : 'O';
  const x = boardLeft + c * cellSize + cellSize / 2;
  const y = boardTop + r * cellSize + cellSize / 2;
  const nudge = marker === 'O' ? cellSize / 9 : cellSize / 19;
  drawText(marker, x - (fontSize * 0.3 + nudge), y + fontSize * 0.3, 'black', fontSize);
  board[r][c] = marker;
  move++;
};

const cellCenter = (r, c) => {
  return [
    boardLeft + c * cellSize + cellSize / 2,
    boardTop + r * cellSize + cellSize / 2
  ];
}

const maybeDrawWinnerLine = (winner) => {
  if (winner) {
    const [r1, c1] = winner[0];
    const [r2, c2] = winner[winner.length - 1];

    const [x1, y1] = cellCenter(r1, c1);
    const [x2, y2] = cellCenter(r2, c2);

    const dx = Math.sign(x2 - x1) * lineEndAdjustment;
    const dy = Math.sign(y2 - y1) * lineEndAdjustment;

    drawLine(x1 - dx, y1 - dy, x2 + dx, y2 + dy, 'red', 15);
  }
};

const gameOver = () => findWinner() || move === 9;

registerOnclick((x, y) => {
  if (!gameOver()) {
    const [r, c] = toBoardCoordinates(x, y);
    if (isLegalMove(r, c)) {
      makeMove(r, c);
      maybeDrawWinnerLine(findWinner());
    }
  }
});

drawBoard();