const edgeSize = (width - height) / 2
const b = Array(9).fill().map(() => Array(9).fill(''))
let selected = 0;

const drawBoard1st = () => {
  for (let i = 0; i < 10; i++) {
    const thick = i % 3 === 0 ? 3 : 1
    drawLine(edgeSize, height / 9 * i, width - edgeSize, height / 9 * i, 'black', thick)
    drawLine(edgeSize + height / 9 * i, 0, edgeSize + height / 9 * i, height, 'black', thick)
    drawText(i, edgeSize / 10 * i, 20, 'black', 20)
  }
}

registerOnclick((x, y) => {
  if (x < edgeSize && y < 20) {
    selected = Math.floor(x / (edgeSize / 10))
  } else if (x > edgeSize && x < width - edgeSize) {
    const exe = Math.floor((x - edgeSize) / (height / 9))
    const wiy = Math.floor(y / (height / 9))
    b[wiy][exe] = selected
    drawText(selected, edgeSize + exe * (height / 9) + height / 64, wiy * (height / 9) + height * 7 / 64, 'black', height / 9)
  }
})

drawBoard1st()