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

const getSelectedSquares = createSelector(
    getSelection,
    (selection) => selection.squares
);

const isSelectionHidden = createSelector(
    getSelection,
    (selection) => selection.hidden,
);

export const isBoardLocked = createSelector(
    isSelectionHidden,
    (hidden) => hidden
);

export const makeGetSquare = (i) => createSelector(
    (_, props) => props.index,
    getBoard,
    getSelectedSquares,
    isSelectionHidden,
    (index, board, squares, hidden) => {
        const active = squares.includes(index);

        return {
            type: board && board[index],
            active,
            inactive: squares.length > 0 && !active,
            hidden: hidden && active,
            ready: squares.length === 4 && active,
        };
    }
);
