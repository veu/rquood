import React, {useState} from 'react';
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
    const [activeSquares, setActiveSquares] = useState([]);
    const [hiddenSquares, setHiddenSquares] = useState([]);
    const [isLocked, setLocked] = useState(false);
    const [board, setBoard] = useState([...Array(BOARD_SIZE ** 2)].map(() => Math.random() * COLORS | 0));

    const squares = board.map((value, index) => {
        return (
            <Square
                key={index}
                modifiers={{
                    type: value,
                    active: activeSquares.includes(index),
                    inactive: activeSquares.length > 0 && !activeSquares.includes(index),
                    hidden: hiddenSquares.includes(index),
                }}
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
        setActiveSquares([index]);
    }

    async function handleDragEnd({x, y}) {
        setActiveSquares([]);

        if (activeSquares.length < 4) {
            return;
        }

        const newBoard = board.map((value, index) => {
            return activeSquares.includes(index) ? Math.random() * COLORS | 0 : value;
        });

        setHiddenSquares([...activeSquares]);
        setLocked(true);

        await delay(500);

        setHiddenSquares([]);
        setBoard(newBoard);

        await delay(500);

        setLocked(false);
    }

    function handleDragMove({x, y}) {
        setActiveSquares(getActiveSquares(activeSquares[0], getIndex(x, y)));
    }

    function handleDragAbort() {
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
                    isLocked={isLocked}
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
