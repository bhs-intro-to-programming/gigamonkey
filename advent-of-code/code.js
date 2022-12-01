const foo = (s) => {
  const lines = s.split('\n');
  return lines.length;
};

run('gigamonkey', 'day_01.test', foo);