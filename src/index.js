import React, {useMemo, useState} from 'react';
import ReactDOM from 'react-dom';
import delay from 'delay';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {DraggingOverlay} from './DraggingOverlay';

const BOARD_SIZE = 7;
const COLORS = 3;

function Square(props) {
    return (
        <div block="board" elem="square" mods={props.modifiers}>
        </div>
    );
}

function Board(props) {
    const [dragStart, setDragStart] = useState(null);
    const [dragEnd, setDragEnd] = useState(null);
    const [hiddenSquares, setHiddenSquares] = useState([]);
    const [isLocked, setLocked] = useState(false);
    const [board, setBoard] = useState([...Array(BOARD_SIZE ** 2)].map(() => Math.random() * COLORS | 0));

    const selection = useMemo(() => getSelection(dragStart, dragEnd), [dragStart, dragEnd]);

    const squares = board.map((value, index) => {
        const active = selection.squares.includes(index);

        return (
            <Square
                key={index}
                modifiers={{
                    type: value,
                    active,
                    inactive: selection.squares.length > 0 && !active,
                    hidden: hiddenSquares.includes(index),
                    ready: selection.squares.length === 4 && active,
                }}
            />
        );
    });

    function isCoordinateValid(c) {
        return 0 <= c && c < BOARD_SIZE && c % 1 === 0;
    }

    function getSelection(start, end) {
        if (start === null) {
            return {squares: [], size: 0};
        }

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

    function getIndex(x, y) {
        return (x * BOARD_SIZE | 0) + (y * BOARD_SIZE | 0) * 7;
    }

    function handleDragStart({x, y}) {
        setDragStart(getIndex(x, y));
    }

    async function handleDragEnd({x, y}) {
        setDragStart(null);
        setDragEnd(null);

        if (selection.squares.length < 4) {
            return;
        }

        const newBoard = board.map((value, index) => {
            return selection.squares.includes(index) ? Math.random() * COLORS | 0 : value;
        });

        setHiddenSquares([...selection.squares]);
        setLocked(true);

        await delay(500);

        props.increaseScore(selection.size | 0);
        setHiddenSquares([]);
        setBoard(newBoard);

        await delay(500);

        setLocked(false);
    }

    function handleDragMove({x, y}) {
        setDragEnd(getIndex(x, y));
    }

    function handleDragAbort() {
        setDragStart(null);
        setDragEnd(null);
    }

    return (
        <div>
            <div block="board">
                <DraggingOverlay
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragMove={handleDragMove}
                    onDragAbort={handleDragAbort}
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
