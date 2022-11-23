let move = 0;
let fontSize = Math.min(width, height) * 0.3);

registerOnclick((x, y) => {

  const [ marker, color ] = move % 2 === 0 ? [ 'X', 'red' ] : [ 'O', 'blue' ]
  
  const row = Math.floor(y / (height / 3));
  const col = Math.floor(x / (width / 3));

  const xPos = col * width / 3 + width / 9;
  const yPos = row * height / 3 - height / 9 + height / 18;

  drawText(marker, xPos, yPos, color, fontSize);

  move++;
});

const board = () => {
  for (let i = 0; i < 2; i++) {
    const x = (i + 1) * width / 3
    drawLine(x, 0, x, height, 'black', 5);
  }
  for (let i = 0; i < 2; i++) {
    const y = (i + 1) * height / 3
    drawLine(0, y, width, y, 'black', 5);
  }

}

board()