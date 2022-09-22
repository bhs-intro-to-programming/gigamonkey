/*
   This code is running in an environment with five functions defined:

    drawLine(x1, y1, x2, y2, color, lineWidth)

      Draws a line from x1,y1 to x2,y2 using the give color. The fifth argument,
      lineWidth, is optional and defaults to 1.

    drawCircle(x, y, r, color, lineWidth=1)

      Draws a circle centered at x,y with radius r using the given color. The
      fith argument, lineWidth, is optional and defaults to 1.

    drawRect(x, y, width, height, color, lineWidth=1)

      Draws a rectangle starting at x,y with the given width, height, and color.
      Positive widths go to the right and negative to the left; positive heights
      go down and negative heights go up. The sixth argument, lineWidth, is
      optional and defaults to 1.

    drawTriangle(x1, y1, x2, y2, x3, y3, color, lineWidth = 1)

      Draws a triangle connecting points x1,y1, x2,y2, and x3,y3 with lines of
      the given color. The last argument, lineWidth, is optional and defaults to
      1.

    drawFilledRect(x, y, width, height, color)

      Draws a filled rectangle starting at x,y with the given width, height, and
      color. Positive widths go to the right and negative to the left; positive
      heights go down and negative heights go up.

    drawFilledCircle(x, y, r, color)

      Draws a filled circle centered at x,y with radius r using the given color.

    drawFilledTriangle(x1, y1, x2, y2, x3, y3, color)

      Draws a triangle connecting points x1,y1, x2,y2, and x3,y3 with filled
      with the given color.

   There are also a couple use variables.

    width - the width of the drawing area.

    height - the height of the drawing area.

   Note that the coordinate system goes from 0,0 at the top left corner to
   width,height at the bottom right corner.
 */


const fillWithCircles = (r) => {
  const d = r * 2;
  const extraWidth = width % d;
  const extraHeight = height % d;
  const inRow = (width - extraWidth) / d;
  const inColumn = (height - extraHeight) / d;
  for (let row = 0; row < inRow; row++) {
    for (let col = 0; col < inCol; col++) {
      drawCircle(extraWidth / 2 + row * d, extraHeight / 2 + col * d, r, 'blue');
    }
  }
};

fillWithCircles(23);