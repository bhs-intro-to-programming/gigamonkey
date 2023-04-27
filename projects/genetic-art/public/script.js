import { point, color, triangle, rgba, rgb, drawTriangle, drawTriangles } from './graphics.js';

const doc = Object.fromEntries([...document.querySelectorAll('[id]')].map(e => [e.id, e]));

const IMAGE_URL = "https://en.wikipedia.org/wiki/Mona_Lisa#/media/File:Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg";

let oldBest = 0;
let number = 0;

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

const fillReference = (image, url, width, height) => {
  sizeCanvases(width, height);
  doc.reference.nextElementSibling.querySelector('a').href = url;

  const ctx = doc.reference.getContext('2d');
  const dim = 550;
  ctx.drawImage(image, 300, 150, dim, dim, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height).data;

  // The farthest away one image can be from another given the number of pixels.
  const farthest = Math.sqrt(((imageData.length / 4) * 3) * 255 ** 2)

  return { imageData, width, height, farthest };
};

const sizeCanvases = (width, height) => {
  document.querySelectorAll('canvas').forEach(e => {
    e.width = width;
    e.height = height;
  });
};

const scoreImage = (ctx, problem) => {
  const { imageData, width, height, farthest } = problem;

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
  return (farthest - Math.sqrt(sum)) / farthest;
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


/*
 * Score all the members of the population by drawing them and measuring the
 * pixel-by-pixel differenc.
 */
const runPopulation = (pop, ctx, problem) => {
  const { width, height } = problem;

  return new Promise((resolve, reject) => {
    let i = 0;
    let best = -Infinity;
    const scored = [];
    loop(() => {
      if (i < pop.length) {
        number++;

        const dna = pop[i++];
        const fitness = scoreCritter(dna, ctx, problem);

        if (fitness > best) {
          best = fitness;
          drawTriangles(dna, doc.best.getContext('2d'), width, height);
          doc.bestScore.innerText = `Score: ${fitness.toFixed(4)}`;
          newBest(dna, fitness, problem);
        }
        scored.push({ dna, fitness });
      }
      return i >= pop.length;
    }, () => resolve(scored));
  });
};

const scoreCritter = (dna, ctx, problem) => {
  drawTriangles(dna, ctx, problem.width, problem.height);
  const fitness = scoreImage(ctx, problem);
  doc.score.innerText = `Score: ${fitness.toFixed(4)}`;
  return fitness;
};

const runContinuous = (start, ctx, problem) => {

  let best = { dna: start, fitness: scoreCritter(start, ctx, problem) };

  const step = (t) => {
    doc.generation.innerText = `#${number++}`;

    const dna = mutate(best, problem);
    const fitness = scoreCritter(dna, ctx, problem);

    if (fitness > best.fitness) {
      best = { dna, fitness };
      newBest(best, problem);
    }
    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const newBest = (best, problem) => {

  const { dna, fitness } = best;
  const { width, height } = problem;

  drawTriangles(dna, doc.best.getContext('2d'), width, height);
  doc.bestScore.innerText = `Score: ${fitness.toFixed(4)}`;

  const oldDistance = 1 - oldBest;
  const newDistance = 1 - fitness;

  if (newDistance < oldDistance * 0.9) {
    oldBest = fitness;

    const template = document.querySelector(`#newbest`).content.cloneNode(true);
    const canvas = template.querySelector('canvas');
    const caption = template.querySelector('figcaption');

    canvas.width = width;
    canvas.height = height;

    drawTriangles(dna, canvas.getContext('2d'), width, height);
    caption.innerText = `#${number}; fitness: ${fitness.toFixed(4)}`;

    document.querySelector('#bests').prepend(template);
  }
};

const clamp = (n, min, max) => Math.min(Math.max(min, n), max);

const mutatePoint = (p, problem) => {
  return {
    x: clamp(p.x + random.number(-5, 5), 0, problem.width),
    y: clamp(p.y + random.number(-5, 5), 0, problem.height),
  };
};

const mutateColor = (color) => {
  const { r, g, b, a } = color;
  return {
    r: clamp(r + random.number(-5, 5), 0, 255),
    g: clamp(g + random.number(-5, 5), 0, 255),
    b: clamp(b + random.number(-5, 5), 0, 255),
    a: clamp(a + random.number(-5, 5), 0, 255),
  };
};

const mutateTriangle = (triangle, problem) => {
  const { a, b, c, color } = triangle;
  if (Math.random() < 0.01) {
    if (Math.random() < 0.5) {
      return {
        a: mutatePoint(a, problem),
        b: mutatePoint(b, problem),
        c: mutatePoint(c, problem),
        color
      };
    } else {
      return { a, b, c, color: mutateColor(color) };
    }
  } else {
    return { a, b, c, color };
  }
};

const mutate = (critter, problem) => {
  const { dna, fitness } = critter;
  const newTriangles = dna.map(t => mutateTriangle(t, problem));
  const swaps = random.number(3);
  for (let i = 0; i < swaps; i++) {
    const a = random.number(newTriangles.length);
    const b = random.number(newTriangles.length);
    const tmp = newTriangles[a];
    newTriangles[a] = newTriangles[b];
    newTriangles[b] = tmp;
  }
  /*
  if (Math.random() < 0.001) {
    newTriangles[random.number(newTriangles.length)] = random.triangle(problem.width, problem.height);
    }
  */
  return newTriangles;
};

const image = new Image();

image.onload = async () => {
  const problem = fillReference(image, IMAGE_URL, 200, 200);
  const start = random.triangles(64, problem.width, problem.height);
  const ctx = doc.generated.getContext('2d', { willReadFrequently: true });
  runContinuous(start, ctx, problem)
};

image.src = "mona-lisa.jpg";
