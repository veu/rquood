import React, {useState} from 'react';
import delay from 'delay';
import {DraggingOverlay} from '../DraggingOverlay';

const BOARD_SIZE = 7;

export default function Board(props) {
    const [drag, setDrag] = useState(null);
    const [hiddenSquares, setHiddenSquares] = useState([]);
    const [isLocked, setLocked] = useState(false);

    const selection = getSelection(drag);

    const squares = props.board.map((value, index) => {
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

        if (end === null || props.board[start] !== props.board[end] || start === end) {
            return {squares: [start], size: 0};
        }

        const a = {x: start % BOARD_SIZE, y: start / BOARD_SIZE | 0};
        const b = {x: end % BOARD_SIZE, y: end / BOARD_SIZE | 0};
        const center = {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const diff = {x: center.x - a.x, y: center.y - a.y};
        const selection = {squares: [start, end], size: 2 * Math.hypot(diff.x, diff.y)};

        const c = {x: center.x + diff.y, y: center.y - diff.x};
        const cIndex = c.x + c.y * BOARD_SIZE;

        if (isCoordinateValid(c.x) && isCoordinateValid(c.y) && props.board[cIndex] === props.board[start]) {
            selection.squares.push(cIndex);
        }

        const d = {x: center.x - diff.y, y: center.y + diff.x};
        const dIndex = d.x + d.y * BOARD_SIZE;

        if (isCoordinateValid(d.x) && isCoordinateValid(d.y) && props.board[dIndex] === props.board[start]) {
            selection.squares.push(dIndex);
        }

        return selection;
    }

    async function handleDragEnd() {
        setDrag(null);

        if (selection.squares.length < 4) {
            return;
        }

        setHiddenSquares([...selection.squares]);
        setLocked(true);

        await delay(490);

        setHiddenSquares([]);
        props.replaceSquares(selection.squares, selection.size | 0);

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
