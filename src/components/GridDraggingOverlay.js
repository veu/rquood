import React, { useState } from 'react';
import { DraggingOverlay } from './DraggingOverlay';

export function GridDraggingOverlay({
    active,
    gridSize,
    isLocked,
    onDragAbort,
    onDragEnd,
    onDragUpdate
}) {
    const [lastEnd, setLastEnd] = useState(null);

    if (!active) {
        return <></>;
    }

    function dragUpdate(start, end) {
        const gridStart = {
            x: start.x * gridSize | 0,
            y: start.y * gridSize | 0,
        };
        const gridEnd = {
            x: end.x * gridSize | 0,
            y: end.y * gridSize | 0,
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
