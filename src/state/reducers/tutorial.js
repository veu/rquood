import { handleActions } from 'redux-actions';

export const defaultTutorial = {
    board: [
        [
            3,3,3,3,3,3,3,
            3,3,3,3,3,3,3,
            3,3,1,3,1,3,3,
            3,3,3,3,3,3,3,
            3,3,1,3,1,3,3,
            3,3,3,3,3,3,3,
            3,3,3,3,3,3,3,
        ],
        [
            3,3,0,3,3,3,3,
            3,3,3,3,3,3,3,
            3,3,3,3,3,3,0,
            3,3,3,3,3,3,3,
            0,3,3,3,3,3,3,
            3,3,3,3,3,3,3,
            3,3,3,3,0,3,3,
        ],
        [
            3,3,3,3,3,3,3,
            3,3,3,3,3,3,3,
            3,0,0,3,3,3,3,
            3,0,0,3,3,3,3,
            3,3,3,3,3,3,3,
            3,3,3,3,3,3,3,
            3,3,3,3,3,3,3,
        ],
        [
            3,0,3,3,1,3,3,
            3,2,1,3,3,0,3,
            3,3,3,3,0,3,3,
            3,3,3,1,2,1,0,
            3,2,3,2,2,3,3,
            3,0,3,1,3,0,3,
            3,3,3,3,3,3,3,
        ],
    ],
    message: [
        `Hi there. Find a square with corners of the same color
         and remove it by connecting two opposite corners.`,
        `Squares have different sizes and orientations.
         Remove bigger squares to yield a higher score.`,
        `Removing multiple squares of the same color in a row
         will multiply your score.`,
        `The game does not stop if there are no more squares
         to remove. It’s up to you to call it quits.`
    ],
    step: 0
}

const tutorialReducers = handleActions({
    ADVANCE_TUTORIAL: (tutorial) => {
        return {
            ...tutorial,
            step: tutorial.step + 1
        };
    }
}, defaultTutorial);

export default tutorialReducers;
