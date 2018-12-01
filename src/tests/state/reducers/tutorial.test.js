import { advanceTutorial } from '../../../state/actions';
import tutorialReducers, { defaultTutorial } from '../../../state/reducers/tutorial';

describe('tutorialReducers', () => {
    it('should initialize with default tutorial', () => {
        const action = { type: '@@INIT' };
        const initialTutorial = tutorialReducers(undefined, action);

        expect(initialTutorial).toBe(defaultTutorial);
    });

    describe('on ADVANCE_TUTORIAL', () => {
        it('should increment step', () => {
            const action = advanceTutorial();
            const tutorial = {
                ...defaultTutorial,
                step: 5
            };

            const updatedTutorial = tutorialReducers(tutorial, action);

            expect(updatedTutorial.step).toEqual(tutorial.step + 1);
        });
    });
});
