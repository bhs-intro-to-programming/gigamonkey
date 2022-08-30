const lerp = (a, b, amount) => {
    // 0xrrggbb hex linear interpolate
    const ar = a >> 16;
    const ag = a >> 8 & 0xff;
    const ab = a & 0xff;

    const br = b >> 16;
    const bg = b >> 8 & 0xff;
    const bb = b & 0xff;

    const rr = ar + amount * (br - ar);
    const rg = ag + amount * (bg - ag);
    const rb = ab + amount * (bb - ab);

    return (rr << 16) + (rg << 8) + (rb | 0);
};

const lerp2 = (a, b, amount) => {
    // 0xrrggbb hex linear interpolate
    const ar = a >> 16;
    const ag = a >> 8 & 0xff;
    const ab = a & 0xff;

    const br = b >> 16;
    const bg = b >> 8 & 0xff;
    const bb = b & 0xff;

    const rr = ar + amount * (br - ar);
    const rg = ag + amount * (bg - ag);
    const rb = ab + amount * (bb - ab);

    return (rr << 16) + (rg << 8) + (rb | 0);
};

const rgb = (a) => `#${a.toString(16).padStart(6, '0')}`;

const gradient = (clr0, clr1) => { // takes 2 24bit ints
    drawFilledRect(0, 0, width, height, rgb(clr0));
    for (var i = 0; i < width; i++) {
        drawFilledRect(i, 0, 1, height, rgb(lerp(clr1, clr0, i / width)));
    }
};

gradient(0xff0000, 0x0000ff)//call