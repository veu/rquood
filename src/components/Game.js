import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OPTIONS_URL, TITLE_URL } from '../config';
import { requestAssureGame } from '../state/actions';
import { isGameActive } from '../state/selectors';
import Board from './Board';
import BottomMenu from './BottomMenu';
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
        <main className="game">
            <Board />
            <Menu />
        </main>
        <footer>
            <BottomMenu
                left={{text: 'Back', url: TITLE_URL, back: true}}
                center={{text: 'SELECT'}}
                right={{text: 'Options', url: OPTIONS_URL}}
            />
        </footer>
    </>);
}

export default Game;
