// SADIE'S CODE (plus some changes by me)

const edgeSize = (width - height) / 2
const b = Array(9).fill().map(() => Array(9).fill().map(() => Array(1).fill('')))
let index = 1;
let filledSpaces = 0

const drawBoard = () => {
  for (let i = 0; i < 10; i++) {
    const thick = i % 3 === 0 ? 3 : 1
    drawLine(edgeSize, height / 9 * i, width - edgeSize, height / 9 * i, 'black', thick)
    drawLine(edgeSize + height / 9 * i, 0, edgeSize + height / 9 * i, height, 'black', thick)
    if (i !== 9) {
      drawText(i + 1, edgeSize / 10 * i, 20, 'black', 20)
    }
  }
  drawText('Solve', edgeSize + height + 65, 30, 'black', 25)
}

const updateBoard = (row, col, number, color) => {
  b[row][col][0] = number
  for (let l = 0; l < 9; l++) {
    b[row][l][number] = number
    b[l][col][number] = number
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      b[Math.floor(row / 3) * 3 + j][Math.floor(col / 3) * 3 + i][number] = number
    }
  }
  drawText(number, edgeSize + col * (height / 9) + height / 64, row * (height / 9) + height * 6 / 64, color, height / 9)

  filledSpaces++
}

registerOnclick((x, y) => {
  if (x < edgeSize && y < 20) {
    index = Math.floor(x / (edgeSize / 10)) + 1
  } else if (x > edgeSize && x < width - edgeSize) {
    const col = Math.floor((x - edgeSize) / (height / 9))
    const row = Math.floor(y / (height / 9))
    updateBoard(row, col, index, black)
  } else if (x > edgeSize + height) {
    let rounds = 0;
    while (filledSpaces < 81 && rounds++ < 100) {
      solveBoard()
      console.log(filledSpaces);
    }
  }
})

const solveBoard = () => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      //console.log(`Trying to fill ${row},${col}`);
      let optionsFilled = 0
      let number = 0
      for (let currentCheck = 1; currentCheck < 10; currentCheck++) {
        if (b[row][col][currentCheck] === currentCheck) {
          optionsFilled++
        } else {
          number = currentCheck
        }
      }
      if (optionsFilled === 8 && b[row][col][0] === '') {
        updateBoard(row, col, number, 'grey')
      }
    }
  }
}

const setupPuzzle = (puzzle) => {
  puzzle.trim().split('\n').map(row => row.split(' ')).forEach((row, r) => {
    row.forEach((s, c) => {
      const n = Number(s);
      if (!isNaN(n)) {
        updateBoard(r, c, n, 'black');
      }
    });
  });
};

drawBoard()

const easy = `
6 . . 3 . 5 8 7 .
. 8 . . 2 . . . .
. . 7 8 9 . . 5 6
. 6 . . 7 . 1 . .
4 7 3 1 6 2 . . 8
9 2 1 5 3 8 7 6 4
. 5 . . . 3 . . 7
2 3 . 6 . . 9 . .
7 1 . . 5 4 . . 3
`;

const hard = `
. . 5 3 . . . . .
8 . . . . . . 2 .
. 7 . . 1 . 5 . .
4 . . . . 5 3 . .
. 1 . . 7 . . . 6
. . 3 2 . . . 8 .
. 6 . 5 . . . . 9
. . 4 . . . . 3 .
. . . . . 9 7 . .
`;

setupPuzzle(easy);
