import { createActions, handleActions } from 'redux-actions';
import reduceReducers from 'reduce-reducers';
import { BOARD_SIZE } from './config';

const defaultSelection = {
    squares: [],
    size: 0,
    hidden: false,
};

const defaultState = {
    board: null,
    score: 0,
    highscore: 0,
    streak: null,
    selection: defaultSelection,
};

export const {startGame, replaceSquares, updateSelection, hideSelection} = createActions({
    START_GAME: (board) => ({
        board,
    }),
    REPLACE_SQUARES: (values) => ({
        values,
    }),
    UPDATE_SELECTION: (diagonal) => ({
        diagonal,
    }),
    HIDE_SELECTION: () => ({}),
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
    UPDATE_SELECTION: (state, {payload: {diagonal}}) => {
        const selection = getSelection(state.board, diagonal);

        return {
            ...state,
            selection: selection || defaultSelection,
        };
    },
    HIDE_SELECTION: (state) => {
        return {
            ...state,
            selection: {
                ...state.selection,
                hidden: true,
            }
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

function isCoordinateValid(c) {
    return 0 <= c && c < BOARD_SIZE && c % 1 === 0;
}

function getSelection(board, diagonal) {
    if (diagonal === null) {
        return {squares: [], size: 0};
    }

    const start = diagonal.start.x + diagonal.start.y * BOARD_SIZE;
    const end = diagonal.end.x + diagonal.end.y * BOARD_SIZE;

    if (start === end) {
        return {squares: [start], size: 0};
    }

    const a = {x: start % BOARD_SIZE, y: start / BOARD_SIZE | 0};
    const b = {x: end % BOARD_SIZE, y: end / BOARD_SIZE | 0};
    const center = {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const diff = {x: center.x - a.x, y: center.y - a.y};
    const selection = {squares: [start], size: 2 * Math.hypot(diff.x, diff.y)};

    if (board[start] === board[end]) {
        selection.squares.push(end);
    }

    const c = {x: center.x + diff.y, y: center.y - diff.x};
    const cIndex = c.x + c.y * BOARD_SIZE;

    if (isCoordinateValid(c.x) && isCoordinateValid(c.y) && board[cIndex] === board[start]) {
        selection.squares.push(cIndex);
    }

    const d = {x: center.x - diff.y, y: center.y + diff.x};
    const dIndex = d.x + d.y * BOARD_SIZE;

    if (isCoordinateValid(d.x) && isCoordinateValid(d.y) && board[dIndex] === board[start]) {
        selection.squares.push(dIndex);
    }

    return selection;
}
