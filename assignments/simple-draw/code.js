const padding = 10;
const side = Math.min(width - padding * 2, height - padding * 2);

const x = width/2 - side/2;
const y = height/2 - side/2;

drawFilledRect(left, top, side, side, 'black');