
const boardSize = Math.min(width, height) * 0.75;
const boardLeft = (width - boardSize) / 2;
const boardTop = (height - boardSize) / 2;
const cellSize = boardSize / 3;
const fontSize = boardSize / 3;
const lineEndAdjustment = cellSize * 0.7;

let move = 0;

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const lines = [
  // Rows
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],

  // Cols
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],

  // Diagonals
  [[0, 0], [1, 1], [2, 2]],
  [[2, 0], [1, 1], [0, 2]],
];

const drawBoard = () => {
  const x1 = boardLeft + cellSize;
  const x2 = boardLeft + 2 * cellSize;
  const y1 = boardTop + cellSize;
  const y2 = boardTop + 2 * cellSize;;
  drawLine(x1, boardTop, x1, boardTop + boardSize, 'grey', 2);
  drawLine(x2, boardTop, x2, boardTop + boardSize, 'grey', 2);
  drawLine(boardLeft, y1, boardLeft + boardSize, y1, 'grey', 2);
  drawLine(boardLeft, y2, boardLeft + boardSize, y2, 'grey', 2);
}

const winner = (i, p) => {
  let r = lines[i][p][0]
  let c = lines[i][p][1]
  return board[r][c]
};


const findWinner = () => {
  for (let i = 0; i < lines.length; i++) {
    const m0 = winner(i, 0)
    const m1 = winner(i, 1)
    const m2 = winner(i, 2)
    if (m0 !== '' && m0 === m1 && m0 === m2) {
      return lines[i];
    }
  }
  return null;
}




const threeInARow = (winner) => {

  //let winner = findWinner
  if (winner !== null) {


    const [r1, c1] = winner[0];
    const [r2, c2] = winner[winner.length - 1];

    const x1 = boardLeft + c1 * cellSize + cellSize / 2;
    const y1 = boardTop + r1 * cellSize + cellSize / 2;
    const x2 = boardLeft + c2 * cellSize + cellSize / 2;
    const y2 = boardTop + r2 * cellSize + cellSize / 2;

    let adjX1 = x1;
    let adjX2 = x2;
    let adjY1 = y1;
    let adjY2 = y2;

    if (y1 === y2 || x1 !== x2) {
      adjX1 -= lineEndAdjustment;
      adjX2 += lineEndAdjustment;
    }

    if (x1 === x2 || y1 !== y2) {
      const slope = y1 < y2 ? 1 : -1;
      adjY1 -= (slope * lineEndAdjustment);
      adjY2 += (slope * lineEndAdjustment);
    }
    drawLine(adjX1, adjY1, adjX2, adjY2, 'red', 15);
  }
};


const makeMove = (r, c) => {
  const marker = move % 2 === 0 ? 'X' : 'O';
  const x = boardLeft + c * cellSize + cellSize / 2;
  const y = boardTop + r * cellSize + cellSize / 2;
  const nudge = marker === 'O' ? cellSize / 9 : cellSize / 19;
  drawText(marker, x - (fontSize * 0.3 + nudge), y + fontSize * 0.3, 'black', fontSize);
  board[r][c] = marker;
  move++;
}

registerOnclick((x, y) => {

  let winner = findWinner()

  const r = Math.floor((y - boardTop) / cellSize);
  const c = Math.floor((x - boardLeft) / cellSize);

  // Only do anything if it's a legal move and the game isn't over.
  if (winner === null && 0 <= r && r < 3 && 0 <= c && c < 3 && board[r][c] === '') {

    makeMove(r, c)

    winner = findWinner()
    if (winner !== null) {
      threeInARow(winner)
    }
  }
});

drawBoard();