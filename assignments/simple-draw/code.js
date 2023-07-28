const ground = height * 0.8;
drawLine(0, ground, width, ground, '#bbb', 1);
drawFilledRect(0, ground, width, (height - ground), 'white');
drawFilledRect(0, 0, width, ground, 'skyblue');

const x = width/2;

const buttSize = 80;
const bodySize = buttSize * 0.75;
const headSize = bodySize * 0.85;

const buttY = ground - buttSize;
const bodyY = buttY - (buttSize + bodySize);
const headY = bodyY - (bodySize + headSize);

const squish = 0.5;


drawFilledCircle(x, headY, headSize, 'white');
drawFilledCircle(x, bodyY, bodySize, 'white');
drawFilledCircle(x, buttY, buttSize, 'white');

