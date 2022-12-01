const textIfOk = (r) => {
  if (r.ok) {
    return r.text();
  }
  throw r;
};


const url = "https://raw.githubusercontent.com/bhs-intro-to-programming/gigamonkey/main/advent-of-code/code.js"
const foo = () => {
  return fetch(url).then(textIfOk).then(t => console.log(t));
}

foo();