export const REPLACE_SQUARES = 'REPLACE_SQUARES';

export const replaceSquares = (squares, size) => ({
    type: REPLACE_SQUARES,
    squares,
    size
});
