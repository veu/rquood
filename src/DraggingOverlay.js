import React, {useRef, useState} from 'react';

function getRelativePosition(event, ref) {
    const {x: offsetX, y: offsetY} = ref.current.getBoundingClientRect();
    const {pageX, pageY} = event;
    const {offsetWidth, offsetHeight} = ref.current;
    const x = (pageX - offsetX) / offsetWidth;
    const y = (pageY - offsetY) / offsetHeight;

    return {x, y};
}

export function DraggingOverlay(props) {
    const ref = useRef();
    const [pointerDown, setPointerDown] = useState(false);

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

        setPointerDown(true);
        props.onDragStart(getRelativePosition(event, ref));
    }

    function finishDragging(event) {
        if (props.isLocked || !pointerDown) {
            return;
        }

        setPointerDown(false);
        props.onDragEnd(getRelativePosition(event, ref));
    }

    function abortDragging() {
        if (props.isLocked || !pointerDown) {
            return;
        }

        setPointerDown(false);
        props.onDragAbort();
    }

    function updatePosition(event) {
        if (!pointerDown) {
            return;
        }

        props.onDragMove(getRelativePosition(event, ref));
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
