// EMILY: please add a comment here and hit the blue arrow button and then email me 
// to let me know you have.

const gap = 4;

drawFilledRect(0, 0, width, height, 'white');

for (let y = height, x = 0; width - x > 1; y -= gap) {
    x = y > 0 ? 0 : width * -y / (height - y);
    drawLine(x, Math.max(y, 0), width, height, 'black');
}

drawFilledCircle(width / 2, height / 2, 150, 'rgba(255,0,255,0.25)');

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