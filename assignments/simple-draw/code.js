/*
 * This code is running in an environment the same as simple-draw. Thus you have
 * two variables that will be helpful.
 *
 *  width - the width of the drawing area.
 *  height - the height of the drawing area.
 *
 * And these methods which do the same thing as in simple-draw.
 *
 *  drawLine(x1, y1, x2, y2, color, lineWidth)
 *
 *  drawCircle(x, y, radius, color, lineWidth=1)
 *
 *  drawRect(x, y, w, h, color, lineWidth=1)
 *
 *  drawTriangle(x1, y1, x2, y2, x3, y3, color, lineWidth=1)
 *
 *  drawFilledCircle(x, y, r, color)
 *
 *  drawFilledRect(x, y, width, height, color)
 *
 *  drawFilledTriangle(x1, y1, x2, y2, x3, y3, color)
 *
 *  clear()
 */

const lineOfCircles = (radius) => {
  const diameter = 2 * radius
  const dist = Math.floor(width / diameter) * diameter
  const extra = width - dist
  let x = 0
  while (x < width - extra) {
    drawFilledCircle(x + radius + extra / 2, height / 2, radius, 'red')
    x += diameter
  }
}
//lineOfCircles (23);

const lineOfAltCircles = (radius) => {
  const diameter = 2 * radius
  const dist = Math.floor(width / diameter) * diameter
  const extra = width - dist
  let color = 'blue'
  let x = 0
  while (x < width - extra) {
    if (color === 'red') {
      color = 'blue'
    } else {
      color = 'red'
    }
    drawFilledCircle(x + radius + extra / 2, height / 2, radius, color)
    x += diameter
  }
}
//lineOfAltCircles (23);

const fillWithCircles = (radius) => {
  const diameter = 2 * radius
  const xdist = Math.floor(width / diameter) * diameter
  const xextra = width - xdist
  const ydist = Math.floor(height / diameter) * diameter
  const yextra = height - ydist
  let y = 0
  while (y < height - yextra) {
    let x = 0
    while (x < width - xextra) {
      drawCircle(x + radius + xextra / 2, y + radius + yextra / 2, radius, 'blue')
      x += diameter
    }
    y += diameter
  }
}
//fillWithCircles (23);

const fillWithCirclesRand = (radius, probability) => {
  const diameter = 2 * radius
  const xdist = Math.floor(width / diameter) * diameter
  const xextra = width - xdist
  const ydist = Math.floor(height / diameter) * diameter
  const yextra = height - ydist
  let y = 0
  while (y < height - yextra) {
    let x = 0
    while (x < width - xextra) {
      let rand = Math.random()
      if (rand > probability) {
        drawCircle(x + radius + xextra / 2, y + radius + yextra / 2, radius, 'blue')
      } else {
        drawFilledCircle(x + radius + xextra / 2, y + radius + yextra / 2, radius, 'blue')
      }
      x += diameter
    }
    y += diameter
  }
}
//fillWithCirclesRand (23, 0.2);

const concentricCircles = (amountCircles) => {
  if (height <= width) {
    drawFilledCircle(width / 2, height / 2, height / 2, 'blue')
    const radiuses = (height / 2) / (amountCircles)
    let p = 0
    let color = 'red'
    let x = 0
    while (x < height / 2) {
      if (color === 'red') {
        color = 'blue'
      } else {
        color = 'red'
      }
      drawFilledCircle(width / 2, height / 2, height / 2 - p, color)
      p += radiuses
    }
  } else {
    drawFilledCircle(width / 2, height / 2, width / 2, 'blue')
    const radiuses = (width / 2) / (amountCircles)
    let p = 0
    let color = 'red'
    let x = 0
    while (x < width / 2) {
      if (color === 'red') {
        color = 'blue'
      } else {
        color = 'red'
      }
      drawFilledCircle(width / 2, height / 2, width / 2 - p, color)
      p += radiuses
    }
  }
}
//concentricCircles(13);

const checkerboard = (n) => {
  if (height <= width) {
    const squareSide = height / n
    const widthextra = (width - height) / 2
    drawFilledRect(widthextra, 0, height, height, 'red')
    let startpos = 0
    for (let x = 0; x < height - squareSide / (squareSide + 1); x += squareSide) {
      for (let y = startpos; y < height; y += 2 * squareSide) {
        drawFilledRect(x + widthextra, y, squareSide, squareSide, 'blue')
      }
      if (startpos == 0) {
        startpos += squareSide
      } else {
        startpos -= squareSide
      }
    }
  } else {
    const squareSide = width / n;
    const heightextra = (height - width) / 2
    drawFilledRect(0, heightextra + 0, width, width, 'red')
    let startpos = 0
    for (let y = 0; y < width - squareSide / (squareSide + 1); y += squareSide) {
      for (let x = startpos; x < width; x += 2 * squareSide) {
        drawFilledRect(x, y + heightextra, squareSide, squareSide, 'blue')
      }
      if (startpos == 0) {
        startpos += squareSide
      } else {
        startpos -= squareSide
      }
    }
  }
}
//checkerboard(8);

const notReallyCurved = (lines) => {
  const draw = width / lines
  for (let i = (height - width) / 2; i < width; i += draw) {
    drawLine(width, height - (height - width) / 2, 0, i - draw)
  }
}
//notReallyCurved (20);