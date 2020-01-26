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
    advanceTutorial,
    changeInputMode,
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
    ADVANCE_TUTORIAL: () => ({
    }),
    CHANGE_INPUT_MODE: () => ({
    }),
    CHANGE_HUE: (index, hue) => ({
        index,
        hue,
    }),
    RESET_HUES: () => ({}),
});
