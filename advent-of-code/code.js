////////////////////////////////////////////////////////////////
// Utility functions

const lines = (s) => s.trimEnd().split('\n');

const numbers = (s) => lines(s).map(t => Number.parseInt(t));

const groups = (xs, n) => {
  let r = [];
  for (let i = 0; i < xs.length / n; i++) {
    r.push(xs.slice(i * n, (i + 1) * n));
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

const day4 = () => {

  const parsePair = (line) => line.split(',').map((x) => x.split('-').map(Number));

  const pairs = (s) => lines(s).map(parsePair);

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

  const crateMover9000 = (num, from, to, stacks) => {
    for (let i = 0; i < num; i++) {
      stacks[to - 1].push(stacks[from - 1].pop());
    }
  };

  const crateMover9001 = (num, from, to, stacks) => {
    const source = stacks[from - 1];
    const dest = stacks[to - 1];
    dest.splice(dest.length, 0, ...source.slice(source.length - num));
    source.splice(source.length - num, num);
  };

  const move = (s, move) => {
    const stacks = [];
    for (const line of lines(s)) {
      if (line.trim() === '' || line.match(numPat)) continue;

      if (line.match(stackPat)) {
        parseRow(line).forEach((e, i) => {
          if (e) {
            if (!stacks[i]) stacks[i] = [];
            stacks[i].unshift(e);
          }
        });
      } else {
        let m;
        if (m = line.match(movePat)) {
          const [_, num, from, to] = m;
          move(Number(num), Number(from), Number(to), stacks);
        }
      }
    }
    return stacks.map(s => s[s.length - 1]).join('');
  };

  const part1 = (s) => move(s, crateMover9000);
  const part2 = (s) => move(s, crateMover9001);

  return { part1, part2 };

};

const day6 = () => {

  const findMarker = (s, length) => {
    const unique = new Set();
    for (let i = 0; i < s.length; i++) {
      if (i > length) {
        console.log(`deleting ${s[i - length}; size before: ${unique.size}`);
        unique.delete(s[i - length]);
        console.log(`deleting ${s[i - length}; size after: ${unique.size}`);
      }
      unique.add(s[i]);
      console.log(`i: ${i}; deleting ${s[i - length] || ''}; adding: ${s[i]}; size: ${unique.size} : ${JSON.stringify([...unique])}`);
      if (unique.size === length) return i - 1;
    }
  };

  const part1 = (s) => findMarker(s, 4);

  const part2 = (s) => findMarker(s, 14);

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
  run('day_05.problem', day5().part1, 'QNHWJVJZW');
  run('day_05.problem', day5().part2, 'BPCZJLFJW');
  run('day_06.problem', day6().part1, 1578);
  run('day_06.problem', day6().part2, 2178);
}

//run('day_06.problem', day6().part1, 1578);
//run('day_06.problem', day6().part2, 2178);



console.log(day6().part2('mjqjpqmgbljsphdztnvjfqwrcgsmlb'));