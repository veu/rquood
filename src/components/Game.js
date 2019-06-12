import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestAssureGame } from '../state/actions';
import { isGameActive } from '../state/selectors';
import Board from './Board';
import Menu from './Menu';

export default function Game() {
    const isActive = useSelector(isGameActive);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestAssureGame());
    });

    if (!isActive) {
        return null;
    }

    return (<>
        <Board />
        <Menu />
    </>);
}
