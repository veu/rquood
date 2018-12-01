import { updateHighscore } from '../../../state/actions';
import highscoreReducers from '../../../state/reducers/highscore';

describe('highscoreReducers', () => {
    it('should initialize with default highscore', () => {
        const action = { type: '@@INIT' };
        const initialHighscore = highscoreReducers(undefined, action);

        expect(initialHighscore).toBe(0);
    });

    describe('on UPDATE_HIGHSCORE', () => {
        it('should replace highscore if score is lower', () => {
            const action = updateHighscore(200);
            const updatedHighscore = highscoreReducers(500, action);

            expect(updatedHighscore).toBe(500);
        });

        it('should keep highscore if score is higher', () => {
            const action = updateHighscore(500);
            const updatedHighscore = highscoreReducers(200, action);

            expect(updatedHighscore).toBe(500);
        });
    });
});
