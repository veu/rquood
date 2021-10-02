import curry from 'ramda/src/curry';
import equals from 'ramda/src/equals';
import range from 'ramda/src/range';
import uniq from 'ramda/src/uniq';
import { SQUARE_TYPES, BOARD_WIDTH } from '../../config';
import { distance, rotate90Around, tween } from '../../vectors';
import produce from "immer";
import {getBoard} from "../selectors";

export const defaultSelection = {
    squares: [],
    size: 0,
    hidden: false,
};

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

export const createSelectionSlice = set => ({
    selection: defaultSelection,
    resetSelection: () => set(produce(state => {
       state.selection = defaultSelection;
    })),
    updateSelection: (start, end) => set(produce((state) => {
        const newSelection = getSelection(getBoard(state), start, end);

        if (!equals(newSelection.squares, state.selection.squares)) {
            state.selection = newSelection;
        }
    })),
    hideSelection: () => set(produce(state => {
        if (state.selection.squares.length < 4) {
            state.selection = defaultSelection;
        } else {
            state.selection.hidden = true;
        }
    }))
})
