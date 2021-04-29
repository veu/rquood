import curry from 'ramda/src/curry';
import equals from 'ramda/src/equals';
import range from 'ramda/src/range';
import uniq from 'ramda/src/uniq';
import { handleActions } from 'redux-actions';
import { SQUARE_TYPES } from '../../config';
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
    UPDATE_SELECTION: (selection, {payload: {board, width, start, end}}) => {
        const newSelection = getSelection(board, width, start, end);

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

const getSelection = (board, width, start, end) => ({
    ...defaultSelection,
    size: distance(start, end),
    squares: uniq(
        range(0, 4)
            .map(rotate90Around(tween(start, end, 0.5), start))
            .filter(isValid(board, width))
            .filter(isValidType(board, width))
            .filter(typeEquals(board, width, getType(board, width, start)))
            .map(toIndex(width))
    ),
});

const toIndex = curry((width, {x, y}) => x + y * width);
const isValid = curry((board, width, {x, y}) =>
    0 <= x && x < width && x % 1 === 0 &&
    0 <= y && y < board.length / width && y % 1 === 0);
const getType = (board, width, v) => board[toIndex(width, v)];
const typeEquals = curry((board, width, type, v) => getType(board, width, v) === type);
const isValidType = curry((board, width, v) => getType(board, width, v) < SQUARE_TYPES);
