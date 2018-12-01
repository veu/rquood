import { handleActions } from 'redux-actions';
import reduceReducers from 'reduce-reducers';
import { BOARD_SIZE, SQUARE_TYPES } from '../config';
import { isEqual, range, uniq, curry } from 'lodash-es';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { rotate90Around, tween, distance } from '../vectors';

const defaultSelection = {
    squares: [],
    size: 0,
    hidden: false,
};

const defaultGame = {
    board: null,
    bucket: [],
    score: 0,
    streak: null,
};

const defaultHues = Array(SQUARE_TYPES).fill(0);

const defaultOptions = {
    hues: defaultHues,
}

const defaultTutorial = {
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

const highscoreReducers = handleActions({
    UPDATE_HIGHSCORE: (highscore, {payload: {score}}) => {
        return Math.max(highscore, score);
    }
 }, 0);

 const optionsReducers = handleActions({
     CHANGE_HUE: (options, {payload: {index, hue}}) => {
         const hues = [...options.hues];
         hues[index] = hue;

         return {
             ...options,
             hues
         };
     },
     RESET_HUES: (options) => {
         return {
             ...options,
             hues: defaultHues,
         };
     }
  }, defaultOptions);

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

const gameReducers = handleActions({
    START_GAME: (game, {payload: {board}}) => {
        return {
            ...defaultGame,
            board,
        };
    },
    REPLACE_SQUARES: (game, {payload: {indexes, values, size, bucket}}) => {
        const board = [...game.board];
        const type = board[indexes[0]];

        for (const index of indexes) {
            board[index] = values.pop();
        }

        const streakCount = game.streak && game.streak.type === type ? game.streak.count + 1 : 1;
        const score = game.score + (size | 0) * streakCount;
        const streak = {
            count: streakCount,
            type,
        };

        return {
            board,
            bucket,
            score,
            streak,
        }
    }
}, null);

const tutorialReducers = handleActions({
    ADVANCE_TUTORIAL: (tutorial) => {
        return {
            ...tutorial,
            step: tutorial.step + 1
        };
    }
}, defaultTutorial);

function patchReducer(state) {
    if (!state.selection) {
        state = {
            ...state,
            selection: defaultSelection,
            tutorial: defaultTutorial,
        }
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
