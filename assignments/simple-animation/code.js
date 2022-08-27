const midX = width / 2;
const midY = height / 2;
const r = Math.min(midX, midY);

const drawFrame = (time) => {
    clear();
    drawCircle(midX, midY, r, '#bbb');
    const x1 = midX - r;
    const x2 = midX + r;
    drawBallAndLine(x1, midY, x2, midY, time);
}

const drawBallAndLine = (x1, x2, y1, y2, time) => {
    drawLine(x1, y1, x2, y2, '#bbb');
    //drawBall(x1, y1, x2, y2, time, 'blue');
}

const drawBall = (x1, y1, x2, y2, time, color) => {
    const d = distance(x1, y1, x2, y2);
    const t = fromStart(d, time);
    const x = x1 + t/d * (x2 - x1);
    const y = y1 + t/d * (y2 - y1);
    //console.log(`d: ${d}; t: ${t}; x: ${x}; y: ${y}`);

    drawFilledCircle(x, y, 10, color);
};

const fromStart = (d, time) => {
    const i = time / 4;
    return Math.floor(i / d) % 2 ? i % d : d - (i % d);
};

const distance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

animate(drawFrame);
