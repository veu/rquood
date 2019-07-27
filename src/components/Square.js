import React from 'react';
import { useSelector } from 'react-redux';
import { getSquare } from '../state/selectors';

export default function Square({index}) {
    const square = useSelector(getSquare(index));

    return <div block="square" mods={square}></div>;
}
