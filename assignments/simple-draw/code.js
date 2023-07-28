const drawSnowman = (x, headY, headSize) => {
  //const headSize = 50;
  //const headY = headSize + 20; // move it down a bit from top of canvas
  const bodySize = headSize * 1.2;
  const bodyY = headY + headSize + bodySize;
  const buttSize = bodySize * 1.3;
  const buttY = bodyY + bodySize + buttSize;

  drawFilledCircle(width / 2, headY, headSize, 'white');
  drawFilledCircle(width / 2, bodyY, bodySize, 'white');
  drawFilledCircle(width / 2, buttY, buttSize, 'white');
};

drawSnowman(width / 2, 70, 50);