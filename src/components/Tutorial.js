import React, { useEffect } from 'react';
import Board from './Board';
import { useKaiOsSoftwareKeys } from '../hooks';
import { IS_KAY_OS, TITLE_URL } from '../config';
import BackLink from './BackLink';
import {useStore} from "../state/store";
import {getTutorialMessage} from "../state/selectors";

function Tutorial() {
    const { refLeft } = useKaiOsSoftwareKeys();

    const [message, resetSelection, startTutorial] = useStore(state => [
        getTutorialMessage(state),
        state.resetSelection,
        state.startTutorial
    ]);

    useEffect(() => {
        startTutorial();
        resetSelection();
    }, []);

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

export default Tutorial;
