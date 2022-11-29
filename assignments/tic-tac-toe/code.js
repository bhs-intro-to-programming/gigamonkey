
const boardSize = Math.min(width, height) * 0.75;
const boardX = (width - boardSize) / 2;
const boardY = (height - boardSize) / 2;
const cellSize = boardSize / 3;
const fontSize = boardSize / 3;

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


const drawBoard = () => {
  const x1 = boardX + cellSize;
  const x2 = boardX + 2 * cellSize;
  const y1 = boardY + cellSize;
  const y2 = boardY + 2 * cellSize;;
  drawLine(x1, boardY, x1, boardY + boardSize, 'grey', 2);
  drawLine(x2, boardY, x2, boardY + boardSize, 'grey', 2);
  drawLine(boardX, y1, boardX + boardSize, y1, 'grey', 2);
  drawLine(boardX, y2, boardX + boardSize, y2, 'grey', 2);
};

const drawMarker = (marker, r, c) => {
  let x = boardX + c * cellSize + cellSize / 2;
  const y = boardY + r * cellSize + cellSize / 2;
  if (marker === 'O') {
    x -= cellSize / 9;
  }
  drawText(marker, x - fontSize * 0.3, y + fontSize * 0.3, 'black', fontSize);
};

const row = (y) => Math.floor((y - boardY) / (boardSize / 3));

const column = (x) => Math.floor((x - boardX) / (boardSize / 3));

const validCoordinate = (c) => 0 <= c && c < 3;

const validMove = (r, c) => {
  return validCoordinate(r) && validCoordinate(c) && board[r][c] === '';
}

const makeMove = (r, c) => {
  const marker = move % 2 === 0 ? 'X' : 'O';
  drawMarker(marker, r, c);
  board[r][c] = marker;
  move++;
}

const isWinner = () => {
  for (let i = 0; i < lines.length; i++) {
    if (isWinningLine(lines[i])) {
      return true;
    }
  }
  return false;
};

const isWinningLine = (line) => {
  const marker = markerAt(line[0]);
  if (marker !== '') {
    return marker === markerAt(line[1]) && marker === markerAt(line[2]);
  } else {
    return false;
  }
};

const markerAt = (coordinates) => {
  const [r, c] = coordinates; // e.g. [0, 0]
  return board[r][c];
}

registerOnclick((x, y) => {
  const r = row(y);
  const c = column(x);
  if (validMove(r, c)) {
    makeMove(r, c);
  }
});


drawBoard();