import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { push } from 'connected-react-router';
import { requestAssureGame, requestStartGame } from '../state/actions';
import { isGameActive } from '../state/selectors';
import { TITLE_URL, KEY_SOFT_LEFT, KEY_SOFT_RIGHT } from '../config';
import Board from './Board';
import Menu from './Menu';

function Game({ push }) {
    const dispatch = useDispatch();

    useEffect(() => {
        window.onkeydown = (event) => {
            if (event.key === KEY_SOFT_LEFT) {
                push(TITLE_URL);
            }
            if (event.key === KEY_SOFT_RIGHT) {
                dispatch(requestStartGame());
            }
        };

        return () => {
            window.onkeydown = null;
        };
    });

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

export default connect(null, { push })(Game);
