import delay from 'delay';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { replaceSquares, startGame } from './reducers';
import { BOARD_SIZE } from './config';

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
    yield call(delay, 500);

    const state = yield select();
    const [values, bucket] = getRandom(state.bucket, 4);

    yield put(replaceSquares(values, bucket));
}

function* onRequestStartGame() {
    const [values] = getRandom([], BOARD_SIZE ** 2);

    yield put(startGame(values));
}

export default function* () {
    yield takeEvery('HIDE_SELECTION', onHideSelection);
    yield takeEvery('REQUEST_START_GAME', onRequestStartGame);
};
