import React, { useState } from 'react';
import ClickOverlay from './ClickOverlay';

export default function GridClickOverlay({
    active,
    gridSize,
    onDragAbort,
    onDragEnd,
    onDragUpdate,
    isLocked
}) {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    if (!active) {
        return <></>;
    }

    function click(position) {
        if (isLocked) {
            return;
        }

        const gridPosition = {
            x: position.x * gridSize | 0,
            y: position.y * gridSize | 0,
        };

        if (!start) {
            setStart(gridPosition);
            setEnd(gridPosition);
            onDragUpdate(gridPosition, gridPosition);
        } else if (gridPosition.x === start.x && gridPosition.y === start.y) {
            setStart(null);
            setEnd(null);
            onDragAbort();
        } else {
            setStart(null);
            setEnd(null);
            onDragEnd();
        }
    }

    function mouseMove(position) {
        if (isLocked || !start) {
            return;
        }

        const gridPosition = {
            x: position.x * gridSize | 0,
            y: position.y * gridSize | 0,
        };

        if (end && gridPosition.x === end.x && gridPosition.y === end.y) {
            return;
        }

        setEnd(gridPosition);

        onDragUpdate(start, gridPosition);
    }

    return <ClickOverlay
        onClick={click}
        onMouseMove={mouseMove}
    ></ClickOverlay>;
}
