import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import persistState from 'redux-localstorage';
import './index.css';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers'
import { replaceSquares, startGame } from './actions';
import Game from './components/Game';

const ConnectedGame = connect(
    (state) => {
        return {
            board: state.board,
            score: state.score,
        };
    },
    (dispatch) => {
        return {
            replaceSquares: (squares, size) => {
                dispatch(replaceSquares(squares, size));
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
