// for me:  *  drawLine(x1, y1, x2, y2, color, lineWidth)
const max = Math.max(width, height)
const min = Math.min(width, height)

const drawBoard = (borders) => {
  const extra = borders ? 1 : 0;
  for (let editVar = 1 - borders; editVar <= 2 + extra; editVar += 1) {
    drawLine(max / 2 - min / 2 + min * (editVar / 3), height, max / 2 - min / 2 + min * (editVar / 3), 0, 'grey', 2)
    drawLine(max / 2 - min / 2, height * (editVar / 3), max / 2 + min / 2, height * (editVar / 3), 'gray', 2)
  }
}

drawBoard(false) //set 1 for borders and 0 for no borders

const coordArray = [
  [[''], [''], ['']],
  [[''], [''], ['']],
  [[''], [''], ['']],
]

const player1 = 'X' //will go first
const player2 = 'O'

const gameWin = (winner) => {
  if (winner.winType == 'h') {
    return drawLine(width / 2 - height / 2, height / 6 + height * (winner.winLoc / 3), width / 2 + height / 2, height / 6 + height * (winner.winLoc / 3), 'grey', 8)
  } else if (winner.winType == 'v') {
    return drawLine(width / 2 - height / 3 + height * (winner.winLoc / 3), height, width / 2 - height / 3 + height * (winner.winLoc / 3), 0, 'gray', 8)
  } else if (winner.winType == 'd') {
    return drawLine(width / 2 - height / (winner.winLoc == 1 ? -2 : 2), 0, width / 2 + height / (winner.winLoc == 0 ? 2 : -2), height, 'gray', 8)
  }
}

let winner = {}

const winSearch = (player) => {
  for (let c = 0; c <= 2; c++) {
    if ((coordArray[c][0] == player) && (coordArray[c][1] == player) && (coordArray[c][2] == player)) winner = { winner: player, winType: 'h', winLoc: c };
    if ((coordArray[0][c] == player) && (coordArray[1][c] == player) && (coordArray[2][c] == player)) winner = { winner: player, winType: 'v', winLoc: c };
  }
  if ((coordArray[0][0] == player) && (coordArray[1][1] == player) && (coordArray[2][2] == player)) winner = { winner: player, winType: 'd', winLoc: 0 };
  if ((coordArray[2][0] == player) && (coordArray[1][1] == player) && (coordArray[0][2] == player)) winner = { winner: player, winType: 'd', winLoc: 1 };
  gameWin(winner)
  return winner.winner
}

let turns = 0;
let player = player1;

registerOnclick((x, y) => {
  let xPos;
  let yPos;
  if (y < 1 / 3 * height) {
    yPos = 0
  } else if (y < 2 / 3 * height) {
    yPos = 1
  } else if (y < height) {
    yPos = 2
  }
  if (x < max / 2 - min / 2 || x > max / 2 + min / 2) {
    drawText(x > max / 2 - min / 2 ? '⇦' : '⇨', x - height / 12, y + height / 12, 'black', height / 3)
  } else {
    if (x < max / 2 - min / 6) {
      xPos = 0
    } else if (x < max / 2 + min / 6) {
      xPos = 1
    } else if (x < max / 2 + min / 2) {
      xPos = 2
    }
    if (coordArray[yPos][xPos] == '' && winSearch(player) == undefined) {
      coordArray[yPos][xPos] = player
      drawText(player, max / 2 - min / 2 - min * 0.1 + min / 6 + (min * xPos / 3), min * 0.1 + min / 6 + min * yPos / 3, 'black', min * 0.3)
      console.log(coordArray, 'recent: ', xPos, yPos, 'winner: ', winSearch(player))
      player = player === player1 ? player2 : player1
      turns++
      if (turns == 9 && winSearch(player) == undefined) drawText('◯', max / 2 - min / 2, 8 / 9 * height, 'grey', height);
    }
  }
});

