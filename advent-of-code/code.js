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

const lines = (s) => s.split('\n');

const day01Part1 = (s) => {
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

const day01Part2 = (s) => {
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

const day2 = () => {

  const score = (them, me) => {
    const forShape = me + 1;
    if (them === me) {
      return 3 + forShape;
    } else if ((them + 1) % 3 === me) {
      return forShape;
    } else {
      return 6 + forShape;
    }
  };

  const part1 = (s) => {
    console.log(s);
    const total = 0;
    for (const round of lines(s)) {
      total += score('ABC'.indexOf(round[0]), 'XYZ'.indexOf(round[2]));
    }
    console.log(total);
    return total;
  };

  const part2 = (s) => {

  };

  return { part1, part2 };

};


// run('day_01.problem', day01Part1); // 74394
// run('day_01.problem', day01Part2); // 212836

run('day_02.test', day2().part1);