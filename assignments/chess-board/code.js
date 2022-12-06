const PIECES = {
  black: {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟',
  },
  white: {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙',
  }
};


const boardSize = Math.min(width, height) * 0.80;
const boardX = (width - boardSize) / 2;
const boardY = (height - boardSize) / 2;

const xy = (row, col) => [
  boardX + col * boardSize / 8,
  boardY + row * boardSize / 8
];

// GUI

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

const drawPiece = (piece, rank, file) => {
  const text = PIECES[piece.color][piece.type];
  const sq = boardSize / 8;
  const [x, y] = xy(rank, file);
  drawText(text, x + sq * 0.2, y + sq * 0.75, 'black', boardSize / 8);
};

const drawBoard = (board) => {
  emptyBoard();
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece !== null) {
        drawPiece(piece.text, row, col);
      }
    }
  }
}

// STATE MANIPULATION

const placePiece = (board, piece, row, col) => {
  board[row][col] = piece;
};

const piece = (color, type, text) => {
  return { color, type, text };
}




// Actual runtime

const board = Array(8).fill().map(() => Array(8).fill(null));


placePiece(board, piece('white', 'king', ''), 7, 4);
placePiece(board, piece('white', 'queen', ''), 7, 3);

drawBoard(board);
//drawPiece(WHITE_KING, 7, 4);
//drawPiece(WHITE_QUEEN, 7, 3);