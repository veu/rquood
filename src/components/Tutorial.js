import React from 'react';
import { useSelector, connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { getTutorialMessage } from '../state/selectors';
import Board from './Board';
import { useKaiOsSoftwareKeys } from '../hooks';
import { IS_KAY_OS } from '../config';

function Tutorial({ goBack }) {
    const { refLeft } = useKaiOsSoftwareKeys();

    const message = useSelector(getTutorialMessage);

    return (<>
        <Board isTutorial={true} />
        <div block="menu">
            <div block="message">{message}</div>
        </div>
        <div block="main-menu">
            <div
                block="main-menu"
                elem="action"
                onClick={() => goBack()}
                ref={refLeft}
            >
                Back
            </div>
            <div block="main-menu" elem="action" mods={{inactive: !IS_KAY_OS}}>
                SELECT
            </div>
            <div
                block="main-menu"
                elem="action"
                mods={{inactive: true}}
            >
            </div>
        </div>
    </>);
}

export default connect(null, { goBack })(Tutorial);
