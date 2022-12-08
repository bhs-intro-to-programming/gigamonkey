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
    for (let i = length; i < s.length; i++) {
      if (new Set(s.substring(i - length, i)).size === length) {
        return i;
      }
    }
  };

  const part1 = (s) => findMarker(s, 4);

  const part2 = (s) => findMarker(s, 14);

  return { part1, part2 };

};

const day7 = () => {

  const FS_SIZE = 70_000_000;
  const NEEDED = 30_000_000;

  const dir = (name, parent) => ({ name, dirs: {}, files: {}, type: 'dir', parent });

  const file = (size, name) => ({ name, size, type: 'file' });

  const toAction = (line) => {
    let m;
    if (m = line.match(/^\$ cd (.*)$/)) {
      return cder(m[1]);
    } else if (line === '$ ls') {
      return ls;
    } else if (m = line.match(/^dir (.*)$/)) {
      return direr(m[1]);
    } else if (m = line.match(/^(\d+) (.*)$/)) {
      return filer(Number.parseInt(m[1]), m[2]);
    } else {
      return (c) => { console.log(`huh? line: '${line}'`); };
    }
  }

  const cder = (name) => {
    if (name === "..") {
      return (c) => c.parent;
    } else if (name === "/") {
      return (c) => {
        while (c.parent !== null) {
          c = c.parent;
        }
        return c;
      }
    } else {
      return (c) => c.dirs[name];
    }
  };

  const ls = (c) => c;

  const direr = (name) => (c) => {
    if (!(name in c.dirs)) {
      c.dirs[name] = dir(name, c);
    }
    return c;
  };

  const filer = (size, name) => (c) => {
    if (!(name in c)) {
      c.files[name] = file(size, name);
    }
    return c;
  };

  const actions = (s) => lines(s).map(toAction);

  const sized = (dir) => {
    if (!('size' in dir)) {
      dir.size = Object.values(dir.files).reduce((acc, f) => acc + f.size, 0);
      Object.values(dir.dirs).forEach((d) => {
        dir.size += sized(d).size;
      });
    }
    return dir;
  };

  const loadFS = (s) => {
    const root = dir("/", null);
    actions(s).reduce((current, action) => action(current), root);
    return sized(root);
  };

  const sumAtMost100k = (d) => {
    const below = Object.values(d.dirs).reduce((acc, d) => acc + sumAtMost100k(d), 0);
    return below + (d.size <= 100_000 ? d.size : 0);
  };

  const smallestAbove = (d, minimum) => {
    return Object.values(d.dirs).reduce((best, x) => {
      if (x.size >= minimum) {
        const b = smallestAbove(x, minimum);
        return b.size < best.size ? b : best;
      } else {
        return best;
      }
    }, d);
  };

  const part1 = (s) => sumAtMost100k(loadFS(s));

  const part2 = (s) => {
    const root = loadFS(s);
    return smallestAbove(root, NEEDED - (FS_SIZE - root.size)).size;
  };

  return { part1, part2 };
}

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
  run('day_07.problem', day7().part1, 2061777);
  run('day_07.problem', day7().part2, 4473403);
}
