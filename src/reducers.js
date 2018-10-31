import { combineReducers } from 'redux';
import { REPLACE_SQUARES } from './actions';

function board(board = null, action) {
    if (action.type === REPLACE_SQUARES) {
        board = [...board];
        for (const index in action.squares) {
            board[index] = action.squares[index];
        }
    }

    return board;
}

function score(score = null, action) {
    if (action.type === REPLACE_SQUARES) {
        return score + action.size;
    }

    return score;
}

const reducers = combineReducers({
    board,
    score,
});

export default reducers;
