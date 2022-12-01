const url = "https://github.com/bhs-intro-to-programming/gigamonkey/blob/main/advent-of-code/code.js";

const foo = async () => {
  await fetch(url).then(console.log);
}

foo();