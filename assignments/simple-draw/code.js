const lerp = (a, b, amount) => {
    // 0xrrggbb hex linear interpolate
    return interpolate(a >> 16, b >> 16, amount) << 16 
    | interpolate(a >> 8 & 0xff, b >> 8 & 0xff, amount) << 8
    | interpolate(a & 0xff, b & 0xff, amount);
};

const interpolate = (a, b, amount) => a + amount * (b  - a);

const rgb = (a) => `#${a.toString(16).padStart(6, '0')}`;

const gradient = (clr0, clr1) => {
    // takes 2 24bit ints
    for (let i = 0; i < width; i++) {
        drawFilledRect(i, 0, 1, height, rgb(lerp(clr1, clr0, i / width)));
    }
};

gradient(0xff0000, 0x0000ff)//call