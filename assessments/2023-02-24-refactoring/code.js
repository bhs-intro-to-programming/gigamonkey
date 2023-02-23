const drawBackground = () => {
  drawFilledRect(0, 0, width, height * 0.8, '#ddeeff');
}


const drawSnowman = () => {
  drawHead(width / 2, height * 0.2, 50);
  drawBody(width / 2, height * 0.2 + 50 + 70, 70);
};

const drawHead = (x, y, size) => {
  drawSnowball(x, y, size);
  drawEyes(x, y, size);
  drawNose(x, y, size);
  drawMouth(x, y, size);
};

const drawEyes = (x, y, size) => {
  drawFilledCircle(x - size * 0.25, y - size * 0.25, 4, 'black');
  drawFilledCircle(x + size * 0.25, y - size * 0.25, 4, 'black');
};

const drawNose = (x, y, size) => {
  drawFilledTriangle(x, y, x + 36, y + 10, x, y + 12, 'orange');
};

const drawMouth = (x, y, size) => {
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (1.9 ** Math.abs(i - 2));
    drawCoal(x - size * 0.35 + i * size * 0.2, y + size * 0.6 + dy);
  }
};

const drawCoal = (x, y) => {
  drawFilledCircle(x, y, 4, 'black');
};

const drawSnowball = (x, y, size) => {
  drawCircle(x, y, size + 2, 'black', 3);
  drawFilledCircle(x, y, size, 'white', 3);
};

const drawBody = (x, y, size) => {
  drawSnowball(x, y, size);
  drawSnowball(x, y + size + size * 1.25, size * 1.25);
  drawArms(x, y, size);
  drawButtons(x, y, size);
};

const drawArms = (x, y, size) => {
  drawArm(x, y, size, 1);
  drawArm(x, y, size, -1);
};

const drawArm = (x, y, size, direction) => {
  const x1 = x + size * 0.6 * direction;
  const y1 = y - size * 0.25;
  const x2 = x1 + size * 1.75 * direction;
  const y2 = y1 - 30;
  drawLine(x1, y1, x2, y2, 'black', 3);
};

const drawButtons = (x, y, size) => {
  for (let i = 0; i < 3; i++) {
    drawCoal(x, y - size * 0.5 + i * size * 0.5);
  }
}

drawBackground();
drawSnowman();