// This is a working tic tac toe game. However it is horribly factored
// insofar as there are zero functions defined in this code. Consequently
// there are many instances of duplicated code and thus many opportunities to
// break out useful functions. You should do to this what you did to the
// pie recipes but this time in code.

// A tip: make small changes and keep the thing working. If you break it
// and can't very quickly put it aright, use the Revisions menu to go back
// to the working version and try again. The goal of refactoring is to change
// the structure of the code without changing it's behavior.

// Another tip: sometimes it's easier to identify some duplicate code than
// it is to figure out exactly what it does. It's fine to break it out
// into a function with a not-great name. Later on, you may well figure out
// how it fits together and when you do you can use the Rename symbol feature
// of the editor (on the right-click menu) to change the name of the function
// to something more meaningful.

// Also remember that it can be useful to break out a big chunk of code
// just to give it a name. One clue that that might be a good idea is when
// there's a big chunk of code with a comment explaining what it does.
// Suprisingly often you can just turn the comment into a function name
// and move the chunk of code into the function and replace it with a call
// to the fuction. (Which makse sense because the original author had mentally
// chunked it already and the comment is telling you what it does.)

const boardSize = Math.min(width, height) * 0.75;
const boardLeft = (width - boardSize) / 2;
const boardTop = (height - boardSize) / 2;
const cellSize = boardSize / 3;
const fontSize = boardSize / 3;
const lineEndAdjustment = cellSize * 0.7;

const drawBoard = (x1, x2, y1, y2, boardTop, boardLeft) => {
  drawLine(x1, boardTop, x1, boardTop + boardSize, 'grey', 2);
  drawLine(x2, boardTop, x2, boardTop + boardSize, 'grey', 2);
  drawLine(boardLeft, y1, boardLeft + boardSize, y1, 'grey', 2);
  drawLine(boardLeft, y2, boardLeft + boardSize, y2, 'grey', 2);
}

const underThree = (x) => {
  return 0 <= x && x < 3
}

let move = 0;

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const checkWinner = (r, c, lines, board) => {
  for (let i = 0; i < lines.length; i++) {
    r = lines[i][0][0];
    c = lines[i][0][1];
    const m0 = board[r][c];
    r = lines[i][1][0];
    c = lines[i][1][1];
    const m1 = board[r][c];
    r = lines[i][2][0];
    c = lines[i][2][1];
    const m2 = board[r][c];
    if (m0 !== '' && m0 === m1 && m0 === m2) {
      return lines[i]
    }
  }
}

const adjust = (firsts, seconds, adjustment, adjustees) => {
  if (firsts[0] === firsts[1] || seconds[0] !== seconds[1]) {
    const slope = y1 < y2 ? 1 : -1;
    adjustees[0] -= (slope * adjustment);
    adjustees[1] += (slope * adjustment);
  }
}

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

// Draw the board
const x1 = boardLeft + cellSize;
const x2 = boardLeft + 2 * cellSize;
const y1 = boardTop + cellSize;
const y2 = boardTop + 2 * cellSize;;
drawBoard(x1, x2, y1, y2, boardTop, boardLeft)

registerOnclick((x, y) => {

  let winner = null;
  let r;
  let c;

  // Check if there's a winner already.
  if (checkWinner(r, c, lines, board)) {
    winner = checkWinner(r, c, lines, board);
  }

  r = Math.floor((y - boardTop) / cellSize);
  c = Math.floor((x - boardLeft) / cellSize);

  // Only do anything if it's a legal move and the game isn't over.
  if (winner === null && underThree(r) && underThree(c) && board[r][c] === '') {

    // Draw the mark and record the move
    const marker = move % 2 === 0 ? 'X' : 'O';
    const x = boardLeft + c * cellSize + cellSize / 2;
    const y = boardTop + r * cellSize + cellSize / 2;
    const nudge = marker === 'O' ? cellSize / 9 : cellSize / 19;
    drawText(marker, x - (fontSize * 0.3 + nudge), y + fontSize * 0.3, 'black', fontSize);
    board[r][c] = marker;
    move++;

    // Check if there's a winner now
    winner = null;
    if (checkWinner(r, c, lines, board)) {
      winner = checkWinner(r, c, lines, board);
    }
    if (winner !== null) {
      // Draw the line through three in a row
      const [r1, c1] = winner[0];
      const [r2, c2] = winner[winner.length - 1];

      const location = (boardLocation, cr12) => {
        let xOrY = boardLocation + cr12 * cellSize + cellSize / 2
        return xOrY
      }

      let adjX1 = location(boardLeft, c1);
      let adjX2 = location(boardLeft, c2);
      let adjY1 = location(boardTop, r1);
      let adjY2 = location(boardTop, r2);

      adjust([y1, y2], [x1, x2], lineEndAdjustment, [adjX1, adjX2])


      adjust([x1, x2], [y1, y2], lineEndAdjustment, [adjY1, adjY2])

      drawLine(adjX1, adjY1, adjX2, adjY2, 'red', 15);
    }
  }
});