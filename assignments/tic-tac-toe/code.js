let move = 0;

registerOnclick((x, y) => {
  let marker;
  let color;

  if (move % 2 === 0) {
    marker = 'X';
    color = 'red';
  } else {
    marker = 'O';
    color = 'blue';
  }

  if (x < width / 3) {
    if (y < height / 3) {
      drawText(marker, 75, 40, color, Math.min(width, height) * 0.3);
    } else if (y < height * 2 / 3 && y > height * 1 / 3) {
      drawText(marker, 75, 90, color, Math.min(width, height) * 0.3);
    } else if (y > height * 2 / 3) {
      drawText(marker, 75, 140, color, Math.min(width, height) * 0.3);
    }
  } else if (x > width / 3 && x < width * 2 / 3) {
    if (y < height * 1 / 3) {
      drawText(marker, 280, 40, color, Math.min(width, height) * 0.3);
    } else if (y < height * 2 / 3 && y > height * 1 / 3) {
      drawText(marker, 280, 90, color, Math.min(width, height) * 0.3);
    } else if (y > height * 2 / 3) {
      drawText(marker, 280, 140, color, Math.min(width, height) * 0.3);
    }
  } else if (x > width * 2 / 3) {
    if (y < height * 1 / 3) {
      drawText(marker, 490, 40, color, Math.min(width, height) * 0.3);
    } else if (y < height * 2 / 3 && y > height * 1 / 3) {
      drawText(marker, 490, 90, color, Math.min(width, height) * 0.3);
    } else if (y > height * 2 / 3) {
      drawText(marker, 490, 140, color, Math.min(width, height) * 0.3);
    }
  }

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