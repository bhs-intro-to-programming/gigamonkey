/*
 * Interpolate between two colors by interpolating the the red, 
 * green, and blue components individually.
 */
const lerp = (a, b, amount) => {
    return interpolate(a >> 16, b >> 16, amount) << 16
        | interpolate(a >> 8 & 0xff, b >> 8 & 0xff, amount) << 8
        | interpolate(a & 0xff, b & 0xff, amount);
};

/*
 * Linear interpolation between two values.
 */
const interpolate = (a, b, amount) => b + amount * (a - b);

/*
 * Convert a numeric value to an hex color string.
 */
const rgb = (a) => `#${a.toString(16).padStart(6, '0')}`;

/*
 * Fill the drawing area with a gradient.
 */
const gradient = (clr0, clr1) => {
    for (let i = 0; i < width; i++) {
        drawFilledRect(i, 0, 1, height, rgb(lerp(clr1, clr0, i / width)));
    }
};

gradient(0xff0000, 0x0000ff);