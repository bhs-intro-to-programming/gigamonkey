const doc = Object.fromEntries([...document.querySelectorAll('[id]')].map(e => [e.id, e]));

const point =  (x, y) => ({ x, y });
const color = (r, g, b, a) => ({ r, g, b, a });
const triangle = (a, b, c, color) => ({ a, b, c, color });

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

const fillReference = (image) => {
  const { width, height } = sizeCanvases(image);
  const ctx = doc.reference.getContext('2d');
  ctx.drawImage(image, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height).data;

  // The farthest away one image can be from another given the number of pixels.
  const farthest = Math.sqrt(((imageData.length / 4) * 3) * 255 ** 2)

  return { imageData, width, height, farthest };
};

const sizeCanvases = (image) => {
  const width = 500;
  const height = image.naturalHeight * width / image.naturalWidth;
  document.querySelectorAll('canvas').forEach(e => {
    e.width = width;
    e.height = height;
  });
  return { width, height };
};

const rgba = ({r, g, b, a}) => `rgba(${r}, ${g}, ${b}, ${a / 255})`;

const drawTriangles = (triangles, ctx, width, height) => {
  ctx.clearRect(0, 0, width, height);
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

const scoreImage = (ctx, problem) => {
  const { imageData, width, height } = problem;

  const generatedImageData = ctx.getImageData(0, 0, width, height).data;
  let sum = 0;

  for (let i = 0; i < generatedImageData.length; i += 4) {
    const ref = rgb(imageData, i);
    const gen = rgb(generatedImageData, i);
    ref.forEach((n, i) => {
      sum += (n - gen[i]) ** 2;
    });
  }

  // If the distance is zero the fitness is 1.0. If distance is actually the
  // farthest away we can be then fitness is 0.0.
  return (problem.farthest - Math.sqrt(sum)) / problem.farthest;
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

const runPopulation = (pop, ctx, problem) => {
  const { width, height } = problem;
  return new Promise((resolve, reject) => {
    let i = 0;
    let best = -Infinity;
    const scored = [];
    loop(() => {
      if (i < pop.length) {
        const dna = pop[i++];

        drawTriangles(dna, ctx, width, height);

        const fitness = scoreImage(ctx, problem);
        doc.score.innerText = `Score: ${fitness}`;

        if (fitness > best) {
          best = fitness;
          drawTriangles(dna, doc.best.getContext('2d'), width, height);
          doc.bestScore.innerText = `Score: ${fitness}`;
        }
        scored.push({ dna, fitness });
      }
      return i >= pop.length;
    }, () => resolve(scored));
  });
};

doc.reference.nextElementSibling.querySelector('a').href = "https://en.wikipedia.org/wiki/Mona_Lisa#/media/File:Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg";

const image = new Image();
image.src = "mona-lisa.jpg";

image.onload = async () => {

  const problem = fillReference(image);

  const ctx = doc.generated.getContext('2d', { willReadFrequently: true });
  const { width, height } = doc.generated;
  const pop = makePopulation(1000, problem.width, problem.height);

  const scored = await runPopulation(pop, ctx, problem);
  const best = scored.reduce((best, c) => c.fitness > best.fitness ? c : best);
  drawTriangles(best.dna, ctx, width, height);
  doc.score.innerText = `Score: ${best.fitness}`;
};
