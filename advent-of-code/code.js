////////////////////////////////////////////////////////////////
// Utility functions

const lines = (s) => s.trim().split('\n');

const numbers = (s) => lines(s).map(t => Number.parseInt(t));

const groups = (xs, n) => {
  let r = [];
  for (let i = 0; i < xs.length / 3; i++) {
    r.push(xs.slice(i * 3, (i + 1) * 3));
  }
  return r;
};

const intersection = (...args) => {
  return args.reduce((acc, xs, i) => {
    return i === 0
      ? new Set(xs)
      : new Set([...xs].filter(x => acc.has(x)))
  }, null);
};

const show = (s) => s;

////////////////////////////////////////////////////////////////
// Daily code

const day1 = () => {

  const elves = (s) => {
    const elves = [];
    let elf = 0;
    numbers(s).forEach((n) => {
      if (Number.isNaN(n)) {
        elves.push(elf);
        elf = 0;
      } else {
        elf += n;
      }
    });
    elves.push(elf);
    return elves.sort((a, b) => b - a);
  }

  const part1 = (s) => elves(s)[0];

  const part2 = (s) => elves(s).slice(0, 3).reduce((acc, n) => acc + n, 0);

  return { part1, part2 };
};

const day2 = () => {

  // Order: Rock, Paper, Scissors

  const score = (them, me) => (((me - them) + 4) % 3) * 3 + (me + 1);

  // goal 0: lose: them + 2 % 3
  // goal 1: draw: them + 0 % 3  
  // goal 2: win:  them + 1 % 3
  const outcome = (them, goal) => score(them, (them + goal + 2) % 3);

  const moves = (r) => ['ABC'.indexOf(r[0]), 'XYZ'.indexOf(r[2])];

  const part1 = (s) => lines(s).reduce((acc, r) => acc + score(...moves(r)), 0);

  const part2 = (s) => lines(s).reduce((acc, r) => acc + outcome(...moves(r)), 0);

  return { part1, part2 };
};

const day3 = () => {

  const lowerBase = 'a'.codePointAt(0) - 1;
  const upperBase = 'A'.codePointAt(0) - 1;

  const compartments = (s) =>
    lines(s).map(t => [t.substring(0, t.length / 2), t.substring(t.length / 2)]);

  const priority = (c) => {
    const cp = c.codePointAt(0);
    return cp > lowerBase ? cp - lowerBase : 26 + cp - upperBase;
  };

  const part1 = (s) => {
    let sum = 0;
    for (const [a, b] of compartments(s)) {
      for (const c of intersection(a, b)) {
        sum += priority(c);
      }
    }
    return sum;
  };

  const part2 = (s) => {
    let sum = 0;
    for (const g of groups(lines(s), 3)) {
      for (const c of intersection(...g)) {
        sum += priority(c);
      }
    }
    return sum;
  }

  return { part1, part2 };
};

// N.B. These won't necessarily output in order due to async fetch.
if (true) {
  run('day_01.problem', day1().part1, 74394);
  run('day_01.problem', day1().part2, 212836);
  run('day_02.problem', day2().part1, 9241);
  run('day_02.problem', day2().part2, 14610);
  run('day_03.problem', day3().part1, 8185);
  run('day_03.problem', day3().part2, 2817);
}
