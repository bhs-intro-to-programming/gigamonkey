
const boardSize = Math.min(width, height);
const boardX = (width - boardSize) / 2;

const drawBoard = () => {
  drawLine(boardX, 0, boardX, boardSize, 'grey');
};


registerOnclick((x, y) => {
  //console.log(`x: ${x}; y: ${x}`);
});


drawBoard();