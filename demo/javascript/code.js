const foo = (callback) => {
  setTimeout(() => callback('hello'), 2000);
}

const bar = () => {
  return new Promise((resolve, reject) => {
    foo(resolve);
  });
};

const p = bar();
console.log(p);
p
  .then(x => console.log(`The promise was kept! ${x}`))
  .catch(e => console.log(`Problem: ${e}`));

const fn = () => 10;

console.log(typeof fn);

const x = { foo: () => console.log('foo'); }