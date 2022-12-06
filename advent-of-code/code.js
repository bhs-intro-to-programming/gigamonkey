////////////////////////////////////////////////////////////////
// Utility functions

const lines = (s) => s.split('\n');

const trimmedLines = (s) => lines(s.trim());

const numbers = (s) => trimmedLines(s).map(t => Number.parseInt(t));

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

  const part1 = (s) => trimmedLines(s).reduce((acc, r) => acc + score(...moves(r)), 0);

  const part2 = (s) => trimmedLines(s).reduce((acc, r) => acc + outcome(...moves(r)), 0);

  return { part1, part2 };
};

const day3 = () => {

  const lowerBase = 'a'.codePointAt(0) - 1;
  const upperBase = 'A'.codePointAt(0) - 1;

  const compartments = (s) =>
    trimmedLines(s).map(t => [t.substring(0, t.length / 2), t.substring(t.length / 2)]);

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
    for (const g of groups(trimmedLines(s), 3)) {
      for (const c of intersection(...g)) {
        sum += priority(c);
      }
    }
    return sum;
  }

  return { part1, part2 };
};

const day4 = () => {

  const parsePair = (line) => line.split(',').map((x) => x.split('-').map(Number));

  const pairs = (s) => trimmedLines(s).map(parsePair);

  const subset = (a, b) => a[0] >= b[0] && a[1] <= b[1];

  const disjoint = (a, b) => a[1] < b[0] || b[1] < a[0];

  const part1 = (s) =>
    pairs(s)
      .reduce((acc, [a, b]) => acc + (subset(a, b) || subset(b, a) ? 1 : 0), 0);

  const part2 = (s) =>
    pairs(s).reduce((acc, [a, b]) => acc + (!disjoint(a, b) ? 1 : 0), 0);

  return { part1, part2 };

};

const day5 = () => {
  const stackPat = /^\s*(?:\[[A-Z]\]\s*)*$/;
  const numPat = /^(?:\s*\d+\s*)+$/;
  const movePat = /^move (\d+) from (\d+) to (\d+)$/;
  const rowPat = /(?: {4}|\[([A-Z])\] ?)/g;

  const parseRow = (line) => [...line.matchAll(rowPat)].map(x => x[1]);

  const crane1 = (num, from, to, stacks) => {
    for (let i = 0; i < num; i++) {
      stacks[to - 1].push(stacks[from - 1].pop());
    }
  };

  const crane2 = (num, from, to, stacks) => {
    const source = stacks[from - 1];
    const dest = stacks[to - 1];
    dest.splice(dest.length, 0, ...source.slice(source.length - num));
    source.splice(source.length - num, num);
  };



  const mover = (s, move) => {
    const stacks = [];
    for (const line of lines(s)) {
      if (line.trim() === '') continue;

      const m = line.match(stackPat);
      if (m) {
        parseRow(line).forEach((e, i) => {
          if (e) {
            if (!stacks[i]) stacks[i] = [];
            stacks[i].unshift(e);
          }
        });
      } else if (line.match(numPat)) {
      } else {
        const m = line.match(movePat);
        if (m) {
          const [_, num, from, to] = m;
          move(Number(num), Number(from), Number(to), stacks);
        }
      }
    }
    return stacks.map(s => s[s.length - 1]).join('');
  };

  const part1 = (s) => mover(s, crane1);
  const part2 = (s) => mover(s, crane2);

  return { part1, part2 };

};

// N.B. These won't necessarily output in order due to async fetch.
if (false) {
  run('day_01.problem', day1().part1, 74394);
  run('day_01.problem', day1().part2, 212836);
  run('day_02.problem', day2().part1, 9241);
  run('day_02.problem', day2().part2, 14610);
  run('day_03.problem', day3().part1, 8185);
  run('day_03.problem', day3().part2, 2817);
  run('day_04.problem', day4().part1, 657);
  run('day_04.problem', day4().part2, 938);
}

run('day_05.problem', day5().part1, 'QNHWJVJZW');
run('day_05.test', day5().part2);

