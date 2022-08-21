/*
 * This code is running in an environment with five functions defined:
 *
 *  drawLine(x1, y1, x2, y2, color, lineWidth)
 *
 *    Draws a line from x1,y1 to x2,y2 using the give color. The fifth argument,
 *    lineWidth, is optional and defaults to 1.
 *
 *  drawCircle(x, y, r, color, lineWidth=1)
 *
 *    Draws a circle centered at x,y with radius r using the given color. The
 *    fith argument, lineWidth, is optional and defaults to 1.
 *
 *  drawRect(x, y, width, height, color, lineWidth=1)
 *
 *    Draws a rectangle starting at x,y with the given width, height, and color.
 *    Positive widths go to the right and negative to the left; positive heights
 *    go down and negative heights go up. The sixth argument, lineWidth, is
 *    optional and defaults to 1.
 *
 *  drawFilledRect(x, y, width, height, color)
 *
 *    Draws a filled rectangle starting at x,y with the given width, height, and
 *    color. Positive widths go to the right and negative to the left; positive
 *    heights go down and negative heights go up.
 *
 *  drawFilledCircle(x, y, r, color)
 *
 *    Draws a filled circle centered at x,y with radius r using the given color.
 *
 * There are also a couple variables that might be useful:
 *
 *  width - the width of the drawing area.
 *  height - the height of the drawing area.
 *
 */

const gap = 15;

drawFilledRect(0, 0, width, height, 'white');

for (let y = height; y >= 0; y -= gap) {
    drawLine(0, y, width, height, 'black');
}

let i = 1;
while (true) {
    let extra = gap * i;
    let x = (width * extra) / (height + extra);
    drawLine(x, 0, width, height, 'black');
    if (width - x < width/2) break;

    if (i++ > 2000) break;
}


drawFilledCircle(width/2, height/2, 150, 'white');

/*
const size = 7;

const foo = () => {
    for (let x = size + ((width % (2 * size)) / 2); x < width - size/2; x += 2 * size) {
        for (let y = size +((height % (2 * size)) / 2); y <= height - size/2; y += 2 * size) {
            if (Math.random() < 0.7) {
                drawCircle(x, y, size, 'blue');
            } else {
                drawFilledCircle(x, y, size, 'blue');
            }
        }

    }
}

foo();
*/
/*
const midX = width / 2;
const midY = height / 2;

function drawTriangle(x1, y1, x2, y2, x3, y3, color) {
    drawLine(x1, y1, x2, y2, color);
    drawLine(x2, y2, x3, y3, color);
    drawLine(x3, y3, x1, y1, color);
}

drawTriangle(
    midX - 75, midY,
    midX, midY - 50,
    midX + 50, midY + 50,
    'red');

drawLine(0, 0, width, height, 'pink')

drawCircle(width / 2, height / 2, 10, 'blue');

drawRect(50, 50, 60, 40, 'black');

drawFilledCircle(width - 50, height - 50, 50, 'red');

drawFilledRect(5, height - 20, 45, 15, 'purple');
*/