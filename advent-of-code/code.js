// Set this variable to your Github handle.
const USER = 'gigamonkey';

// Then write your code here. To run a function on a given test file you need to
// create a file in your github repo in the advent-of-code branch and in the
// advent-of-code directory. Then you can use the the run function 

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
    } else {
      elf += Number.parseInt(line, 10);
    }
  }
  elves.push(elf);
  elves.sort((a, b) => b - a);
  return elves.slice(0, 3).reduce((acc, n) => acc + n, 0);
}


//run('day_01.problem', day01Part1); // 74394
run('day_01.test', day01Part2); // 74394