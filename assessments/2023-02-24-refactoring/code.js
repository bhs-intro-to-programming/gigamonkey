const drawSnowman = () => {
  drawHead(width/2, height * 0.25, 50);
  drawBody(width/2, height * 0.25 + 50 + 100, 100);
};

const drawHead = (x, y, size) => {
  drawCircle(x, y, size, 'black');
  drawFilledCircle(x - size * 0.25, y - size * 0.25, 4, 'black');
  drawFilledCircle(x + size * 0.25, y - size * 0.25, 4, 'black');
  drawFilledTriangle(x, y, x + 36, y + 10, x, y + 12, 'orange')
};

const drawBody = (x, y, size) => {
  drawCircle(x, y, size, 'black');
};



drawSnowman();