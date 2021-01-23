import React from 'react';
import { useSelector } from 'react-redux';
import {
    isGameActive as getIsGameActive,
    getScore,
    getHighscore,
    getStreakType,
    getStreakCount,
    getHues
} from '../state/selectors';

function Menu() {
    const isGameActive = useSelector(getIsGameActive);
    const highscore = useSelector(getHighscore);
    const score = useSelector(getScore);
    const streakCount = useSelector(getStreakCount);
    const streakType = useSelector(getStreakType);
    const hues = useSelector(getHues);

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
                        <div block="square" mods={{type: streakType}} style={style}></div>
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

    return (<div block="menu">
        {getStats()}
    </div>);
}

export default Menu;
