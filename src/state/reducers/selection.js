import { isEqual, range, uniq, curry } from 'lodash-es';
import { handleActions } from 'redux-actions';
import { BOARD_SIZE, SQUARE_TYPES } from '../../config';
import { rotate90Around, tween, distance } from '../../vectors';

export const defaultSelection = {
    squares: [],
    size: 0,
    hidden: false,
};

const selectionReducers = handleActions({
    START_GAME: () => {
        return defaultSelection;
    },
    UPDATE_SELECTION: (selection, {payload: {board, start, end}}) => {
        const newSelection = getSelection(board, start, end);

        if (isEqual(newSelection.squares, selection.squares)) {
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
        range(4)
            .map(rotate90Around(tween(start, end, 0.5), start))
            .filter(isValid)
            .filter(isValidType(board))
            .filter(typeEquals(board, getType(board, start)))
            .map(toIndex)
    ),
});

const toIndex = curry(({x, y}) => x + y * BOARD_SIZE);
const isValid = ({x, y}) =>
    0 <= x && x < BOARD_SIZE && x % 1 === 0 &&
    0 <= y && y < BOARD_SIZE && y % 1 === 0;
const getType = (board, v) => board[toIndex(v)];
const typeEquals = curry((board, type, v) => getType(board, v) === type);
const isValidType = curry((board, v) => getType(board, v) < SQUARE_TYPES);
