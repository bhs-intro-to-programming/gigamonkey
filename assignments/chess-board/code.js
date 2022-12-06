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

const emptyBoard = (size, left, top) => {
  const sq = size/10;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const x = left + i * sq;
      const y = top + j * sq;
      const color = (i + j) % 2 === 0 ? 'white' : 'grey';
      drawFilledRect(x, y, sq, sq, color);
    }
  }
  drawRect(left, top, size, size, 'grey', 1);
};

const boardSize = Math.min(width, height) * 0.80;
emptyBoard(boardSize, (width - boardSize) / 2, (height - boardSize) / 2);