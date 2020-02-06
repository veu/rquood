import React, { useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { getTutorialMessage } from '../state/selectors';
import { TITLE_URL, KEY_SOFT_LEFT } from '../config';
import Board from './Board';

function Tutorial({ push }) {
    useEffect(() => {
        window.onkeydown = (event) => {
            if (event.key === KEY_SOFT_LEFT) {
                push(TITLE_URL);
            }
        };

        return () => {
            window.onkeydown = null;
        };
    });

    const message = useSelector(getTutorialMessage);

    return (<>
        <Board />
        <div block="menu">
            <div block="message">{message}</div>

            <div block="action">
                <Link to={TITLE_URL}>Back</Link>
            </div>
        </div>
    </>);
}

export default connect(null, { push })(Tutorial);
