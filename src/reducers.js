import { createActions, handleActions } from 'redux-actions';
import reduceReducers from 'reduce-reducers';

const defaultSelection = {
    squares: [],
    size: 0
};

const defaultState = {
    board: null,
    score: 0,
    highscore: 0,
    streak: null,
    selection: defaultSelection,
};

export const {startGame, replaceSquares, updateSelection} = createActions({
    START_GAME: (board) => ({
        board,
    }),
    REPLACE_SQUARES: (values) => ({
        values,
    }),
    UPDATE_SELECTION: (indexes) => ({
        indexes,
    }),
});

const actionReducers = handleActions({
    START_GAME: (state, {payload: {board}}) => {
        return {
            ...state,
            score: 0,
            board,
            streak: null,
            selection: defaultSelection,
        };
    },
    REPLACE_SQUARES: (state, {payload: {values}}) => {
        const board = [...state.board];
        const type = board[state.selection.squares[0]];

        for (const index of state.selection.squares) {
            board[index] = values.pop();
        }

        const streakCount = state.streak && state.streak.type === type ? state.streak.count + 1 : 1;
        const score = state.score + (state.selection.size | 0) * streakCount;
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
            selection: defaultSelection,
        }
    },
    UPDATE_SELECTION: (state, {payload: {indexes}}) => {
        return {
            ...state,
            selection: indexes || defaultSelection,
        };
    },
}, defaultState);

function patchReducer(state) {
    if (state.selection === undefined) {
        return {...state, selection: defaultSelection};
    }

    return state;
}

export default reduceReducers(actionReducers, patchReducer);
