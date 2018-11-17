import delay from 'delay';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { replaceSquares, startGame, updateHighscore } from './actions';
import { BOARD_SIZE } from './config';
import { isSelectionHidden, getBucket, getScore, getSelectionSize, getSelectedSquares, isGameActive } from './selectors';

function getRandom(bucket, count, min=0, max=3, size=2) {
    return [...Array(count)].reduce(([values, bucket]) => {
        bucket = [...bucket];

        if (bucket.length === 0) {
            bucket = [...Array((max - min) * size)].map((_, index) => {
                return index % (max - min) + min;
            });
        }

        const index = Math.random() * bucket.length | 0;
        const value = bucket.splice(index, 1)[0];

        return [[...values, value], bucket];
    }, [[], bucket]);
}

function* onHideSelection() {
    const state = yield select();

    if (!isSelectionHidden(state)) {
        return;
    }

    yield call(delay, 500);

    const [values, bucket] = getRandom(getBucket(state), 4);

    yield put(replaceSquares(getSelectedSquares(state), values, getSelectionSize(state), bucket));
}

function* onReplaceSquares() {
    const state = yield select();

    yield put(updateHighscore(getScore(state)));
}

function* onRequestStartGame() {
    const [values] = getRandom([], BOARD_SIZE ** 2);

    yield put(startGame(values));
}

function* onRequestAssureGame() {
    const state = yield select();

    if (!isGameActive(state)) {
        const [values] = getRandom([], BOARD_SIZE ** 2);

        yield put(startGame(values));
    }
}

export default function* () {
    yield takeEvery('HIDE_SELECTION', onHideSelection);
    yield takeEvery('REPLACE_SQUARES', onReplaceSquares);
    yield takeEvery('REQUEST_ASSURE_GAME', onRequestAssureGame);
    yield takeEvery('REQUEST_START_GAME', onRequestStartGame);
};
