export const INCREASE_SCORE = 'INCREASE_SCORE';

export const increaseScore = (delta) => ({
    type: INCREASE_SCORE,
    delta,
});
