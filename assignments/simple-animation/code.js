
const drawBouncingThing = (time) => {
  clear();
  let left = time / 10 % (width * 2);
  let right = width - time / 10
  if (Math.min(left, right) === left) {
    drawFilledCircle(left, 200, 5, 'blue');
  } else if (Math.min(left, right) === right) {
    drawFilledCircle(width - right, 200, 5, 'blue');
  }
};

animate(drawBouncingThing);
