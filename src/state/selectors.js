import { createSelector } from "reselect";
import { TUTORIAL_URL } from "../config";

const getSelection = (state) => state.selection;
const getStreak = (state) => state.game && state.game.streak;

export const getGame = (state) => state.game;
export const getBoard = (state) => {
    if (state.router.location.pathname === TUTORIAL_URL) {
        return state.tutorial.board[state.tutorial.step];
    }

    return state.game && state.game.board;
}
export const getBucket = (state) => state.game && state.game.bucket;
export const getHeight = (state) => state.game && state.game.height;
export const getScore = (state) => state.game && state.game.score;
export const getWidth = (state) => state.game && state.game.width;
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
    (streak) => streak ? streak.count : 0
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

export const getSquare = (index) => createSelector(
    getBoard,
    getSelectedSquares,
    isSelectionHidden,
    (board, squares, hidden) => {
        const active = squares.includes(index);

        return {
            type: board && board[index],
            active,
            hidden: hidden && active,
            ready: squares.length === 4 && active,
        };
    }
);

// tutorial

export const isTutorial = (state) => state.router.location.pathname === TUTORIAL_URL;

export const getTutorialMessage = (state) => state.tutorial.message[state.tutorial.step];

// options

const getOptions = (state) => state.options;

export const getHues = createSelector(
    getOptions,
    (options) => options.hues
)
