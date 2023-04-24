const doc = Object.fromEntries([...document.querySelectorAll('[id]')].map(e => [e.id, e]));

const random = {

  number: (min, max) => max === undefined ? random.number(0, min) : min + Math.floor(Math.random() * (max - min)),

  point: (width, height) => point(random.number(width), random.number(height)),

  color: () => color(random.number(255), random.number(255), random.number(255), random.number(255)),

  triangle: (width, height) => {
    return triangle(
      random.point(width, height),
      random.point(width, height),
      random.point(width, height),
      random.color())
  },

  triangles: (n, width, height) => Array(n).fill().map(() => random.triangle(width, height)),

};

const point =  (x, y) => ({ x, y });
const color = (r, g, b, a) => ({ r, g, b, a });
const triangle = (a, b, c, color) => ({ a, b, c, color });

const fillReference = (image) => {

  const w = 500;
  const h = image.naturalHeight * w / image.naturalWidth;

  doc.reference.width = w
  doc.reference.height = h;

  doc.generated.width = w;
  doc.generated.height = h;

  doc.reference.getContext('2d').drawImage(image, 0, 0, w, h);
};

const rgba = ({r, g, b, a}) => `rgba(${r}, ${g}, ${b}, ${a / 255})`;

const drawTriangles = (triangles, ctx) => {
  triangles.forEach(t => drawTriangle(t, ctx));
};

const drawTriangle = (triangle, ctx) => {
  const { a, b, c, color } = triangle;
  ctx.fillStyle = rgba(color);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.lineTo(c.x, c.y);
  ctx.lineTo(a.x, a.y);
  ctx.fill();
};

const image = new Image();
image.src = "mona-lisa.jpg";
image.onload = () => {
  fillReference(image);
  const ctx = doc.generated.getContext('2d');
  drawTriangles(random.triangles(50, doc.generated.width, doc.generated.height), ctx);
};
