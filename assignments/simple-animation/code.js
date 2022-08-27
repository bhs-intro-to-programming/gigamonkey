const LINEAR = false;

const MILLIS_PER_PASS = 3000;

const INTRO_RATE = MILLIS_PER_PASS * 2;

const start = now();

const midX = width / 2;
const midY = height / 2;

const r = Math.min(midX, midY);

const drawFrame = (time) => {
    clear();
    drawCircle(midX, midY, r, '#bbb');

    const timeGap = MILLIS_PER_PASS / 16;

    for (let i = 0; i < 8; i++) {
        if (now() - start > i * INTRO_RATE) {
            ballAndLine(2 * Math.PI * i / 16, time, i * timeGap);
        }
    }
}

const ballAndLine = (theta, time, startOffset) => {
    let x1 = xOnCircle(theta);
    let y1 = yOnCircle(theta);
    let x2 = xOnCircle(theta + Math.PI);
    let y2 = yOnCircle(theta + Math.PI);
    drawBallAndLine(x1, y1, x2, y2, time, startOffset);
}

const xOnCircle = (theta) => midX + Math.cos(theta) * r;

const yOnCircle = (theta) => midY + Math.sin(theta) * r;

const drawBallAndLine = (x1, y1, x2, y2, time, startOffset) => {
    drawLine(x1, y1, x2, y2, '#bbb');
    drawBall(x1, y1, x2, y2, time + startOffset, 'blue');
}

const drawBall = (x1, y1, x2, y2, time, color) => {
    const d = distance(x1, y1, x2, y2);
    const t = fromStart(d, time, MILLIS_PER_PASS);
    const x = x1 + t / d * (x2 - x1);
    const y = y1 + t / d * (y2 - y1);
    drawFilledCircle(x, y, 10, color);
};

const fromStartLinear = (d, time, ms) => {
    const step = 2 * d / ms;
    const i = time * step;
    return Math.floor(i / d) % 2 ? i % d : d - (i % d);
};

const fromStartSinusoidal = (d, time, ms) => {
    // We want to go across and back in m milliseconds so we need to
    // cycle the arguments to cos() from 0 to 2pi in that many millis
    const i = time * (Math.PI * 2 / ms);
    return (1 - Math.cos(i)) / 2 * d;
}

const fromStart = LINEAR ? fromStartLinear : fromStartSinusoidal;

const distance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

animate(drawFrame);
