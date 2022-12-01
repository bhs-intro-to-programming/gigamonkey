const url = "https://github.com/bhs-intro-to-programming/gigamonkey/blob/main/advent-of-code/code.js";

const foo = () => {
  return fetch(url).then(x => console.log(x));
}

foo();