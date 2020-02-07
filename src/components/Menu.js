import React from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { goBack } from 'connected-react-router';
import { requestStartGame } from '../state/actions';
import {
    isGameActive as getIsGameActive,
    getScore,
    getHighscore,
    getStreakType,
    getStreakCount
} from '../state/selectors';
import { OPTIONS_URL } from '../config';
import { useKaiOsSoftwareKeys } from '../hooks';

function Menu({ goBack }) {
    const { refLeft, refRight } = useKaiOsSoftwareKeys();
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
                <div block="stat" elem="square">
                    <div block="square" mods={{type: streakType}}></div>
                </div>
                <div block="stat" elem="value">{streakCount}</div>
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
        <div block="menu" mods={{main: true}}>
            <div
                block="action"
                onClick={() => goBack()}
                ref={refLeft}
            >
                Back
            </div>
            <div
                block="action"
                onClick={() => dispatch(requestStartGame())}
            >
                Restart
            </div>
            <div block="action">
                <Link to={OPTIONS_URL} innerRef={refRight}>Options</Link>
            </div>
        </div>
    </>);
}

export default connect(null, { goBack })(Menu);
