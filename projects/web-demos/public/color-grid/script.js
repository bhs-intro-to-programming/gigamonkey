const randomRGB = () =>
  Array(3)
    .fill()
    .map(() => Math.floor(Math.random() * 255));

const rgb = (r, g, b) => `rgb(${r}, ${g}, ${b})`;

const setRandomColor = (element) => {
  const [r, g, b] = randomRGB();
  element.style.background = rgb(r, g, b);
  element.style.color = rgb(255 - r, 255 - g, 255 - b);
};

const grid = document.querySelector('#grid');

for (let i = 0; i < 5 * 5; i++) {
  const div = document.createElement('div');
  div.classList.add('box');
  setRandomColor(div);
  div.onclick = (e) => setRandomColor(e.target);
  grid.append(div);
}

document.querySelector('button').onclick = (e) => {
  grid.querySelectorAll('div').forEach((div) => {
    setRandomColor(div);
  });
};
