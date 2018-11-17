import { createActions } from 'redux-actions';

export const {
    requestStartGame,
    startGame,
    replaceSquares,
    updateSelection,
    hideSelection,
} = createActions({
    REQUEST_START_GAME: () => ({
    }),
    START_GAME: (board) => ({
        board,
    }),
    REPLACE_SQUARES: (values, bucket) => ({
        values,
        bucket,
    }),
    UPDATE_SELECTION: (diagonal) => ({
        diagonal,
    }),
    HIDE_SELECTION: () => ({}),
});
