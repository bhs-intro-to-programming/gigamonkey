
const boardSize = Math.min(width, height);
const boardX = (width - boardSize) / 2;

const drawBoard = () => {
  const x1 = boardX + boardSize / 3;
  const x2 = boardX + boardSize * (2 / 3);
  drawLine(x1, 0, x1, boardSize, 'grey');
  drawLine(x2, 0, x2, boardSize, 'grey');
};


registerOnclick((x, y) => {
  //console.log(`x: ${x}; y: ${x}`);
});


drawBoard();