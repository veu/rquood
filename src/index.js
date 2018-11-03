import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux'
import reducers from './reducers'
import { replaceSquares } from './actions';
import Board from './components/board';

const BOARD_SIZE = 7;
const COLORS = 3;

function Game(props) {
    return (
        <div>
            <Board board={props.board} replaceSquares={props.replaceSquares} />
            <div block="stat">
                <div block="stat" elem="title">Score</div>
                <div block="stat" elem="value">{props.score}</div>
            </div>
        </div>
    );
}

const TheGame = connect(
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
        }
    }
)(Game);

function createBoard() {
    let bucket = [];

    return [...Array(BOARD_SIZE ** 2)].map(() => {
        if (bucket.length === 0) {
            bucket = [...Array(COLORS * 2)].map((value, index) => {
                return index % 3;
            });
        }

        const index = Math.random() * bucket.length | 0;

        return bucket.splice(index, 1)[0];
    });
}

const store = createStore(reducers, {board: createBoard()});

ReactDOM.render((
    <Provider store={store}>
        <TheGame />
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
