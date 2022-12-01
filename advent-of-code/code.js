const day01Part1 = (s) => {
  let elf = 0;
  let max = 0;
  for (const line of s.split('\n')) {
    if (line === '') {
      max = Math.max(max, elf);
      elf = 0;
    } else {
      elf += Number.parseInt(line, 10);
    }
  }
  return Math.max(max, elf);
};

// Write your code here. To run a function on a given test file you need to
// create a file in your github repo in the advent-of-code branch and in the
// advent-of-code directory. Then you can use the

const user = 'gigamonkey';



run('day_01.problem', day01Part1); // 74394