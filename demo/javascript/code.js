const foo = (callback) => {
  setTimeout(() => callback('hello'), 2000);
}

const bar = () => {
  return new Promise((resolve, reject) => {
    foo(resolve);
  });
};

const p = Promise.resolve(10); // bar();
console.log(p);
p.then(x => console.log(`The promise was kept! ${x}`));