const ground = height * 0.70;

drawLine(0, ground, width, ground, '#000', 1);
drawFilledRect(0, ground, width, (height - ground), 'white');
drawFilledRect(0, 0, width, ground, 'skyblue');

const x = width/2;

const buttSize = 80;
const bodySize = buttSize * 0.75;
const headSize = bodySize * 0.85;

const squish = 0.22;
const buttY = ground - (buttSize * (1 - squish * 2));
const bodyY = buttY - (buttSize + bodySize) * (1 - squish);
const headY = bodyY - (bodySize + headSize) * (1 - squish);

drawFilledCircle(x, headY, headSize, 'white');
drawFilledCircle(x, bodyY, bodySize, 'white');
drawFilledCircle(x, buttY, buttSize, 'white');

