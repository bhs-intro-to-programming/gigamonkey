
const boardSize = Math.min(width, height) * 0.75;
const boardX = (width - boardSize) / 2;
const boardY = (height - boardSize) / 2;

const drawBoard = () => {
  const x1 = boardX + boardSize / 3;
  const x2 = boardX + boardSize * 2 / 3;
  const y1 = boardY + boardSize / 3;
  const y2 = boardY + boardSize * 2 /3;
  drawLine(x1, 0, x1, boardSize, 'grey');
  drawLine(x2, 0, x2, boardSize, 'grey');
  drawLine(boardX, y1, boardX + boardSize, y1, 'grey');
  drawLine(boardX, y2, boardX + boardSize, y2, 'grey');
};


registerOnclick((x, y) => {
  //console.log(`x: ${x}; y: ${x}`);
});


drawBoard();