import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import persistState from 'redux-localstorage';
import './index.css';
import * as serviceWorker from './serviceWorker';
import reducers, { replaceSquares, startGame, updateSelection, hideSelection } from './reducers'
import Game from './components/Game';

const ConnectedGame = connect(
    (state) => state,
    (dispatch) => {
        return {
            hideSelection: () => {
                dispatch(hideSelection());
            },
            replaceSquares: (values) => {
                dispatch(replaceSquares(values));
            },
            startGame: (board) => {
                dispatch(startGame(board));
            },
            updateSelection: (indexes) => {
                dispatch(updateSelection(indexes));
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

ReactDOM.render((
    <Provider store={createStore(reducers, persistState('', {slicer: slicePersistedState}))}>
        <ConnectedGame />
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
