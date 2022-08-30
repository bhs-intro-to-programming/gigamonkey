const lerp = (a, b, amount) => {
    // 0xrrggbb hex linear interpolate
    const ar = a >> 16,
        ag = a >> 8 & 0xff,
        ab = a & 0xff,

        br = b >> 16,
        bg = b >> 8 & 0xff,
        bb = b & 0xff,

        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return (rr << 16) + (rg << 8) + (rb | 0);
};

const convert = (a, base) => { //int -> str
    let e = ""
    let b = ""
    while (a > 0) {
        let c = a % base
        c = c == 10 ? "A" : c == 11 ? "B" : c == 12 ? "C" : c == 13 ? "D" : c == 14 ? "E" : c == 15 ? "F" : c
        b = (c + b)
        a = Math.floor(a / base)
    }
    while (b.length < 6) b = "0" + b
    return "#" + b
};

const gradient = (clr0, clr1) => { // takes 2 24bit ints
    drawFilledRect(0, 0, width, height, clr0.toString(16));
    for (var i = 0; i < width; i++) {
        drawFilledRect(i, 0, 1, height, convert(lerp(clr1, clr0, i / width)));
    }
};

gradient(0xff0000, 0x0000ff)//call