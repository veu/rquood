import React, {useRef, useState} from 'react';

export function DraggingOverlay(props) {
    const ref = useRef();
    const [drag, setDrag] = useState({});

    const style = {
        height: '100%',
        position: 'absolute',
        width: '100%',
        zIndex: props.zIndex === undefined ? 10000 : props.zIndex,
    };

    function getGridPosition(event, ref) {
        const {x: offsetX, y: offsetY} = ref.current.getBoundingClientRect();
        const {pageX, pageY} = event;
        const {offsetWidth, offsetHeight} = ref.current;
        const x = (pageX - offsetX) / offsetWidth * props.gridSize | 0;
        const y = (pageY - offsetY) / offsetHeight * props.gridSize | 0;

        return {x, y};
    }

    function startDragging(event) {
        if (props.isLocked) {
            return;
        }

        const position = getGridPosition(event, ref);

        setDrag({start: position});
        props.onDragUpdate(position, position);
    }

    function finishDragging() {
        if (props.isLocked || !drag.start) {
            return;
        }

        setDrag({});
        props.onDragEnd();
    }

    function abortDragging() {
        if (props.isLocked || !drag.start) {
            return;
        }

        setDrag({});
        props.onDragUpdate(null, null);
    }

    function updatePosition(event) {
        if (!drag.start) {
            return;
        }

        const position = getGridPosition(event, ref);

        if (drag.end && position.x === drag.end.x && position.y === drag.end.y) {
            return;
        }

        setDrag({start: {...drag.start}, end: position});
        props.onDragUpdate(drag.start, position);
    }

    return (
        <div
            style={style}
            touch-action="none"
            onPointerDown={(event) => startDragging(event) }
            onPointerUp={(event) => finishDragging(event) }
            onPointerMove={(event) => updatePosition(event)}
            onPointerCancel={() => abortDragging()}
            onPointerLeave={() => abortDragging()}
            onPointerOut={() => abortDragging()}
            onLostPointerCapture={() => abortDragging()}
            ref={ref}
        >
        </div>
    );
}
