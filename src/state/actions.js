import { createActions } from 'redux-actions';

export const {
    requestAssureGame,
    requestStartGame,
    startGame,
    replaceSquares,
    updateSelection,
    discardSelection,
    hideSelection,
    updateHighscore,
    startTutorial,
    advanceTutorial,
    changeHue,
    resetHues,
} = createActions({
    REQUEST_ASSURE_GAME: () => ({
    }),
    REQUEST_START_GAME: () => ({
    }),
    START_GAME: (board) => ({
        board,
    }),
    REPLACE_SQUARES: (indexes, values, size, bucket) => ({
        indexes,
        values,
        size,
        bucket,
    }),
    UPDATE_SELECTION: (board, start, end) => ({
        board,
        start,
        end,
    }),
    DISCARD_SELECTION: () => ({}),
    HIDE_SELECTION: () => ({}),
    UPDATE_HIGHSCORE: (score) => ({
        score
    }),
    START_TUTORIAL: () => ({
    }),
    ADVANCE_TUTORIAL: () => ({
    }),
    CHANGE_HUE: (index, hue) => ({
        index,
        hue,
    }),
    RESET_HUES: () => ({}),
});
