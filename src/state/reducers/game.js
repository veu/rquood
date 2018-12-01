import { handleActions } from 'redux-actions';

const defaultGame = {
    board: null,
    bucket: [],
    score: 0,
    streak: null,
};

const gameReducers = handleActions({
    START_GAME: (_, {payload: {board}}) => {
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

export default gameReducers;
