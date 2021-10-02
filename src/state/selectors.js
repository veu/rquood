import { createSelector } from "reselect";

const getSelection = (state) => state.selection;
const getStreak = (state) => state.game && state.game.streak;

export const getGame = (state) => state.game;
export const getBoard = (state) => {
    return state.game && state.game.board;
}
export const getBucket = (state) => state.game && state.game.bucket;
export const getScore = (state) => state.game && state.game.score;
export const getHighscore = (state) => state.highscore;

// game

export const isGameActive = createSelector(
    (state) => !!getGame(state),
    (active) => active
);

// stats

export const getStreakType = createSelector(
    getStreak,
    (streak) => streak && streak.type
);

export const getStreakCount = createSelector(
    getStreak,
    (streak) => streak && streak.count
);

// board

export const getSelectedSquares = createSelector(
    getSelection,
    (selection) => selection.squares
);

export const getSelectionSize = createSelector(
    getSelection,
    (selection) => selection.size
);

export const isSelectionHidden = createSelector(
    getSelection,
    (selection) => selection.hidden,
);

export const isBoardLocked = createSelector(
    isSelectionHidden,
    (hidden) => hidden
);

export const getSquare = (isTutorial, index) => createSelector(
    getBoard,
    getTutorialBoard,
    getSelectedSquares,
    isSelectionHidden,
    (gameBoard, tutorialBoard, squares, hidden) => {
        const active = squares.includes(index);
        const board = isTutorial ? tutorialBoard : gameBoard;

        return {
            type: board && board[index],
            active,
            inactive: squares.length > 0 && !active,
            hidden: hidden && active,
            ready: squares.length === 4 && active,
        };
    }
);

// tutorial

export const getTutorialMessage = (state) => state.tutorial.message[state.tutorial.step];

export const getTutorialBoard = (state) => state.tutorial.board[state.tutorial.step]

// options

const getOptions = (state) => state.options;

export const getInputMode = createSelector(
    getOptions,
    (options) => options.inputMode
)

export const getHues = createSelector(
    getOptions,
    (options) => options.hues
)
