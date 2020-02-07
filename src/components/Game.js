import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestAssureGame } from '../state/actions';
import { isGameActive } from '../state/selectors';
import Board from './Board';
import Menu from './Menu';

function Game() {
    const dispatch = useDispatch();
    const isActive = useSelector(isGameActive);

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

export default Game;
