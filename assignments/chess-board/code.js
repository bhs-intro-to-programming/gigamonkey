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
drawLine(215, 0, 215, height)
drawLine(457, 0, 457, height)
drawLine(215, 0, 457, 0)
drawLine(215, height, 457, height)
const drawBoard = () => {
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 4; i++) {
      drawFilledRect(215 + 30.25 * i * 2, 0 + 30.25 * j * 2, 242 / 8, height / 8)
    }
  }

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 4; i++) {
      drawFilledRect(245.25 + 30.25 * i * 2, 30.25 + 30.25 * j * 2, 242 / 8, height / 8)
    }
  }
}
drawBoard()

const board = () => {
  ['', '', '', '', '', '', '', '',
   '', '', '', '', '', '', '', '',
   '', '', '', '', '', '', '', '',
   '', '', '', '', '', '', '', '',
   '', '', '', '', '', '', '', '',
   '', '', '', '', '', '', '', '',
   '', '', '', '', '', '', '', '',
   '', '', '', '', '', '', '', '',]
}
