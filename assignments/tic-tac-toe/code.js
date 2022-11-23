let move = 0;

registerOnclick((x, y) => {
  let marker;
  let color;
  let xPos;
  let yPos;

  if (move % 2 === 0) {
    marker = 'X';
    color = 'red';
  } else {
    marker = 'O';
    color = 'blue';
  }

  let col;

  if (x < width / 3) {
    col = 0;
  } else if (x > width / 3 && x < width * 2 / 3) {
    col = 1;
  } else if (x > width * 2 / 3) {
    col = 2;
  }

  xPos = (col * width / 3) + width / 9;

  if (y < height / 3) {
    yPos = (1 * height / 3) - (height / 9);
  } else if (y < height * 2 / 3 && y > height * 1 / 3) {
    yPos = (2 * height / 3) - (height / 9);
  } else if (y > height * 2 / 3) {
    yPos = (3 * height / 3) - (height / 9);
  }

  drawText(marker, xPos, yPos, color, Math.min(width, height) * 0.3);

  move++;
});

const board = () => {
  for (let i = 0; i < 2; i++) {
    const x = (i + 1) * width / 3
    drawLine(x, 0, x, height, 'black', 5);
  }
  for (let i = 0; i < 2; i++) {
    const x = (i + 1) * height / 3
    drawLine(0, x, width, x, 'black', 5);
  }

}

board()