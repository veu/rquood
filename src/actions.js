import { createActions } from 'redux-actions';

export const {
    requestStartGame,
    startGame,
    replaceSquares,
    updateSelection,
    hideSelection,
    updateHighscore,
} = createActions({
    REQUEST_START_GAME: () => ({
    }),
    START_GAME: (board) => ({
        board,
    }),
    REPLACE_SQUARES: (selection, values, bucket) => ({
        selection,
        values,
        bucket,
    }),
    UPDATE_SELECTION: (board, diagonal) => ({
        board,
        diagonal,
    }),
    HIDE_SELECTION: () => ({}),
    UPDATE_HIGHSCORE: (score) => ({
        score
    }),
});
