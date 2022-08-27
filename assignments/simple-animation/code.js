const midX = width / 2;
const midY = height / 2;
const r = Math.min(midX, midY);

const drawFrame = (time) => {
    clear();
    drawCircle(midX, midY, r, '#bbb');
    const x1 = midX - r;
    const x2 = midX + r;
    drawBallAndLine(x1, midY, x2, midY, time, 0);
    drawBallAndLine(midX, midY - r, midX, midY + r, time, 200);
}

const drawBallAndLine = (x1, y1, x2, y2, time, timeOffset) => {
    drawLine(x1, y1, x2, y2, '#bbb');
    drawBall(x1, y1, x2, y2, time + timeOffset, 'blue');
}

const drawBall = (x1, y1, x2, y2, time, color) => {
    const d = distance(x1, y1, x2, y2);
    const t = fromStart(d, time);
    const x = x1 + t/d * (x2 - x1);
    const y = y1 + t/d * (y2 - y1);
    drawFilledCircle(x, y, 10, color);
};

const fromStartLinear = (d, time) => {
    const i = time / 5;
    return Math.floor(i / d) % 2 ? i % d : d - (i % d);
};

const fromStartSinusoidal = (d, time) => {
    // We want to go across and back in m milliseconds so we need to
    // cycle the arguments to cos() from 0 to 2pi in that many millis

    // 500 = 2pi
    // 1 = 2pi / 500

    const i = time * (Math.PI * 2 / 500);
    return (1 - Math.cos(i)) / 2 * d;
}

const fromStart = fromStartSinusoidal;

const distance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

animate(drawFrame);
