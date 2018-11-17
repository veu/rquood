import { handleActions } from 'redux-actions';
import reduceReducers from 'reduce-reducers';
import { BOARD_SIZE } from './config';
import { isEqual } from 'lodash-es';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const defaultSelection = {
    squares: [],
    size: 0,
    hidden: false,
};

const defaultGame = {
    board: null,
    bucket: [],
    score: 0,
    streak: null,
};

const highscoreReducers = handleActions({
    UPDATE_HIGHSCORE: (highscore, {payload: {score}}) => {
        return Math.max(highscore, score);
    }
 }, 0);

const selectionReducers = handleActions({
    START_GAME: () => {
        return defaultSelection;
    },
    UPDATE_SELECTION: (selection, {payload: {board, diagonal}}) => {
        const newSelection = getSelection(board, diagonal);

        if (isEqual(newSelection.squares, selection.squares)) {
            return selection;
        }

        return newSelection;
    },
    HIDE_SELECTION: (selection) => {
        if (selection.squares.length < 4) {
            return defaultSelection;
        }

        return {
            ...selection,
            hidden: true,
        };
    },
    REPLACE_SQUARES: () => {
        return defaultSelection;
    },
}, defaultSelection);

const gameReducers = handleActions({
    START_GAME: (game, {payload: {board}}) => {
        return {
            ...defaultGame,
            board,
        };
    },
    REPLACE_SQUARES: (game, {payload: {indexes, values, size, bucket}}) => {
        const board = [...game.board];
        const type = board[indexes[0]];

        for (const index of indexes) {
            board[index] = values.pop();
        }

        const streakCount = game.streak && game.streak.type === type ? game.streak.count + 1 : 1;
        const score = game.score + (size | 0) * streakCount;
        const streak = {
            count: streakCount,
            type,
        };

        return {
            board,
            bucket,
            score,
            streak,
        }
    }
}, null);

function patchReducer(state) {
    if (!state.selection) {
        state = {
            ...state,
            selection: defaultSelection
        }
    }

    return state;
}

export default (history) => reduceReducers(
    combineReducers({
        router: connectRouter(history),
        game: gameReducers,
        highscore: highscoreReducers,
        selection: selectionReducers,
    }),
    patchReducer,
);

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
    const selection = {
        ...defaultSelection,
        squares: [start],
        size: 2 * Math.hypot(diff.x, diff.y),
    };

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
