
const boardSize = Math.min(width, height) * 0.75;
const boardX = (width - boardSize) / 2;
const boardY = (height - boardSize) / 2;
const cellSize = boardSize / 3;
const fontSize = boardSize / 3;

let marker = 'X';

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

const valid = (c) => 0 <= c && c < 3;


registerOnclick((x, y) => {
  const r = row(y);
  const c = column(x);
  console.log(`x: ${x}; y: ${y}; row: ${r}; column: ${c}`);
  if (valid(r) && valid(c)) {
    drawMarker(marker, r, c);
    if (marker === 'X') {
      marker = 'O';
    } else {
      marker = 'X';
    }
  }
});


drawBoard();