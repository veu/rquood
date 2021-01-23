import React from 'react';
import { useSelector, connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { getTutorialMessage } from '../state/selectors';
import { TITLE_URL } from '../config';
import Board from './Board';
import BottomMenu from './BottomMenu';

function Tutorial({ goBack }) {
    const message = useSelector(getTutorialMessage);

    return (<>
        <div block="title">
            Tutorial
        </div>
        <Board isTutorial={true} />
        <div block="menu">
            <div block="message">{message}</div>
        </div>

        <BottomMenu
            left={{text: 'Back', url: TITLE_URL, back: true}}
            center={{text: 'SELECT'}}
        />
    </>);
}

export default connect(null, { goBack })(Tutorial);
