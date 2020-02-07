import curry from 'ramda/src/curry';
import equals from 'ramda/src/equals';
import range from 'ramda/src/range';
import uniq from 'ramda/src/uniq';
import { handleActions } from 'redux-actions';
import { SQUARE_TYPES, BOARD_WIDTH } from '../../config';
import { distance, rotate90Around, tween } from '../../vectors';

export const defaultSelection = {
    squares: [],
    size: 0,
    hidden: false,
};

export const selectionReducers = handleActions({
    START_GAME: () => {
        return defaultSelection;
    },
    UPDATE_SELECTION: (selection, {payload: {board, start, end}}) => {
        const newSelection = getSelection(board, start, end);

        if (equals(newSelection.squares, selection.squares)) {
            return selection;
        }

        return newSelection;
    },
    DISCARD_SELECTION: () => {
        return defaultSelection;
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
    ADVANCE_TUTORIAL: () => {
        return defaultSelection;
    }
}, defaultSelection);

export default selectionReducers;

const getSelection = (board, start, end) => ({
    ...defaultSelection,
    size: distance(start, end),
    squares: uniq(
        range(0, 4)
            .map(rotate90Around(tween(start, end, 0.5), start))
            .filter(isValid(board))
            .filter(isValidType(board))
            .filter(typeEquals(board, getType(board, start)))
            .map(toIndex)
    ),
});

const toIndex = curry(({x, y}) => x + y * BOARD_WIDTH);
const isValid = curry((board, {x, y}) =>
    0 <= x && x < BOARD_WIDTH && x % 1 === 0 &&
    0 <= y && y < board.length / BOARD_WIDTH && y % 1 === 0);
const getType = (board, v) => board[toIndex(v)];
const typeEquals = curry((board, type, v) => getType(board, v) === type);
const isValidType = curry((board, v) => getType(board, v) < SQUARE_TYPES);
