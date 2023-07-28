const drawSnowman = (x, headY, headSize, squish) => {
  const bodySize = headSize * 1.2;
  const bodyY = headY + (headSize * (1 - squish)) + bodySize;
  const buttSize = bodySize * 1.3;
  const buttY = bodyY + (bodySize * (1 - squish)) + buttSize;

  drawFilledCircle(x, headY, headSize, 'white');
  drawFilledCircle(x, bodyY, bodySize, 'white');
  drawFilledCircle(x, buttY, buttSize, 'white');
};

drawSnowman(width / 2, 70, 50, 0.1);