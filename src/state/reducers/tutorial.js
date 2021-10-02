import produce from "immer";

export const defaultTutorial = {
  board: [
    [
      3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3,
      1, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    ],
    [
      3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3,
      3, 3, 3, 3, 3, 3, 3, 0, 3, 3,
    ],
    [
      3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 0, 0,
      3, 3, 3,

      3, 3, 3, 3, 3, 3, 3,
    ],
    [
      3, 0, 3, 3, 3, 1, 3, 3, 2, 1, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3,
      1, 2, 1, 3, 2, 1, 3, 2, 2, 3,
    ],
  ],
  message: [
    `Welcome!
         Find a square with corners of the same color and remove it by connecting two opposite corners.`,
    `Squares have different sizes and orientations. Removing bigger squares yields a higher score.`,
    `Removing multiple squares of the same color in a row  will multiply your score.`,
    `The game won’t tell you when there aren’t any squares left to remove.
         You have to call it quits.
         Enjoy!`,
  ],
  step: 0,
};

export const createTutorialSlice = (set) => ({
  tutorial: defaultTutorial,
  startTutorial: () =>
    set(
      produce((state) => {
        state.tutorial.step = 0;
      })
    ),
  advanceTutorial: () =>
    set(
      produce((state) => {
        state.tutorial.step += 1;
      })
    ),
});
