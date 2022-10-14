const size = 4;

const columns = Math.floor(width / size);
const rows = Math.floor(height / size);

const fill = (r, c) => {
  drawFilledRect(c * size, r * size, size, size, 'green');
}

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < columns; c++) {
    if (Math.random() < 0.2) {
      fill(r, c);
    }
  }
}