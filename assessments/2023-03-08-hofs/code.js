const evens = (numbers) => {
  let r = [];
  for (let i = 0; i < numbers; i++) {
    if (numbers[i] % 2 === 0) {
      r.push(numbers[i]);
    }
  }
  return r;
}