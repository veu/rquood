import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {DraggingOverlay} from './DraggingOverlay';

const BOARD_SIZE = 7;

function Square(props) {
    const modifiers = {
        animal: props.value,
        active: props.active,
        inactive: props.inactive,
    };

    return (
        <div block="board" elem="square" mods={modifiers}>
        </div>
    );
}

function Board(props) {
    const [dragStart, setDragStart] = useState(null);
    const [activeSquares, setActiveSquares] = useState([]);
    const [board, setBoard] = useState([...Array(BOARD_SIZE ** 2)].map(() => Math.random() * 3 | 0));

    const squares = board.map((value, index) => {
        return (
            <Square
                key={index}
                value={value}
                active={activeSquares.includes(index)}
                inactive={activeSquares.length > 0 && !activeSquares.includes(index)}
            />
        );
    });

    function isCoordinateValid(c) {
        return 0 <= c && c < BOARD_SIZE && c % 1 === 0;
    }

    function getActiveSquares(start, end) {
        if (board[start] !== board[end]) {
            return [start];
        }

        const a = {x: start % BOARD_SIZE, y: start / BOARD_SIZE | 0};
        const b = {x: end % BOARD_SIZE, y: end / BOARD_SIZE | 0};
        const center = {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const diff = {x: center.x - a.x, y: center.y - a.y};
        const c = {x: center.x + diff.y, y: center.y - diff.x};
        const d = {x: center.x - diff.y, y: center.y + diff.x};
        const cIndex = c.x + c.y * BOARD_SIZE;
        const dIndex = d.x + d.y * BOARD_SIZE;

        const active = [start, end];

        if (isCoordinateValid(c.x) && isCoordinateValid(c.y) && board[cIndex] === board[start]) {
            active.push(cIndex);
        }

        if (isCoordinateValid(d.x) && isCoordinateValid(d.y) && board[dIndex] === board[start]) {
            active.push(dIndex);
        }

        return active;
    }

    function getIndex(x, y) {
        return (x * BOARD_SIZE | 0) + (y * BOARD_SIZE | 0) * 7;
    }

    function handleDragStart({x, y}) {
        const index = getIndex(x, y);
        setDragStart(index);
        setActiveSquares([index]);
    }

    function handleDragEnd({x, y}) {
        setDragStart(null);
        setActiveSquares([]);
    }

    function handleDragMove({x, y}) {
        setActiveSquares(getActiveSquares(dragStart, getIndex(x, y)));
    }

    function handleDragAbort() {
        setDragStart(null);
        setActiveSquares([]);
    }

    return (
        <div>
            <div block="board">
                <DraggingOverlay
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragMove={handleDragMove}
                    onDragAbort={handleDragAbort}
                />
                <div block="board" elem="board">
                    {squares}
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<Board />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
