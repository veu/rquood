export const REPLACE_SQUARES = 'REPLACE_SQUARES';
export const START_GAME = 'START_GAME';

export const replaceSquares = (squares, size) => ({
    type: REPLACE_SQUARES,
    squares,
    size,
});

export const startGame = (board) => ({
    type: START_GAME,
    board,
});
