const url = "https://raw.githubusercontent.com/bhs-intro-to-programming/gigamonkey/main/advent-of-code/code.js"
const foo = () => {
  return fetch(url).then(x => x.text(t => console.log(t)));
}

foo();