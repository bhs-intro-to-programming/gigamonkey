const ground = height * 0.8;
drawLine(0, ground, width, ground, 2, 'grey');

const x = width/2;
const headSize = 50;
const headY = 50 + 20;
const squish = 0.5;

const bodySize = headSize * 1.2;
const bodyY = headY + (headSize * (1 - squish)) + bodySize;
const buttSize = bodySize * 1.3;
const buttY = bodyY + (bodySize * (1 - squish)) + buttSize;

drawFilledCircle(x, headY, headSize, 'white');
drawFilledCircle(x, bodyY, bodySize, 'white');
drawFilledCircle(x, buttY, buttSize, 'white');

