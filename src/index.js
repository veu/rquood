import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import delay from 'delay';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {DraggingOverlay} from './DraggingOverlay';
import { useRandomBucket } from './hooks/useRandomBucket';

const BOARD_SIZE = 7;
const COLORS = 3;

function Board(props) {
    const [drag, setDrag] = useState(null);
    const [hiddenSquares, setHiddenSquares] = useState([]);
    const [isLocked, setLocked] = useState(false);
    const [getRandomType, getRandomTypes] = useRandomBucket(0, COLORS);
    const [board, setBoard] = useState(getRandomTypes(BOARD_SIZE ** 2));

    const selection = getSelection(drag);

    const squares = board.map((value, index) => {
        const active = selection.squares.includes(index);

        return (
            <div
                key={index}
                block="board"
                elem="square"
                mods={{
                    type: value,
                    active,
                    inactive: selection.squares.length > 0 && !active,
                    hidden: hiddenSquares.includes(index),
                    ready: selection.squares.length === 4 && active,
                }}>
            </div>
        );
    });

    function isCoordinateValid(c) {
        return 0 <= c && c < BOARD_SIZE && c % 1 === 0;
    }

    function getSelection(drag) {
        if (drag === null) {
            return {squares: [], size: 0};
        }

        const {start, end} = drag;

        if (end === null || board[start] !== board[end] || start === end) {
            return {squares: [start], size: 0};
        }

        const a = {x: start % BOARD_SIZE, y: start / BOARD_SIZE | 0};
        const b = {x: end % BOARD_SIZE, y: end / BOARD_SIZE | 0};
        const center = {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const diff = {x: center.x - a.x, y: center.y - a.y};
        const selection = {squares: [start, end], size: 2 * Math.hypot(diff.x, diff.y)};

        const c = {x: center.x + diff.y, y: center.y - diff.x};
        const cIndex = c.x + c.y * BOARD_SIZE;

        if (isCoordinateValid(c.x) && isCoordinateValid(c.y) && board[cIndex] === board[start]) {
            selection.squares.push(cIndex);
        }

        const d = {x: center.x - diff.y, y: center.y + diff.x};
        const dIndex = d.x + d.y * BOARD_SIZE;

        if (isCoordinateValid(d.x) && isCoordinateValid(d.y) && board[dIndex] === board[start]) {
            selection.squares.push(dIndex);
        }

        return selection;
    }

    async function handleDragEnd() {
        setDrag(null);

        if (selection.squares.length < 4) {
            return;
        }

        const newBoard = board.map((value, index) => {
            return selection.squares.includes(index) ? getRandomType() : value;
        });

        setHiddenSquares([...selection.squares]);
        setLocked(true);

        await delay(490);

        props.increaseScore(selection.size | 0);
        setHiddenSquares([]);
        setBoard(newBoard);

        await delay(500);

        setLocked(false);
    }

    function handleDragUpdate(start, end) {
        setDrag({
            start: start ? start.x + start.y * BOARD_SIZE : null,
            end: end ? end.x + end.y * BOARD_SIZE : null,
        });
    }

    return (
        <div>
            <div block="board">
                <DraggingOverlay
                    gridSize={BOARD_SIZE}
                    onDragEnd={handleDragEnd}
                    onDragUpdate={handleDragUpdate}
                    isLocked={isLocked}
                />
                <div block="board" elem="board">
                    {squares}
                </div>
            </div>
        </div>
    );
}

function Game(props) {
    const [score, setScore] = useState(0);

    return (
        <div>
            <Board increaseScore={(delta) => setScore(score + delta)} />
            <div block="stat">
                <div block="stat" elem="title">Score</div>
                <div block="stat" elem="value">{score}</div>
            </div>
        </div>
    );
}

ReactDOM.render(<Game />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
