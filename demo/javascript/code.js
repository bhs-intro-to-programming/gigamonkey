const foo = (callback) => {
  setTimeout(() => callback('hello'), 2000);
}

const bar = () => {
  return new Promise((resolve, reject) => {
    foo(resolve);
  });
};

bar().then(x => console.log(x));