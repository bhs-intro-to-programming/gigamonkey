const padding = 10;
const side = Math.min(width - padding * 2, height - padding * 2);

const left = width/2 - side/2;
const top = height/2 - side/2;

drawFilledSquare(left, top, side, side, 'black');