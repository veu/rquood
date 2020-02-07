import React, { useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { getTutorialMessage } from '../state/selectors';
import { KEY_SOFT_LEFT } from '../config';
import Board from './Board';

function Tutorial({ goBack }) {
    useEffect(() => {
        window.onkeydown = (event) => {
            if (event.key === KEY_SOFT_LEFT) {
                goBack();
            }
        };

        return () => {
            window.onkeydown = null;
        };
    });

    const message = useSelector(getTutorialMessage);

    return (<>
        <Board isTutorial={true} />
        <div block="menu">
            <div block="message">{message}</div>
        </div>
        <div block="menu" mods={{main: true}}>
            <div block="action" onClick={() => goBack()}>
                Back
            </div>
        </div>
    </>);
}

export default connect(null, { goBack })(Tutorial);
