import React, {useState} from 'react';
import delay from 'delay';
import {DraggingOverlay} from './DraggingOverlay';

export default function Board(props) {
    const [drag, setDrag] = useState(null);
    const [hiddenSquares, setHiddenSquares] = useState([]);
    const [isLocked, setLocked] = useState(false);

    const selection = props.getSelection(drag);

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

    async function handleDragEnd() {
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

    function handleDragUpdate(start, end) {
        setDrag(start && {
            start,
            end,
        });
    }

    return (
        <div block="board">
            <DraggingOverlay
                gridSize={props.gridSize}
                onDragEnd={handleDragEnd}
                onDragUpdate={handleDragUpdate}
                isLocked={isLocked}
            />
            <div block="board" elem="board">
                {squares}
            </div>
        </div>
    );
}
