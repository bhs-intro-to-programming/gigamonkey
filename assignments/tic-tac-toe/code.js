
const boardSize = Math.min(width, height);


const drawBoard = () => {
  drawLine(width / 2, 0, width / 2, boardSize, 'grey');
};


registerOnclick((x, y) => {
  //console.log(`x: ${x}; y: ${x}`);
});


drawBoard();