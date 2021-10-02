import create from "zustand";
import { createHighscoreSlice } from "./reducers/highscore";
import { createTutorialSlice } from "./reducers/tutorial";
import { devtools } from "zustand/middleware";
import { createGameSlice } from "./reducers/game";
import { createOptionsSlice } from "./reducers/options";
import { createSelectionSlice } from "./reducers/selection";
import {
  getBucket,
  isGameActive,
  isSelectionHidden,
  isTutorial,
} from "./selectors";
import delay from "delay";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../config";
import { configurePersist } from "zustand-persist";

function getRandom(bucket, count, min = 0, max = 3, size = 2) {
  return [...Array(count)].reduce(
    ([values, bucket]) => {
      bucket = [...bucket];

      if (bucket.length === 0) {
        bucket = [...Array((max - min) * size)].map((_, index) => {
          return (index % (max - min)) + min;
        });
      }

      const index = (Math.random() * bucket.length) | 0;
      const value = bucket.splice(index, 1)[0];

      return [[...values, value], bucket];
    },
    [[], bucket]
  );
}

const { persist } = configurePersist({
  storage: localStorage,
});

export const useStore = create(
  devtools(
    persist(
      { key: "quood", allowlist: ["game", "highscore", "options"] },
      (set, get) => ({
        ...createHighscoreSlice(set, get),
        ...createTutorialSlice(set, get),
        ...createGameSlice(set, get),
        ...createOptionsSlice(set, get),
        ...createSelectionSlice(set, get),
        match: async () => {
          get().hideSelection();

          await delay(0);

          if (!isSelectionHidden(get())) {
            return;
          }

          await delay(500);

          if (isTutorial(get())) {
            get().advanceTutorial();
          } else {
            const [values, bucket] = getRandom(getBucket(get()), 4);

            get().replaceSquares(values, bucket);

            await delay(0);

            get().updateHighscore();
          }

          get().resetSelection();
        },
        assureGame: () => {
          if (!isGameActive(get())) {
            const [values] = getRandom([], BOARD_HEIGHT * BOARD_WIDTH);

            get().initGame(values);
          }
        },
        startGame: () => {
          const [values] = getRandom([], BOARD_HEIGHT * BOARD_WIDTH);

          get().initGame(values);
        },
      })
    )
  )
);
