import { createActions } from 'redux-actions';

export const {
    requestAssureGame,
    requestStartGame,
    startGame,
    setSize,
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
    START_GAME: (board, width, height) => ({
        board,
        width,
        height,
    }),
    SET_SIZE: (width, height) => ({
        width,
        height,
    }),
    REPLACE_SQUARES: (indexes, values, size, bucket) => ({
        indexes,
        values,
        size,
        bucket,
    }),
    UPDATE_SELECTION: (board, width, start, end) => ({
        board,
        width,
        start,
        end,
    }),
    DISCARD_SELECTION: () => ({}),
    HIDE_SELECTION: () => ({}),
    UPDATE_HIGHSCORE: (score) => ({
        score
    }),
    START_TUTORIAL: (isPortrait) => ({
        isPortrait
    }),
    ADVANCE_TUTORIAL: () => ({
    }),
    CHANGE_HUE: (index, hue) => ({
        index,
        hue,
    }),
    RESET_HUES: () => ({}),
});
