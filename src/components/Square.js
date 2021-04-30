import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {getSquare, getHues, getWidth} from '../state/selectors';

export default function Square({cursor, index}) {
    const square = useSelector(getSquare(index));
    const hues = useSelector(getHues);
    const width = useSelector(getWidth);
    const ref = useRef(null);
    const style = {
        filter: `hue-rotate(${hues[square.type]}deg)`
    };

    useEffect(() => {
        const x = index % width;
        const y = (index - x) / width;

        if (x === cursor.x && y === cursor.y) {
            ref.current.focus();
        }
    }, [cursor]);

    const block = 'square';
    const mods = Object
        .entries(square)
        .filter(([_, value]) => value !== false)
        .map(([name, val]) => `${block}_${name}${val === true ? '' : '_' + val}`);
    const className = [block, ...mods].join(' ');

    return (
        <button className={className} style={style} ref={ref}></button>
    );
}
