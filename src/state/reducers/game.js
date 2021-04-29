import { handleActions } from 'redux-actions';
import { BOARD_HEIGHT, BOARD_WIDTH, LANDSCAPE_TUTORIAL, PORTRAIT_TUTORIAL } from "../../config";

const defaultGame = {
    board: null,
    bucket: [],
    height: BOARD_HEIGHT,
    score: 0,
    streak: null,
    width: BOARD_WIDTH
};

const gameReducers = handleActions({
    START_GAME: (_, {payload: { board, width, height }}) => {
        return {
            ...defaultGame,
            board,
            width,
            height,
        };
    },
    SET_SIZE: (game, {payload: { width, height }}) => {
        return {
            ...game,
            width,
            height,
        };
    },
    START_TUTORIAL: (game, { payload: { isPortrait } }) => {
        const newTutorial = isPortrait ? PORTRAIT_TUTORIAL : LANDSCAPE_TUTORIAL;
        return {
            ...game,
            height: newTutorial.height,
            width: newTutorial.width,
        }
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
            ...game,
            board,
            bucket,
            score,
            streak,
        }
    }
}, null);

export default gameReducers;
