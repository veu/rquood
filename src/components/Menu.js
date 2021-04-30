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

    return (
        <div className="menu">
            <div className="stat">
                <div className="stat__title">Score</div>
                <div className="stat__value">{score}</div>
            </div>
            <div className="stat">
                <div className="stat__title">Streak</div>

                <div className="stat__value">
                {streakCount}
                {streakCount > 0 && <div className="stat__square">
                <div className={`square square_type_${streakType}`} style={style}></div>
            </div>}
                </div>
            </div>
            <div className="stat">
                <div className="stat__title">Highscore</div>
                <div className="stat__value">{highscore}</div>
            </div>
        </div>
    );
}

export default Menu;
