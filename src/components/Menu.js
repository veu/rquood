import React from 'react';
import { Link } from 'react-router-dom';
import {
    isGameActive as getIsGameActive,
    getScore,
    getStreakType,
    getStreakCount,
    getHues,
} from '../state/selectors';
import { OPTIONS_URL, IS_KAY_OS, TITLE_URL } from '../config';
import { useKaiOsSoftwareKeys } from '../hooks';
import BackLink from './BackLink';
import {useStore} from "../state/store";

function Menu() {
    const { refLeft, refRight } = useKaiOsSoftwareKeys();
    const { highscore, hues, isGameActive, score, streakCount, streakType } = useStore((state) => ({
        highscore: state.highscore,
        hues: getHues(state),
        isGameActive: getIsGameActive(state),
        score: getScore(state),
        streakCount: getStreakCount(state),
        streakType: getStreakType(state),
    }))

    if (!isGameActive) {
        return null;
    }

    const style = {
        filter: `hue-rotate(${hues[streakType]}deg)`
    };

    function getStats() {
        return (<>
            <div block="stat">
                <div block="stat" elem="title">Score</div>
                <div block="stat" elem="value">{score}</div>
            </div>
            <div block="stat">
                <div block="stat" elem="title">Streak</div>
                {streakCount > 0 && <>
                    <div block="stat" elem="square">
                        <div block="square" mods={{type: streakType}} style={style} />
                    </div>
                    <div block="stat" elem="value">{streakCount}</div>
                </>}
            </div>
            <div block="stat">
                <div block="stat" elem="title">Highscore</div>
                <div block="stat" elem="value">{highscore}</div>
            </div>
        </>);
    }

    return (<>
        <div block="menu">
            {getStats()}
        </div>
        <div block="main-menu">
            <div block="main-menu" elem="action">
                <BackLink to={TITLE_URL} innerRef={refLeft} />
            </div>
            <div block="main-menu" elem="action" mods={{inactive: !IS_KAY_OS}}>
                SELECT
            </div>
            <div block="main-menu" elem="action">
                <Link to={OPTIONS_URL} innerRef={refRight}>Options</Link>
            </div>
        </div>
    </>);
}

export default Menu;
