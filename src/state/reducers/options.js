import { handleActions } from 'redux-actions';
import { SQUARE_TYPES } from '../../config';

const defaultHues = Array(SQUARE_TYPES).fill(0);

const defaultOptions = {
    hues: defaultHues,
};

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

export default optionsReducers;
