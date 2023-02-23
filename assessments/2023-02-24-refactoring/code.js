const drawSnowman = () => {
  drawHead(width / 2, height * 0.25, 50);
  drawBody(width / 2, height * 0.25 + 50 + 70, 70);
};

const drawHead = (x, y, size) => {
  drawCircle(x, y, size, 'black', 3);
  drawEyes(x, y, size);
  drawFilledTriangle(x, y, x + 36, y + 10, x, y + 12, 'orange')
};

const drawEyes = (x, y, size) => {
  drawFilledCircle(x - size * 0.25, y - size * 0.25, 4, 'black');
  drawFilledCircle(x + size * 0.25, y - size * 0.25, 4, 'black');
};

const drawCoal = (x, y) => {
  drawFilledCircle(x, y, 4, 'black');
}


const drawBody = (x, y, size) => {
  drawCircle(x, y, size, 'black');
  drawCircle(x, y + size + size * 1.25, size * 1.25, 'black', 3);
  drawArms(x, y, size);
  drawButtons(x, y, size);
};

const drawArms = (x, y, size) => {
  drawLeftArm(x, y, size);
  drawRightArm(x, y, size);
}

const drawLeftArm = (x, y, size) => {
  const x1 = x - size * 0.45;
  const y1 = y - size * 0.2;
  const x2 = x1 - size * 1.5;
  const y2 = y1 - 30;
  drawLine(x1, y1, x2, y2, 'black', 3);
};

const drawRightArm = (x, y, size) => {
  const x1 = x + size * 0.45;
  const y1 = y - size * 0.2;
  const x2 = x1 + size * 1.5;
  const y2 = y1 - 30;
  drawLine(x1, y1, x2, y2, 'black', 3);
};

const drawButtons = (x, y, size) => {
  for (let i = 0; i < 3; i++) {
    drawCoal(x, y - size * 0.5 + i * size * 0.5);
  }
}

drawSnowman();