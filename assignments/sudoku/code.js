const edgeSize = (width - height) / 2
const b = Array(9).fill().map(() => Array(9).fill().map(() => Array(1).fill('')))
let selected = 1;


////////////////////////////////////////////////////////////////////////
// Graphics -- drawing and translating graphical coordinates

const drawBoard1st = () => {
  for (let i = 0; i < 10; i++) {
    const thick = i % 3 === 0 ? 3 : 1
    drawLine(edgeSize, height / 9 * i, width - edgeSize, height / 9 * i, 'black', thick)
    drawLine(edgeSize + height / 9 * i, 0, edgeSize + height / 9 * i, height, 'black', thick)
    if (i !== 9) {
      drawText(i + 1, edgeSize / 10 * i, 20, 'black', 20)
    }
  }
};

const drawNumber = (number, row, col, color) => {
  drawText(number, edgeSize + col * (height / 9) + height / 64, row * (height / 9) + height * 6 / 64, color, height / 9);
};

const getSelected = (x) => Math.floor(x / (edgeSize / 10)) + 1;

const rowAndCol = (x, y) => [ Math.floor(y / (height / 9)), Math.floor((x - edgeSize) / (height / 9)) ];

////////////////////////////////////////////////////////////////////////
// Board state management

const placeSelectedNumber = (row, col) => {
  recordPlacement(selected, row, col);
  drawNumber(selected, row, col, 'black');
};

const recordPlacement = (number, row, col) => {
  b[row][col][0] = number
  for (let i = 0; i < 9; i++) {
    b[row][i][number] = number
    b[i][col][number] = number
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      b[Math.floor(row / 3) * 3 + j][Math.floor(col / 3) * 3 + i][number] = number
    }
  }
};

const fillLastPossibility = () => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (b[row][col][0] === '') {
        const possible = possibleDigits(row, col);
        if (possible.length === 1) {
          recordPlacement(possible[0], row, col);
          drawNumber(possible[0], row, col, 'gray');
        }
      }
    }
  }
};

const possibleDigits = (row, col) => {
  const possible = [];
  for (let n = 1; n <= 9; n++) {
    if (b[row][col][n] !== n) {
      possible.push(n);
    }
  }
  return possible;
};

drawBoard1st()

registerOnclick((x, y) => {
  if (x < edgeSize && y < 20) {
    selected = getSelected(x);
  } else if (x > edgeSize && x < width - edgeSize) {
    const [row, col] = rowAndCol(x, y);
    placeSelectedNumber(row, col);
    fillLastPossibility();
  }
})
