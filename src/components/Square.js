import React from 'react';
import { useSelector } from 'react-redux';
import { getSquare, getHues } from '../state/selectors';

export default function Square({index}) {
    const square = useSelector(getSquare(index));
    const hues = useSelector(getHues);
    const style = {
        filter: `hue-rotate(${hues[square.type]}deg)`
    };

    return <button block="square" mods={square} style={style}></button>;
}
