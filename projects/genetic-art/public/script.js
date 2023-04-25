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

  referenceImageData = ctx.getImageData(0, 0, w, h);
};

const rgba = ({r, g, b, a}) => `rgba(${r}, ${g}, ${b}, ${a / 255})`;

const drawTriangles = (triangles, ctx, width, height) => {
  ctx.clearRect(0, 0, width, height);
  triangles.forEach(t => drawTriangle(t, ctx));
  const fitness = scoreImage(ctx, width, height);
  doc.score.innerText = `Score: ${fitness}`;
  return fitness;
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

const makePopulation = (size, w, h) => Array(size).fill().map(() => random.triangles(50, w, h));

doc.reference.nextElementSibling.querySelector('a').href = "https://en.wikipedia.org/wiki/Mona_Lisa#/media/File:Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg";

const loop = (run, after) => {
  let done = false;
  const step = (t) => {
    done = run();
    if (!done) {
      requestAnimationFrame(step);
    } else {
      after();
    }
  };
  requestAnimationFrame(step);
};

const runPopulation = (pop, ctx, width, height) => {
  return new Promise((resolve, reject) => {
    let best = null;
    let max = -Infinity;
    let i = 0;
    loop(() => {
      if (i < pop.length) {
        const c = pop[i++];
        const fitness = drawTriangles(c, ctx, width, height);

        if (fitness > max) {
          console.log(fitness);
          max = fitness;
          best = c;
        }
      }
      return i >= pop.length;
    }, () => {
      resolve({best, fitness: max});
    });
  });
};


const image = new Image();
image.src = "mona-lisa.jpg";

image.onload = async () => {
  fillReference(image);

  const ctx = doc.generated.getContext('2d', { willReadFrequently: true });
  const { width, height } = doc.generated;
  const pop = makePopulation(1000, width, height);

  const {best, fitness} = await runPopulation(pop, ctx, width, height);
  drawTriangles(best, ctx, width, height);
};
