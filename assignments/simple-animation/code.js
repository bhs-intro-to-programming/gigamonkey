const drawFrame = (time) => {
    clear();
    drawLine(0, height / 2, width, height / 2, '#bbb');
    drawFilledCircle(ballX(time), height / 2, 10, 'blue');
    //drawFallingTriangle(width * 0.14, time);
}

const ballX = (time) => {
    let i = time / 3;
    let c = Math.floor(i / width) % 2;
    return c === 0 ? i % width : width - (i % width);
};

animate(drawFrame);
