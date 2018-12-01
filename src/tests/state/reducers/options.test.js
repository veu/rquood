import { changeHue, resetHues } from '../../../state/actions';
import optionsReducers, { defaultHues, defaultOptions } from '../../../state/reducers/options';

describe('highscoreReducers', () => {
    it('should initialize with default options', () => {
        const action = { type: '@@INIT' };
        const initialOptions = optionsReducers(undefined, action);

        expect(initialOptions).toBe(defaultOptions);
    });

    describe('on CHANGE_HUE', () => {
        it('should set the correct hue', () => {
            const hues = [1, 2, 3];

            for (let i = 0; i < 3; i++) {
                const action = changeHue(i, 4);

                const updatedOptions = optionsReducers({ hues }, action);

                const expectedHues = [...hues];
                expectedHues[i] = 4;

                expect(updatedOptions.hues).toEqual(expectedHues);
            }
        });
    });

    describe('on RESET_HUES', () => {
        it('should reset all hues to default', () => {
            const action = resetHues();
            const updatedOptions = optionsReducers({ hues: [1, 2, 3] }, action);

            expect(updatedOptions.hues).toBe(defaultHues);
        });
    });
});
