const drawPicture = () => {
  drawFilledRect(0, 0, width, height, '#ff00ff99');
  drawSnowflake(width/2, height/2, 10);
};

const drawSnowflake = (x, y, size) => {
  drawFilledTriangle(x - 10, y - 10, x + 10, y - 10, x, y + 10, 'white')
};

drawPicture();
