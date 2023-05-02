const drawPicture = () => {
  drawFilledRect(0, 0, width, height, '#ff00ff99');
  drawSnowflake(width/2, height/2, 10);
};

const drawSnowflake = (x, y, size) => {
  drawFilledTriangle(x - size, y - size, x + size, y - size, x, y + size, 'white')
  drawFilledTriangle(x - size, y + size, x + size, y + size, x, y - size, 'white')
};

drawPicture();
