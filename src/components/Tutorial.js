import React from 'react';
import { useSelector, connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { getTutorialMessage } from '../state/selectors';
import Board from './Board';
import { useKaiOsSoftwareKeys } from '../hooks';
import { IS_KAY_OS, TITLE_URL } from '../config';
import BackLink from './BackLink';

function Tutorial({ goBack }) {
    const { refLeft } = useKaiOsSoftwareKeys();

    const message = useSelector(getTutorialMessage);

    return (<>
        <Board isTutorial={true} />
        <div block="menu">
            <div block="message">{message}</div>
        </div>
        <div block="main-menu">
            <div block="main-menu" elem="action">
                <BackLink to={TITLE_URL} innerRef={refLeft} />
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
