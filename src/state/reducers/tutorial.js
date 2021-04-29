import { handleActions } from 'redux-actions';
import { LANDSCAPE_TUTORIAL, PORTRAIT_TUTORIAL } from "../../config";

const tutorialReducers = handleActions({
    START_TUTORIAL: (tutorial, { payload: { isPortrait }}) => {
        const newTutorial = isPortrait ? PORTRAIT_TUTORIAL : LANDSCAPE_TUTORIAL;
        return {
            ...newTutorial,
            step: 0
        };
    },
    ADVANCE_TUTORIAL: (tutorial) => {
        return {
            ...tutorial,
            step: tutorial.step + 1
        };
    }
}, null);

export default tutorialReducers;
