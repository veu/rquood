import { connectRouter } from 'connected-react-router';
import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';
import gameReducers from './reducers/game';
import highscoreReducers from './reducers/highscore';
import optionsReducers, { INPUT_MODE_TOUCH } from './reducers/options';
import selectionReducers, { defaultSelection } from './reducers/selection';
import tutorialReducers, { defaultTutorial } from './reducers/tutorial';

function patchReducer(state) {
    if (!state.selection) {
        state = {
            ...state,
            selection: defaultSelection,
            tutorial: defaultTutorial,
        }
    }

    if (!state.options.inputMode) {
        state.options.inputMode = INPUT_MODE_TOUCH;
    }

    return state;
}

export default (history) => reduceReducers(
    combineReducers({
        router: connectRouter(history),
        game: gameReducers,
        tutorial: tutorialReducers,
        highscore: highscoreReducers,
        selection: selectionReducers,
        options: optionsReducers,
    }),
    patchReducer,
);
