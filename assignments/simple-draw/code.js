const drawSnowman = (x, headY, headSize) => {
  const bodySize = headSize * 1.2;
  const bodyY = headY + (headSize * 0.95) + bodySize;
  const buttSize = bodySize * 1.3;
  const buttY = bodyY + (bodySize * 0.95) + buttSize;

  drawFilledCircle(x, headY, headSize, 'white');
  drawFilledCircle(x, bodyY, bodySize, 'white');
  drawFilledCircle(x, buttY, buttSize, 'white');
};

drawSnowman(width / 2, 70, 50);