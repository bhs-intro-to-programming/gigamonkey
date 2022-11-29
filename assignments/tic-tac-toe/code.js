
const boardSize = Math.min(width, height) * 0.75;
const boardX = (width - boardSize) / 2;
const boardY = (height - boardSize) / 2;
const fontSize = boardSize / 3;

const drawBoard = () => {
  const x1 = boardX + boardSize / 3;
  const x2 = boardX + boardSize * 2 / 3;
  const y1 = boardY + boardSize / 3;
  const y2 = boardY + boardSize * 2 /3;
  drawLine(x1, boardY, x1, boardY + boardSize, 'grey', 2);
  drawLine(x2, boardY, x2, boardY + boardSize, 'grey', 2);
  drawLine(boardX, y1, boardX + boardSize, y1, 'grey', 2);
  drawLine(boardX, y2, boardX + boardSize, y2, 'grey', 2);
};

const drawMarker = (marker, r, c) => {
  drawText(marker, width/2 - fontSize / 4, height/2, 'black', fontSize);
};

const row = (y) => Math.floor((y - boardY) / (boardSize / 3));
const column = (x) => Math.floor((x - boardX) / (boardSize / 3));


registerOnclick((x, y) => {
  console.log(`x: ${x}; y: ${y}; row: ${row(y)}; column: ${column(x)}`);
  drawMarker('X', row(y), column(x));
});


drawBoard();