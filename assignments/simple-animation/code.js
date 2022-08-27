const midX = width / 2;
const midY = height / 2;
const r = Math.min(midX, midY);

const drawFrame = (time) => {
    clear();
    drawCircle(midX, midY, r, '#bbb');
    drawLine(0, midY, width, midY, '#bbb');
    drawFilledCircle(ballX(time), midY, 10, 'blue');
}

const ballX = (time) => {
    let i = time / 4;
    let c = Math.floor(i / width) % 2;
    return c === 0 ? i % width : width - (i % width);
};

animate(drawFrame);
