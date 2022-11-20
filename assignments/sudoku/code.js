const edgeSize = (width - height) / 2
const b = Array(9).fill().map(() => Array(9).fill().map(() => Array(1).fill('')))
let selected = 1;
let indilen = 0
let index = 1

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

registerOnclick((x, y) => {
  if (x < edgeSize && y < 20) {
    selected = Math.floor(x / (edgeSize / 10)) + 1
  } else if (x > edgeSize && x < width - edgeSize) {
    const col = Math.floor((x - edgeSize) / (height / 9))
    const row = Math.floor(y / (height / 9))
    b[row][col][0] = selected
    b[row][col][selected] = selected
    drawText(selected, edgeSize + col * (height / 9) + height / 64, row * (height / 9) + height * 6 / 64, 'black', height / 9)
    for (let i = 0; i < 9; i++) {
      b[row][i][selected] = selected
      b[i][col][selected] = selected
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        b[Math.floor(row / 3) * 3 + j][Math.floor(col / 3) * 3 + i][selected] = selected
      }
    }
  }
})

drawBoard1st()

const lineNine = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      for (let c = 1; c < 10; c++) {
        if (b[j][i][c] === c) {
          indilen++
        } else index = c
      }
      if (indilen === 8 && b[j][i][0] === '') {
        drawText(index, edgeSize + i * (height / 9) + height / 64, j * (height / 9) + height * 6 / 64, 'gray', height / 9)
        b[j][i][0] = index
        for (let l = 0; l < 9; l++) {
          b[j][l][index] = index
          b[l][i][index] = index
        }
        for (let a = 0; a < 3; a++) {
          for (let o = 0; o < 3; o++) {
            b[Math.floor(j / 3) * 3 + o][Math.floor(i / 3) * 3 + a][index] = index
          }
        }
      }
      indilen = 0
    }
  }
}