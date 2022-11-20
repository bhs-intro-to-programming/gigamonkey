const edgeSize = (width - height) / 2
const b = Array(9).fill().map(() => Array(9).fill().map(() => Array(1).fill('')))
let selected = 1;

const drawBoard1st = () => {
  for (let i = 0; i < 10; i++) {
    const thick = i % 3 === 0 ? 3 : 1
    drawLine(edgeSize, height / 9 * i, width - edgeSize, height / 9 * i, 'black', thick)
    drawLine(edgeSize + height / 9 * i, 0, edgeSize + height / 9 * i, height, 'black', thick)
    if (i !== 9) {
      drawText(i + 1, edgeSize / 10 * i, 20, 'black', 20)
    }
  }
}

const drawNumber = (number, row, col, color) => {
  drawText(number, edgeSize + col * (height / 9) + height / 64, row * (height / 9) + height * 6 / 64, color, height / 9);
};

const getSelected = (x) => Math.floor(x / (edgeSize / 10)) + 1;

const placeSelectedNumber = (x, y) => {
  const row = Math.floor(y / (height / 9))
  const col = Math.floor((x - edgeSize) / (height / 9))
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

const lineNine = () => {
  for (let col = 0; col < 9; col++) {
    for (let row = 0; row < 9; row++) {
      let indilen = 0
      let index = 1

      for (let c = 1; c < 10; c++) {
        if (b[row][col][c] === c) {
          indilen++
        } else index = c
      }
      if (indilen === 8 && b[row][col][0] === '') {
        recordPlacement(index, row, col);
        drawNumber(index, row, col, 'gray');
      }
    }
  }
}

drawBoard1st()

registerOnclick((x, y) => {
  if (x < edgeSize && y < 20) {
    selected = getSelected(x);
  } else if (x > edgeSize && x < width - edgeSize) {
    placeSelectedNumber(x, y);
  }
})
