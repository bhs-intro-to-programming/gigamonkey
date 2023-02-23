const drawSnowman = () => {
  drawHead(width/2, height * 0.25, 50);

}

const drawHead = (x, y, size) => {
  drawCircle(x, y, size, 'black');
  drawFilledCircle(x - size * 0.25, y - size * 0.25, 4, 'black');
}

drawSnowman();