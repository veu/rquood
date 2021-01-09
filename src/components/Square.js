import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getSquare, getHues } from '../state/selectors';

export default function Square({cursor, index}) {
    const square = useSelector(getSquare(index));
    const hues = useSelector(getHues);
    const ref = useRef(null);
    const style = {
        filter: `hue-rotate(${hues[square.type]}deg)`
    };

    useEffect(() => {
        const x = index % 7;
        const y = index / 7 | 0;

        if (x === cursor.x && y === cursor.y) {
            ref.current.focus();
        }
    }, [cursor]);

    return (
        <button block="square" mods={square} style={style} ref={ref}></button>
    );
}
