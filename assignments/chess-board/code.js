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

const boardSize = Math.min(width, height) * 0.80;
const boardX = (width - boardSize) / 2;
const boardY = (height - boardSize) / 2;

const xy = (rank, file) => [
  boardX + file * boardSize / 8,
  boardY - rank * boardSize / 8
];

const emptyBoard = () => {
  const sq = boardSize / 8;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const [x, y] = xy(i, j);
      const color = (i + j) % 2 === 0 ? 'white' : 'grey';
      drawFilledRect(x, y, sq, sq, color);
    }
  }
  drawRect(boardX, boardY, boardSize, boardSize, 'grey', 1);
};


const drawPiece = (text, rank, file) => {
  const sq = boardSize / 8;
  const [x, y] = xy(rank, file);
  drawText(text, x + sq * 0.2, y + sq * 0.75, 'black', boardSize / 8);
}

emptyBoard(boardSize, boardX, boardY);
drawPiece(WHITE_KING, 0, 0);