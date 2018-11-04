import { createActions, handleActions } from 'redux-actions';

const defaultState = {
    board: null,
    score: 0,
    highscore: 0,
    streak: null,
};

export const {startGame, replaceSquares} = createActions({
    START_GAME: (board) => ({
        board,
    }),
    REPLACE_SQUARES: (squares, size, type) => ({
        squares,
        size,
        type
    }),
});

const reducers = handleActions({
    START_GAME: (state, {payload: {board}}) => {
        return {
            ...state,
            score: 0,
            board,
            streak: null,
        };
    },
    REPLACE_SQUARES: (state, {payload: {squares, size, type}}) => {
        const board = [...state.board];
        for (const {index, value} of squares) {
            board[index] = value;
        }

        const streakCount = state.streak && state.streak.type === type ? state.streak.count + 1 : 1;
        const score = state.score + size * streakCount;
        const streak = {
            count: streakCount,
            type,
        };

        return {
            ...state,
            score,
            highscore: Math.max(state.highscore, score),
            board,
            streak,
        }
    }
}, defaultState);

export default reducers;
