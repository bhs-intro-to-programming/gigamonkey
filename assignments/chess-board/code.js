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

const emptyBoard = (size, x, y) => {
  const sq = size/8;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      drawFilledRect(x + i * sq, y + j * sq, sq, sq, (i + j) % 2 === 0 ? 'grey' : 'white');
    }
  }
}

emptyBoard(Math.min(width, height), 0, 0);