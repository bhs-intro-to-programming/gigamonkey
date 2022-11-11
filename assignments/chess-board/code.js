const WHITE_KING = '♔';
const WHITE_QUEEN = '♕';
const WHITE_ROOK = '♖';
const WHITE_BISHOP = '♗';
const WHITE_KNIGHT = '♘';
const WHITE_PAWN = '♙';
const BLACK_KING = '♚';
const BLACK_QUEEN = '♛';
const BLACK_ROOK = '♜';
const BLACK_BISHOP = '♝';
const BLACK_KNIGHT = '♞';
const BLACK_PAWN = '♟';

// Example of drawing one of the pieces
//drawText(WHITE_KING, width/2, height/2, 'black', 64);

const drawBoard = () => {
  for (let i = 0; i < 8; i++) {
    drawLine(width / 8 * i, 0, width / 8 * i, height, 'black', 2)
  }
  for (let j = 0; j < 8; j++) {
    drawLine(0, height / 8 * j, width, height / 8 * j, 'black', 2)
  }
}
drawBoard()

let board =
  [[WHITE_ROOK, WHITE_KNIGHT, WHITE_BISHOP, WHITE_KING, WHITE_QUEEN, WHITE_BISHOP, WHITE_KNIGHT, WHITE_ROOK],
  [WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  [BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN],
  [BLACK_ROOK, BLACK_KNIGHT, BLACK_BISHOP, BLACK_KING, BLACK_QUEEN, BLACK_BISHOP, BLACK_KNIGHT, BLACK_ROOK]]
//let player = 'w'

const row = (y) => Math.floor(y / (height / 8))
const column = (x) => Math.floor(x / (width / 8))

const select = (x, y) => {
  console.log(`here row: ${row(y)}; col: ${col(x)}`);
  drawText(board[row(y)][column(x)], width / 8 * column(x), height / 8 * (row(y) + 1), 'red', 45)
}

registerOnclick(select);

const drawArray = () => {
  for (let j = 0; j < board.length; j++)
    for (let i = 0; i < 8; i++) {
      if (board[j][i] !== '') {
        drawText(board[j][i], width / 8 * (i), height / 8 * (j + 1), 'black', 40);
      }
    }
}
drawArray()
