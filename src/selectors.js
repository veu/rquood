import { createSelector } from "reselect";

const getBoard = (state) => state.board;
const getSelection = (state) => state.selection;
const getStreak = (state) => state.streak;

export const getScore = (state) => state.score;
export const getHighscore = (state) => state.highscore;

// game

export const isGameActive = createSelector(
    (state) => !!getBoard(state),
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

const isSelectionHidden = createSelector(
    getSelection,
    (selection) => selection.hidden,
);

export const isBoardLocked = createSelector(
    isSelectionHidden,
    (hidden) => hidden
);
