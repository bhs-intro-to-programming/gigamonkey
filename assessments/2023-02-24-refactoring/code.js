const drawSnowman = () => {
  drawHead(width/2, height * 0.25, 50);

}

const drawHead = (x, y, size) => {
  drawCircle(x, y, size, 'black');
}

drawSnowman();