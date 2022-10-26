// This is a bit of a new thing. registerOnclick is a function provided by the
// framework. But the argument we're passing to it is *another* function. Notice
// how the argument here looks like what we normally put on the righthand side
// of the equals sign in our normal `const foo = ...` function definition. This
// is called an anonymous function. We'll discuss this in more detail in a few
// weeks but for now you can just adapt this code.


const boardSize = Math.min(width, height) - 20;
const boardX = (width - boardSize) / 2
const boardY = (height - boardSize) / 2;

const clickToCell = (x, y) => {
  const cellX = Math.floor(3 * (x - boardX) / boardSize);
  const cellY = Math.floor(3 * (y - boardY) / boardSize);
  console.log(`${cellX},${cellY}`);
};

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

/*
registerOnclick((x, y) => {
  drawText('X', x, y, 'black', Math.min(width, height) * 0.3);
});
*/
registerOnclick(clickToCell);

drawBoard();