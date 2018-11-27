import React, {useRef, useState} from 'react';

export function DraggingOverlay(props) {
    const ref = useRef();
    const [dragStart, setDragStart] = useState(null);

    const style = {
        height: '100%',
        position: 'absolute',
        width: '100%',
        zIndex: props.zIndex === undefined ? 10000 : props.zIndex,
    };

    function startDragging(event) {
        if (props.isLocked) {
            return;
        }

        const position = getPosition(event, ref);

        setDragStart(position);
        props.onDragUpdate(position, position);
    }

    function finishDragging() {
        if (props.isLocked || !dragStart) {
            return;
        }

        setDragStart(null);
        props.onDragEnd();
    }

    function abortDragging() {
        if (props.isLocked || !dragStart) {
            return;
        }

        setDragStart(null);
        props.onDragAbort();
    }

    function updatePosition(event) {
        if (dragStart) {
            props.onDragUpdate(dragStart, getPosition(event, ref));
        }
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

function getPosition(event, ref) {
    const {x: offsetX, y: offsetY} = ref.current.getBoundingClientRect();
    const {pageX, pageY} = event;
    const {offsetWidth, offsetHeight} = ref.current;
    const x = (pageX - offsetX) / offsetWidth;
    const y = (pageY - offsetY) / offsetHeight;

    return {x, y};
}
