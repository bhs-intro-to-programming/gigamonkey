import { point, color, triangle, rgba, rgb, drawTriangle, drawTriangles } from './graphics.js';
import { randomInt, randomizer } from './random.js';

const doc = Object.fromEntries([...document.querySelectorAll('[id]')].map(e => [e.id, e]));

const POP_SIZE = 1000;
const TRIANGLES = 64;

const IMAGE = {
  cite: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
  src: 'mona-lisa.jpg',
  x: 300,
  y: 150,
  width: 575,
  height: 700,
}

let oldBest = 0;
let critterNumber = 0;

const random = {

  number: (min, max) => max === undefined ? random.number(0, min) : randomInt(min, max),

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

  population: (size, w, h) => Array(size).fill().map(() => random.triangles(TRIANGLES, w, h)),

};

const loadReference = (image, scale, start) => {

  const width = image.width * scale;
  const height = image.height * scale;

  const img = new Image();

  img.onload = async () => {

    sizeCanvases(width, height);
    doc.reference.nextElementSibling.querySelector('a').href = image.cite;

    const ctx = doc.reference.getContext('2d');
    ctx.drawImage(img, image.x, image.y, image.width, image.height, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height).data;

    // The farthest away one image can be from another given the number of
    // pixels. In practice we can't actually be this far away from an actual
    // image unless it is either completely white or completely black.
    const farthest = Math.sqrt(((imageData.length / 4) * 3) * 255 ** 2)

    const ctx2 = doc.generated.getContext('2d', { willReadFrequently: true });

    start(ctx2, { imageData, width, height, farthest });
  };

  img.src = image.src;
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
  return ((farthest - Math.sqrt(sum)) / farthest) ** 2;
};

const scored = (dna, ctx, problem) => {
  doc.generation.innerText = `${TRIANGLES} triangles - #${critterNumber++}`;
  drawTriangles(dna, ctx, problem.width, problem.height);
  const fitness = scoreImage(ctx, problem);
  doc.score.innerText = `Score: ${fitness.toFixed(4)}`;
  return { dna, fitness };
};

/*
 * Asexual reproduction. Basically hill-climbing by mutating the current best
 * until we get a better one.
 */
const runContinuous = (ctx, problem) => {
  const start = random.triangles(TRIANGLES, problem.width, problem.height);
  let best = scored(start, ctx, problem);
  newBest(best, problem);

  const step = () => {
    const next = scored(mutate(best.dna, problem), ctx, problem);
    if (next.fitness > best.fitness) {
      best = next;
      newBest(best, problem);
    }
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const runPopulation = async (ctx, problem) => {
  let gen = 0;
  console.log(`Generation ${gen++}`);
  const seedDNA = random.population(POP_SIZE, problem.width, problem.height);
  let population = await scoreGenomes(seedDNA, ctx, problem);

  while (true) {
    // TODO: display best and worst.
    console.log(`Generation ${gen++}`);
    population = await scoreGenomes(newPopulation(population, problem), ctx, problem);
  }
};

/*
 * Score all the genomes in a population by drawing them and measuring the
 * pixel-by-pixel difference, returning a Promise of the scored population.
 */
const scoreGenomes = (genomes, ctx, problem) => {
  console.log('Scoring genomes.');
  return new Promise((resolve, reject) => {

    let i = 0;
    let best = { dna: null, fitness: -Infinity };

    const withScores = [];

    const step = () => {
      if (i < genomes.length) {
        const next = scored(genomes[i++], ctx, problem);
        withScores.push(next);
        if (next.fitness > best.fitness) {
          best = next
          newBest(best, problem);
        }
        requestAnimationFrame(step);
      } else {
        resolve(withScores);
      }
    };
    requestAnimationFrame(step);
  });
};

const cross = (dna1, dna2) => dna1.map((t, i) => Math.random() < 0.5 ? t : dna2[i]);

const newPopulation = (population, problem) => {
  const r = randomizer(population, 'fitness');
  return population.map(() => mutate(cross(r().dna, r().dna), problem));
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
    caption.innerText = `#${critterNumber}; fitness: ${fitness.toFixed(4)}`;

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

const mutate = (dna, problem) => {
  const newTriangles = dna.map(t => mutateTriangle(t, problem));
  const swaps = random.number(3);
  for (let i = 0; i < swaps; i++) {
    const a = random.number(newTriangles.length);
    const b = random.number(newTriangles.length);
    const tmp = newTriangles[a];
    newTriangles[a] = newTriangles[b];
    newTriangles[b] = tmp;
  }
  if (Math.random() < 0.001) {
    newTriangles[random.number(newTriangles.length)] = random.triangle(problem.width, problem.height);
  }
  return newTriangles;
};

// Kick things off by loading our reference image.
loadReference(IMAGE, 200 / IMAGE.width, runPopulation);
