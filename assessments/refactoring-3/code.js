const drawPicture = () => {
  drawFilledRect(0, 0, width, height, '#ff00ff99');
  drawSnowflake(width/2, height/2, 30);
};

const drawSnowflake = (x, y, size) => {
  drawFilledTriangle(x - size, y - size, x + size, y - size, x, y + size, '#ffffff99')
  drawFilledTriangle(x - size, y + size, x + size, y + size, x, y - size, '#ffffff99')
};

drawPicture();
