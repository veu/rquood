import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux'
import reducers from './reducers'
import { replaceSquares, startGame } from './actions';
import Board from './components/Board';
import { useRandomBucket } from './hooks/useRandomBucket';
import Title from './components/Title';

const BOARD_SIZE = 7;
const COLORS = 3;

function Game(props) {
    const [getRandomType, getRandomTypes] = useRandomBucket(0, COLORS);

    let top = (() => {
        if (props.board === null) {
            return <Title />;
        }

        return (
            <Board
                board={props.board}
                replaceSquares={(indexes, size) => {
                    props.replaceSquares(indexes.map((index) => ({index, value: getRandomType()})), size);
                }}
            />
        );
    })();

    return (
        <div>
            {top}
            <div block="actions">
                <div
                    block="actions"
                    elem="start"
                    mods={{highlight: !props.board}}
                    onClick={() => props.startGame(getRandomTypes(BOARD_SIZE ** 2))}
                >
                    New Game
                </div>
            </div>
            <div block="stat">
                <div block="stat" elem="title">Score</div>
                <div block="stat" elem="value">{props.score}</div>
            </div>
        </div>
    );
}

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
    <Provider store={createStore(reducers)}>
        <ConnectedGame />
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
