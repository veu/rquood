import { handleActions } from 'redux-actions';
import { SQUARE_TYPES } from '../../config';

export const INPUT_MODE_TOUCH = 'TOUCH';
export const INPUT_MODE_CLICK = 'CLICK';

export const defaultHues = Array(SQUARE_TYPES).fill(0);

export const defaultOptions = {
    hues: defaultHues,
    inputMode: INPUT_MODE_TOUCH
};

const optionsReducers = handleActions({
    CHANGE_HUE: (options, { payload: { index, hue } }) => {
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
    },
    CHANGE_INPUT_MODE: (options) => {
        return {
            ...options,
            inputMode:
                options.inputMode === INPUT_MODE_CLICK
                    ? INPUT_MODE_TOUCH
                    : INPUT_MODE_CLICK
        }
    }
}, defaultOptions);

export default optionsReducers;
