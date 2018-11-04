import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import persistState from 'redux-localstorage';
import './index.css';
import * as serviceWorker from './serviceWorker';
import reducers, { replaceSquares, startGame } from './reducers'
import Game from './components/Game';

const ConnectedGame = connect(
    (state) => state,
    (dispatch) => {
        return {
            replaceSquares: (squares, size, type) => {
                dispatch(replaceSquares(squares, size, type));
            },
            startGame: (board) => {
                dispatch(startGame(board));
            }
        }
    }
)(Game);

ReactDOM.render((
    <Provider store={createStore(reducers, persistState())}>
        <ConnectedGame />
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
