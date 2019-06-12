import React from 'react';
import { useSelector } from 'react-redux';
import { getSquare, getHues } from '../state/selectors';

export default function Square(props) {
    const square = useSelector(getSquare(props.index));
    const hues = useSelector(getHues);

    return (
        <div
            block="square"
            mods={square}
            style={{filter: `hue-rotate(${hues[square.type]}deg)`}}>
        </div>
    );
}
