import { handleActions } from 'redux-actions';

export const defaultTutorial = {
    board: [
        [
            3, 3, 3, 3, 3, 3, 3,
            3, 3, 1, 3, 1, 3, 3,
            3, 3, 3, 3, 3, 3, 3,
            3, 3, 1, 3, 1, 3, 3,
        ],
        [
            3, 3, 0, 3, 3, 3, 3,
            3, 3, 3, 3, 0, 3, 3,
            3, 0, 3, 3, 3, 3, 3,
            3, 3, 3, 0, 3, 3, 3,
        ],
        [
            3, 3, 3, 3, 3, 3, 3,
            3, 3, 0, 0, 3, 3, 3,
            3, 3, 0, 0, 3, 3, 3,
            3, 3, 3, 3, 3, 3, 3,
        ],
        [
            3, 0, 3, 2, 3, 1, 3,
            3, 2, 1, 3, 3, 3, 0,
            3, 3, 3, 2, 3, 0, 3,
            3, 1, 2, 3, 1, 2, 1,
        ],
    ],
    message: [
        `Welcome!
         Find a square with corners of the same color and remove it by connecting two opposite corners.`,
        `Squares have different sizes and orientations. Removing bigger squares yields a higher score.`,
        `Removing multiple squares of the same color in a row  will multiply your score.`,
        `The game won’t tell you when there aren’t any squares left to remove.
         You have to call it quits.
         Enjoy!`
    ],
    step: 0
}

const tutorialReducers = handleActions({
    START_TUTORIAL: (tutorial) => {
        return {
            ...tutorial,
            step: 0
        };
    },
    ADVANCE_TUTORIAL: (tutorial) => {
        return {
            ...tutorial,
            step: tutorial.step + 1
        };
    }
}, defaultTutorial);

export default tutorialReducers;
