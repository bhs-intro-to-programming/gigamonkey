const gap = 3;

drawFilledRect(0, 0, width, height, 'white');

for (let y = height, x = 0; width - x > 1; y -= gap) {
    x = y > 0 ? 0 : width * -y / (height - y);
    drawLine(x, Math.max(y, 0), width, height, 'black');
}

drawFilledCircle(width / 2, height / 2, 150, 'rgba(255,0,255,0.25)');