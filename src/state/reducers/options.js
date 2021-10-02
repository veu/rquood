import { SQUARE_TYPES } from "../../config";
import produce from "immer";

export const INPUT_MODE_TOUCH = "TOUCH";
export const INPUT_MODE_CLICK = "CLICK";

export const defaultHues = Array(SQUARE_TYPES).fill(0);

export const defaultOptions = {
  hues: defaultHues,
  inputMode: INPUT_MODE_TOUCH,
};

export const createOptionsSlice = (set) => ({
  options: defaultOptions,
  changeHue: (index, hue) =>
    set(
      produce((state) => {
        const hues = [...state.options.hues];
        hues[index] = hue;

        state.options.hues = hues;
      })
    ),
  resetHues: () =>
    set(
      produce((state) => {
        state.options.hues = defaultHues;
      })
    ),
  changeInputMode: () =>
    set(
      produce((state) => {
        state.options.inputMode =
          state.options.inputMode === INPUT_MODE_CLICK
            ? INPUT_MODE_TOUCH
            : INPUT_MODE_CLICK;
      })
    ),
});
