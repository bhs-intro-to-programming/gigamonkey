const boardSize = Math.min(width, height);

const leftX = width / 2 - boardSize / 2;
const rightX = width / 2 + boardSize / 2;
const topY = height / 2 - boardSize / 2;
const bottomY = height / 2 + boardSize / 2;

const drawBoard = (borders) => {
  const start = borders ? 0 : 1;
  const end = borders ? 3 : 2;

  for (let i = start; i <= end; i++) {
    const verticalX = leftX + boardSize * (i / 3);
    const horizontalY = topY + boardSize * (i / 3);
    drawLine(verticalX, topY, verticalX, bottomY, 'grey', 2);
    drawLine(leftX, horizontalY, rightX, horizontalY, 'gray', 2);
  }
};

const gameWin = (winner) => {
  if (winner.winType == 'h') {
    const y = topY + boardSize / 6 + boardSize * (winner.winLoc / 3);
    return drawLine(leftX, y, rightX, y, 'grey', 8);

  } else if (winner.winType == 'v') {
    const x = leftX + boardSize / 6 + boardSize * (winner.winLoc / 3);
    return drawLine(x, topY, x, bottomY, 'gray', 8);
  } else if (winner.winType == 'd') {
    return drawLine(
      width / 2 - height / (winner.winLoc == 1 ? -2 : 2),
      topY,
      width / 2 + height / (winner.winLoc == 0 ? 2 : -2),
      bottomY,
      'gray',
      8);
  }
};

const winSearch = (player) => {
  let winner = {};
  for (let c = 0; c <= 2; c++) {
    if ((coordArray[c][0] == player) && (coordArray[c][1] == player) && (coordArray[c][2] == player)) winner = { winner: player, winType: 'h', winLoc: c };
    if ((coordArray[0][c] == player) && (coordArray[1][c] == player) && (coordArray[2][c] == player)) winner = { winner: player, winType: 'v', winLoc: c };
  }
  if ((coordArray[0][0] == player) && (coordArray[1][1] == player) && (coordArray[2][2] == player)) winner = { winner: player, winType: 'd', winLoc: 0 };
  if ((coordArray[2][0] == player) && (coordArray[1][1] == player) && (coordArray[0][2] == player)) winner = { winner: player, winType: 'd', winLoc: 1 };
  gameWin(winner)
  return winner.winner
};

registerOnclick((x, y) => {

  const yPos = Math.floor((y - topY) / (boardSize / 3));
  const xPos = Math.floor((x - leftX) / (boardSize / 3));

  if (xPos < 0 || xPos > 2) {
    drawText(xPos > 2 ? '⇦' : '⇨', x - boardSize / 12, y + boardSize / 12, 'black', boardSize / 3)
  } else {
    if (coordArray[yPos][xPos] == '' && winSearch(player) == undefined) {
      coordArray[yPos][xPos] = player
      drawText(player, leftX - boardSize * 0.1 + boardSize / 6 + (boardSize * xPos / 3), boardSize * 0.1 + boardSize / 6 + boardSize * yPos / 3, 'black', boardSize * 0.3)
      console.log(coordArray, 'recent: ', xPos, yPos, 'winner: ', winSearch(player))
      player = player === player1 ? player2 : player1
      turns++
      if (turns == 9 && winSearch(player) == undefined) drawText('◯', leftX, 8 / 9 * height, 'grey', height);
    }
  }
});

const player1 = 'X' //will go first
const player2 = 'O'

const coordArray = [
  [[''], [''], ['']],
  [[''], [''], ['']],
  [[''], [''], ['']],
];

let turns = 0;
let player = player1;

drawBoard(false);
