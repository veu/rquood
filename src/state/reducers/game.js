import produce from "immer";
import { getSelectedSquares, getSelectionSize } from "../selectors";

const defaultGame = {
  board: null,
  bucket: [],
  score: 0,
  streak: null,
};

export const createGameSlice = (set) => ({
  game: null,
  initGame: (board) =>
    set(
      produce((state) => {
        state.game = { ...defaultGame, board };
      })
    ),
  replaceSquares: (values, bucket) =>
    set(
      produce((state) => {
        const indexes = getSelectedSquares(state);
        const size = getSelectionSize(state);
        const type = state.game.board[indexes[0]];

        for (const index of indexes) {
          state.game.board[index] = values.pop();
        }

        const streakCount =
          state.game.streak && state.game.streak.type === type
            ? state.game.streak.count + 1
            : 1;
        state.game.score = state.game.score + (size | 0) * streakCount;
        state.game.streak = {
          count: streakCount,
          type,
        };
        state.game.bucket = bucket;
      })
    ),
});
