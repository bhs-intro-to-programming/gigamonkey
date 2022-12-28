const makeArrayRow = (columns) => {
  let row = []
  for (let i = 0; i < columns; i++) {
    row.push(0)
  }
  return row
}
const makeArray = (rows, columns) => {
  let b = []
  for (let i = 0; i < rows; i++) {
    b.push(makeArrayRow(columns))
  }
  return b;
}

const drawBoard = () => {
  const top = 0;
  const bottom = height;
  const left = (width / 2) - (height / 2); // - height / 10);
  const right = (width / 2) + (height / 2);

  for (let i = 0; i < 10; i++) {
    const x = (width / 2) - (height / 2) + (height / 10) * i;
    drawLine(x, top, x, bottom, 'black', 1);
  }
  for (let j = 0; j < 10; j++) {
    const y = height / 9 * j;
    drawLine(left, y, right, y, 'black', 1);
  }

  for (let i = 0; i < 4; i++) {
    const x = (width / 2) - (height / 2) + (height / 10) * i * 3;
    drawLine(x, top, x, bottom, 'black', 3);
  }
  for (let j = 0; j < 4; j++) {
    const y = height / 9 * j * 3;
    drawLine(left, y, right, y, 'black', 3);
  }
}

const drawArray = (b) => {
  for (let j = 0; j < b.length; j++)
    for (let i = 0; i < 10; i++) {
      drawText(b[j][i], (width / 2) - (height / 2) + (height / 10) * j, height / 9 * i, 'black', 25);
    }
}

const draw = (b) => {
  clear()
  drawBoard()
  drawArray(b)
}

const board = makeArray(9, 10)

draw(board);
