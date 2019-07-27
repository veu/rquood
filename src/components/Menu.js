import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestStartGame } from '../state/actions';
import {
    isGameActive as getIsGameActive,
    getScore,
    getHighscore,
    getStreakType,
    getStreakCount
} from '../state/selectors';
import { TITLE_URL } from '../config';

export default function Menu() {
    const isGameActive = useSelector(getIsGameActive);

    if (!isGameActive) {
        return null;
    }

    const highscore = useSelector(getHighscore);
    const score = useSelector(getScore);
    const streakCount = useSelector(getStreakCount);
    const streakType = useSelector(getStreakType);

    const dispatch = useDispatch();

    function getStats() {
        return (<>
            <div block="stat">
                <div block="stat" elem="title">Score</div>
                <div block="stat" elem="value">{score}</div>
            </div>
            <div block="stat">
                <div block="stat" elem="title">Streak</div>
                <div block="square" mods={{type: streakType}}></div>
                <div block="stat" elem="value">{streakCount}</div>
            </div>
            <div block="stat">
                <div block="stat" elem="title">Highscore</div>
                <div block="stat" elem="value">{highscore}</div>
            </div>
        </>);
    }

    return (
        <div block="menu" mods={{main: true}}>
            {getStats()}

            <div block="action">
                <Link to={TITLE_URL}>Back</Link>
            </div>
            <div
                block="action"
                onClick={() => dispatch(requestStartGame())}
            >
                New Game
            </div>
        </div>
    );
}
