const headSize = 50;
drawFilledCircle(width / 2, headSize + 20, headSize, 'white');
const bodySize = headSize * 1.2;
const bodyY = headSize + 20 + headSize + bodySize;
drawFilledCircle(width / 2, bodyY, bodySize, 'white');
const buttSize = bodySize * 1.3;
const buttY = bodyY + bodySize + buttSize;
drawFilledCircle(width / 2, buttY, buttSize, 'white');