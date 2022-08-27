const midX = width / 2;
const midY = height / 2;
const r = Math.min(midX, midY);

const drawFrame = (time) => {
    clear();
    drawCircle(midX, midY, r, '#bbb');
    drawLine(midX - r, midY, midX + r, midY, '#bbb');
    drawFilledCircle(ballX(time), midY, 10, 'blue');
}

const ballX = (time) => {
    let d = 2 * r;
    let i = time / 4;
    let start = midX - r;
    let c = Math.floor(i / d) % 2;
    return start + (c === 0 ? i % d : d - (i % d));
};

animate(drawFrame);
