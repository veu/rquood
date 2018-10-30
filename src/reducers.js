import { combineReducers } from 'redux';
import { INCREASE_SCORE } from './actions';

function score(score = 0, action) {
    if (action.type === INCREASE_SCORE) {
        return score + action.delta;
    }

    return score;
}

const reducers = combineReducers({
    score,
});

export default reducers;
