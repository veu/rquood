import React, { useState } from 'react';
import { DraggingOverlay } from './DraggingOverlay';

export function GridDraggingOverlay(props) {
    const [lastEnd, setLastEnd] = useState(null);

    function onDragUpdate(start, end) {
        const gridStart = {
            x: start.x * props.gridSize | 0,
            y: start.y * props.gridSize | 0,
        };
        const gridEnd = {
            x: end.x * props.gridSize | 0,
            y: end.y * props.gridSize | 0,
        };

        if (lastEnd && end.x === lastEnd.x && end.y === lastEnd.y) {
            return;
        }

        setLastEnd(end);

        props.onDragUpdate(gridStart, gridEnd);
    }

    function onDragAbort() {
        setLastEnd(null);

        props.onDragAbort();
    }

    function onDragEnd() {
        setLastEnd(null);

        props.onDragEnd();
    }

    return (
        <DraggingOverlay
            onDragAbort={onDragAbort}
            onDragEnd={onDragEnd}
            onDragUpdate={onDragUpdate}
            isLocked={props.isLocked}
        />
    );
}
