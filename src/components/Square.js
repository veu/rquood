import React from 'react';
import { useSelector } from 'react-redux';
import { getSquare } from '../state/selectors';

export default function Square({index}) {
    const square = useSelector(getSquare(index));

    return <button block="square" mods={square}></button>;
}
