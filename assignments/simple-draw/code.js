const padding = 10;
const side = Math.min(width - padding * 2, height - padding * 2);

const x = width/2 - side/2;
const y = height/2 - side/2;

const hole = (x, y, size) => {
  drawFilledRect(x + size/3, y + size/3, size/3, size/3, 'white');
};

/*


drawFilledRect(x, y, side, side, 'black');

hole(x, y, side);

hole(x, y, side/3);
hole(x + side/3, y, side/3);
hole(x + 2 * side/3, y, side/3);

hole(x, y + side/3, side/3);
hole(x + 2 * side/3, y + side/3, side/3);

hole(x, y + 2 * side/3, side/3);
hole(x + side/3, y + 2 * side/3, side/3);
hole(x + 2 * side/3, y + 2 * side/3, side/3);
*/

drawFilledTriangle(10, 10, 10,height/2, width/2, height/3, 'blue');
drawFilledCircle(width/2, height/2, 20, 'red');