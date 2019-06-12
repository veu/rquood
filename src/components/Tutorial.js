import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTutorialMessage } from '../state/selectors';
import { TITLE_URL } from '../config';
import Board from './Board';

export default function Tutorial() {
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
