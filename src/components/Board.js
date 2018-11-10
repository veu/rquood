import React from 'react';
import {DraggingOverlay} from './DraggingOverlay';
import Square from './Square';

export default function Board(props) {
    const squares = props.board.map((value, index) => {

        return (
            <Square
                key={index}
                index={index}
                value={value}
                selection={props.selection}
            />
        );
    });

    function handleDragUpdate(start, end) {
        props.updateSelection(start && {
            start,
            end,
        });
    }

    return (
        <div block="board">
            <DraggingOverlay
                gridSize={props.gridSize}
                onDragEnd={props.hideSelection}
                onDragUpdate={handleDragUpdate}
                isLocked={props.selection.hidden}
            />

            {squares}

        </div>
    );
}
