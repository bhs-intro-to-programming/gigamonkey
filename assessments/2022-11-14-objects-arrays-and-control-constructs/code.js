// Advanced solutions using various features I've shown some of you (plus maybe even a couple that )

const area = (rect) => {
  return rect.width * rect.height;
};

const higherPaid = (e1, e2) => {
  if (e1.salary > e2.salary) {
    return e1;
  } else {
    return e2;
  }
};

const isSamePoint = (p1, p2) => {
  return p1.x === p2.x && p1.y && p2.y;
};