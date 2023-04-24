const doc = Object.fromEntries([...document.querySelectorAll('[id]')].map(e => [e.id, e]));

let referenceImageData;

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

  const ctx = doc.reference.getContext('2d');
  ctx.drawImage(image, 0, 0, w, h);

  // For debugging fitness function.
  //const ctx2 = doc.generated.getContext('2d');
  //ctx2.drawImage(image, 0, 0, w, h);

  referenceImageData = ctx.getImageData(0, 0, w, h);
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

const rgb = (data, idx) => {
  const r = data[idx];
  const g = data[idx + 1];
  const b = data[idx + 2];
  const a = data[idx + 3];
  return toRGB(r, g, b, a);
};

const scoreImage = (ctx, width, height) => {
  const generatedImageData = ctx.getImageData(0, 0, width, height).data;
  let sum = 0;
  let limit = 0;

  // The farthest away one image can be from another given the number of pixels.
  const farthest = Math.sqrt(((generatedImageData.length / 4) * 3) * 255 ** 2)

  for (let i = 0; i < generatedImageData.length; i += 4) {
    const ref = rgb(referenceImageData.data, i);
    const gen = rgb(generatedImageData, i);
    if (limit > 0) {
      console.log(`ref: ${ref}; gen: ${gen}`);
    }
    ref.forEach((n, i) => {
      if (limit > 0) {
        console.log(`  ref: ${n}; gen: ${gen[i]}`);
      }
      sum += (n - gen[i]) ** 2;
    });
    limit--;
  }

  const distance = Math.sqrt(sum);

  // If the distance is zero the fitness is 1.0. If distance is actually the
  // farthest away we can be then fitness is 0.0.
  return (farthest - distance) / farthest;
}

/*
 * Translate value at a given alpha to the corresponding value at full opacity.
 * Loosely based on code from https://stackoverflow.com/a/11615135.
 */
const opaquify = (v, a) => Math.round((v * a) / 255 + (255 - a));

/*
 * Translate rgba values we get from ImageData into RGB triples.
 */
const toRGB = (r, g, b, a) => [r, g, b].map((v) => opaquify(v, a));


const image = new Image();
image.src = "mona-lisa.jpg";
image.onload = () => {
  fillReference(image);
  console.log(referenceImageData);

  const ctx = doc.generated.getContext('2d');
  drawTriangles(random.triangles(50, doc.generated.width, doc.generated.height), ctx);
  console.log(scoreImage(ctx, doc.generated.width, doc.generated.height));
};
