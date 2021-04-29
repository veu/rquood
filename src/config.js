// Dimensions and types exist to have named constants. Changing them requires more work.
export const BOARD_HEIGHT = 7;
export const BOARD_WIDTH = 7;
export const SQUARE_TYPES = 3;

export const TITLE_URL = '/';
export const GAME_URL = '/play';
export const OPTIONS_URL = '/options';
export const TUTORIAL_URL = '/tutorial';
export const ABOUT_URL = '/about';

export const KEY_SOFT_LEFT = 'SoftLeft';
export const KEY_SOFT_RIGHT = 'SoftRight';

const BASE_TUTORIAL = {
  message: [
    `Welcome!
         Find a square with corners of the same color and remove it by connecting two opposite corners.`,
    `Squares have different sizes and orientations. Removing bigger squares yields a higher score.`,
    `Removing multiple squares of the same color in a row  will multiply your score.`,
    `The game won’t tell you when there aren’t any squares left to remove.
         You have to call it quits.
         Enjoy!`
  ],
  step: 0
};

export const LANDSCAPE_TUTORIAL = {
  ...BASE_TUTORIAL,
  width: 4,
  height: 5,
  board: [
    [
      3, 3, 3, 3,
      3, 1, 3, 1,
      3, 3, 3, 3,
      3, 1, 3, 1,
      3, 3, 3, 3,
    ],
    [
      3, 3, 3, 3,
      3, 3, 0, 3,
      0, 3, 3, 3,
      3, 3, 3, 0,
      3, 0, 3, 3,
    ],
    [
      3, 3, 3, 3,
      3, 0, 0, 3,
      3, 0, 0, 3,
      3, 3, 3, 3,
      3, 3, 3, 3,
    ],
    [
      0, 2, 3, 1,
      3, 1, 3, 2,
      2, 3, 2, 3,
      3, 3, 3, 1,
      1, 3, 0, 2,
    ],
  ]
}

export const PORTRAIT_TUTORIAL = {
  ...BASE_TUTORIAL,
  width: 7,
  height: 4,
  board: [
    [
      3, 3, 3, 3, 3, 3, 3,
      3, 3, 1, 3, 1, 3, 3,
      3, 3, 3, 3, 3, 3, 3,
      3, 3, 1, 3, 1, 3, 3,
    ],
    [
      3, 3, 0, 3, 3, 3, 3,
      3, 3, 3, 3, 0, 3, 3,
      3, 0, 3, 3, 3, 3, 3,
      3, 3, 3, 0, 3, 3, 3,
    ],
    [
      3, 3, 3, 3, 3, 3, 3,
      3, 3, 0, 0, 3, 3, 3,
      3, 3, 0, 0, 3, 3, 3,
      3, 3, 3, 3, 3, 3, 3,
    ],
    [
      3, 0, 3, 2, 3, 1, 3,
      3, 2, 1, 3, 3, 3, 0,
      3, 3, 3, 2, 3, 0, 3,
      3, 1, 2, 3, 1, 2, 1,
    ],
  ]
}
