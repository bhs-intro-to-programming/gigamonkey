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

run('gigamonkey', 'day_01.problem', day01Part1); // 74394