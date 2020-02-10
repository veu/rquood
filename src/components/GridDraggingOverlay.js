import React, { useState } from 'react';
import { DraggingOverlay } from './DraggingOverlay';

export function GridDraggingOverlay({
    gridWidth,
    gridHeight,
    isLocked,
    onDragAbort,
    onDragEnd,
    onDragUpdate
}) {
    const [lastEnd, setLastEnd] = useState(null);

    function dragUpdate(start, end) {
        const gridStart = {
            x: start.x * gridWidth | 0,
            y: start.y * gridHeight | 0,
        };
        const gridEnd = {
            x: end.x * gridWidth | 0,
            y: end.y * gridHeight | 0,
        };

        if (lastEnd && end.x === lastEnd.x && end.y === lastEnd.y) {
            return;
        }

        setLastEnd(end);

        onDragUpdate(gridStart, gridEnd);
    }

    function dragAbort() {
        setLastEnd(null);

        onDragAbort();
    }

    function dragEnd() {
        setLastEnd(null);

        onDragEnd();
    }

    return (
        <DraggingOverlay
            onDragAbort={dragAbort}
            onDragEnd={dragEnd}
            onDragUpdate={dragUpdate}
            isLocked={isLocked}
        />
    );
}
