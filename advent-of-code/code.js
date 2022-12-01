const foo = (s) => {
  const lines = s.split('\n');
  let elf = 0;
  let max = 0;
  for (const line of lines) {
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