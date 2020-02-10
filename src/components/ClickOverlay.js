import React, { useRef } from 'react';

export default function ClickOverlay({
    onClick,
    onMouseMove = () => {},
    zIndex = 10000
}) {
    const ref = useRef();

    const style = {
        height: '100%',
        position: 'absolute',
        width: '100%',
        zIndex,
    };

    function click(event) {
        onClick(getPosition(event, ref));
    }

    function mouseMove(event) {
        onMouseMove(getPosition(event, ref));
    }

    return <div
        onClick={click}
        onMouseMove={mouseMove}
        ref={ref}
        style={style}
    ></div>;
}

function getPosition(event, ref) {
    const {x: offsetX, y: offsetY} = ref.current.getBoundingClientRect();
    const {pageX, pageY} = event;
    const {offsetWidth, offsetHeight} = ref.current;
    const x = (pageX - offsetX) / offsetWidth;
    const y = (pageY - offsetY) / offsetHeight;

    return {x, y};
}
