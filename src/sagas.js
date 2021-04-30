import delay from 'delay';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
    replaceSquares,
    startGame,
    updateHighscore,
    advanceTutorial,
    discardSelection,
    startTutorial,
    setSize
} from './state/actions';
import { BOARD_HEIGHT, BOARD_WIDTH, TUTORIAL_URL } from './config';
import {
    isSelectionHidden,
    getBucket,
    getScore,
    getSelectionSize,
    getSelectedSquares,
    isGameActive,
    isTutorial
} from './state/selectors';

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

    if (isTutorial(state)) {
        yield put(advanceTutorial());

        return;
    }

    const [values, bucket] = getRandom(getBucket(state), 4);

    yield put(replaceSquares(getSelectedSquares(state), values, getSelectionSize(state), bucket));
}

function* onReplaceSquares() {
    const state = yield select();

    yield put(updateHighscore(getScore(state)));
}

function* onRequestStartGame() {
    const [values] = getRandom([], BOARD_HEIGHT * BOARD_WIDTH);

    yield put(startGame(values, BOARD_WIDTH, BOARD_HEIGHT));
}

function* onRequestAssureGame() {
    const state = yield select();

    if (isGameActive(state)) {
        yield put(setSize(BOARD_WIDTH, BOARD_HEIGHT))
    } else {
        const [values] = getRandom([], BOARD_HEIGHT * BOARD_WIDTH);

        yield put(startGame(values, BOARD_WIDTH, BOARD_HEIGHT));
    }
}

function* onLocationChange({ payload }) {
    if (payload.location.pathname === TUTORIAL_URL) {
        const isPortrait = matchMedia('only screen and (orientation : portrait)').matches;
        yield put(startTutorial(isPortrait));
    }

    yield put(discardSelection());
}

export default function* saga () {
    yield takeEvery('HIDE_SELECTION', onHideSelection);
    yield takeEvery('REPLACE_SQUARES', onReplaceSquares);
    yield takeEvery('REQUEST_ASSURE_GAME', onRequestAssureGame);
    yield takeEvery('REQUEST_START_GAME', onRequestStartGame);
    yield takeEvery('@@router/LOCATION_CHANGE', onLocationChange);
};
