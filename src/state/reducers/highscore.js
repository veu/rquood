import produce from "immer";
import { getScore } from "../selectors";

export const createHighscoreSlice = (set) => ({
  highscore: 0,
  updateHighscore: () =>
    set(
      produce((state) => {
        state.highscore = Math.max(state.highscore, getScore(state));
      })
    ),
});
