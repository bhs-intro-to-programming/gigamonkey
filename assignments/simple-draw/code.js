/*
 * Interpolate between two colors by interpolating the the red, 
 * green, and blue components individually.
 */
const OLDlerp = (a, b, amount) => {
    return interpolate(a >> 16, b >> 16, amount) << 16
        | interpolate(a >> 8 & 0xff, b >> 8 & 0xff, amount) << 8
        | interpolate(a & 0xff, b & 0xff, amount);
};

const lerp = (a, b, amount) => {
    let r = 0;
    for (let i = 0; i < 3; i++) {
        r |= interpolate(a >> (i * 8) & 0xff, b >> (i * 8) & 0xff, amount);
    };
    return r;
};

/*
 * Linear interpolation between two values.
 */
const interpolate = (a, b, amount) => a + amount * (b - a);

/*
 * Convert a numeric value to an hex color string.
 */
const rgb = (a) => `#${a.toString(16).padStart(6, '0')}`;

/*
 * Fill the drawing area with a gradient.
 */
const gradient = (clr0, clr1) => {
    for (let i = 0; i < width; i++) {
        drawFilledRect(i, 0, 1, height, rgb(lerp(clr0, clr1, i / width)));
    }
};

gradient(0xff0000, 0x0000ff);