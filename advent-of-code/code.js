const foo = (s) => {
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
  max = Math.max(max, elf);
  return max;
};

run('gigamonkey', 'day_01.test', foo);