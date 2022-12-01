const url = "https://github.com/bhs-intro-to-programming/gigamonkey/blob/main/advent-of-code/code.js";

const foo = async () => {
const d = await fetch(url);
console.log(d);
}

foo();