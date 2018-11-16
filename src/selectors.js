import { createSelector } from "reselect";

const getBoard = (state) => state.board;
const getStreak = (state) => state.streak;

export const getScore = (state) => state.score;
export const getHighscore = (state) => state.highscore;

export const isGameActive = createSelector(
    (state) => !!getBoard(state),
    (active) => active
);

export const getStreakType = createSelector(
    getStreak,
    (streak) => streak && streak.type
);

export const getStreakCount = createSelector(
    getStreak,
    (streak) => streak && streak.count
);
