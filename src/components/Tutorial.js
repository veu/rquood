import React from 'react';
import { useSelector, connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { getTutorialMessage } from '../state/selectors';
import Board from './Board';
import { useKaiOsSoftwareKeys } from '../hooks';

function Tutorial({ goBack }) {
    const { refLeft } = useKaiOsSoftwareKeys();

    const message = useSelector(getTutorialMessage);

    return (<>
        <Board isTutorial={true} />
        <div block="menu">
            <div block="message">{message}</div>
        </div>
        <div block="menu" mods={{main: true}}>
            <div
                block="action"
                onClick={() => goBack()}
                ref={refLeft}
            >
                Back
            </div>
        </div>
    </>);
}

export default connect(null, { goBack })(Tutorial);
