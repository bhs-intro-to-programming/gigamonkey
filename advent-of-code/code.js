// Write your code here. To run a function on a given test file you need to
// create a file in your github repo in the advent-of-code branch and in the
// advent-of-code directory. Then you can use a function `run` to run a
// particular function on the contents of the file, which will be passed to your
// function as a string.
//
// For example, if I've created a file 'day_01.test' to contain the test data
// from day 1, and a function, day01Part1, I can run the function with this
// call:
//
//   run('day_01.test', day01Part1)
//
// Which will load the file and pass them to your function and then print the
// return value in the REPL.

const lines = (s) => s.trim().split('\n');

const day1 = () => {

  const part1 = (s) => {
    let elf = 0;
    let max = 0;
    for (const line of lines(s)) {
      if (line === '') {
        max = Math.max(max, elf);
        elf = 0;
      } else {
        elf += Number.parseInt(line, 10);
      }
    }
    return Math.max(max, elf);
  };

  const part2 = (s) => {
    const elves = [];
    let elf = 0;
    for (const line of lines(s)) {
      if (line === '') {
        elves.push(elf);
        elf = 0;
      } else {
        elf += Number.parseInt(line, 10);
      }
    }
    elves.push(elf);
    elves.sort((a, b) => b - a);
    return elves.slice(0, 3).reduce((acc, n) => acc + n, 0);
  }

  return { part1, part2 };
}

const day2 = () => {

  // Rock, Paper, Scissors

  const score = (them, me) => {
    const forShape = me + 1;
    if (them === me) {
      return 3 + forShape;
    } else if ((me + 1) % 3 === them) {
      return forShape;
    } else {
      return 6 + forShape;
    }
  };

  const outcome = (them, goal) => {
    // goal: 0 - lose; 1 - draw; 2 - win
    // 0: lose: them + 2 % 3
    // 1: draw: them + 0 % 3  
    // 2: win:  them + 1 % 3
    const me = (them + goal + 2) % 3;
    return score(them, me);
  }

  const numbers = (r) => ['ABC'.indexOf(r[0]), 'XYZ'.indexOf(r[2])];

  const part1 = (s) => lines(s).reduce((acc, r) => acc + score(...numbers(r)), 0);

  const part2 = (s) => lines(s).reduce((acc, r) => acc + outcome(...numbers(r)), 0);

  return { part1, part2 };

};


run('day_01.problem', day1().part2); // 74394
run('day_01.problem', day1().part2); // 212836
// run('day_02.problem', day2().part1); // 9241
// run('day_02.problem', day2().part2); // 14610