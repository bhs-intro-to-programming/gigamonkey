const getX = (o) => o.x;

const point = (x, y) => { return { x: x, y: y }; };

const emptyObject = () => ({});

const distance = (p1, p2) => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}