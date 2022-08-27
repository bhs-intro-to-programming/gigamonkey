const midX = width / 2;
const midY = height / 2;
const r = Math.min(midX, midY);

const drawFrame = (time) => {
    clear();
    drawCircle(midX, midY, r, '#bbb');
    const x1 = midX - r;
    const x2 = midX + r;
    drawLine(x1, midY, x2, midY, '#bbb');
    drawBall(x1, midY, x2, midY, 'blue', time);
}

const drawBall = (x1, y1, x2, y2, time) => {
    const d = distance(x1, y1, x2, y2);
    const t = fromStart(d, time);
    const x = t/d * (x2 - x1);
    const y = t/d * (y2 - y1);
    console.log(`d: ${d}; t: ${t}; x: ${x}; y: ${y}`);

    drawFilledCircle(x, y, 10, 'blue');
};

const fromStart = (d, time) => {
    console.log(`d: ${d}; time: ${time}`);
    const i = time / 4;
    return Math.floor(i / d) % 2 ? i % d : d - (i % d);
};

const distance = (x1, y1, x2, y2) => {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};

animate(drawFrame);
