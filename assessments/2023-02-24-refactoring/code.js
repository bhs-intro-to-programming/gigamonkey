const drawSnowman = () => {
  drawHead(width/2, height/2, 20);

}

const drawHead = (x, y, size) => {
  drawCircle(x, y, size, 'black');
}

drawSnowman();