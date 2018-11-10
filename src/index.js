import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage';
import './index.css';
import * as serviceWorker from './serviceWorker';
import reducers, { requestStartGame, updateSelection, hideSelection } from './reducers'
import saga from './sagas';
import Game from './components/Game';

const ConnectedGame = connect(
    (state) => state,
    (dispatch) => {
        return {
            requestStartGame: () => {
                dispatch(requestStartGame());
            },
            hideSelection: () => {
                dispatch(hideSelection());
            },
            updateSelection: (diagonal) => {
                dispatch(updateSelection(diagonal));
            }
        }
    }
)(Game);

function slicePersistedState(paths) {
    return (state) => {
        const persist = {...state};
        delete persist.selection;

        return persist;
    };
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    compose(
        persistState('', {slicer: slicePersistedState}),
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(saga);

ReactDOM.render((
    <Provider store={store}>
        <ConnectedGame />
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
