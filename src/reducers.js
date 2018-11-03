import { combineReducers } from 'redux';
import { REPLACE_SQUARES, START_GAME } from './actions';

function board(board = null, action) {
    if (action.type === REPLACE_SQUARES) {
        const updatedBoard = [...board];
        for (const {index, value} of action.squares) {
            updatedBoard[index] = value;
        }

        return updatedBoard;
    }

    if (action.type === START_GAME) {
        return action.board;
    }

    return board;
}

function score(score = 0, action) {
    if (action.type === REPLACE_SQUARES) {
        return score + action.size;
    }

    if (action.type === START_GAME) {
        return 0;
    }

    return score;
}

const reducers = combineReducers({
    board,
    score,
});

export default reducers;
