import { handleActions } from 'redux-actions';

const highscoreReducers = handleActions({
    UPDATE_HIGHSCORE: (highscore, {payload: {score}}) => {
        return Math.max(highscore, score);
    }
 }, 0);

 export default highscoreReducers;
