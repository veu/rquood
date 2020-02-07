import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { goBack, push } from 'connected-react-router';
import { requestStartGame } from '../state/actions';
import {
    isGameActive as getIsGameActive,
    getScore,
    getHighscore,
    getStreakType,
    getStreakCount
} from '../state/selectors';
import { OPTIONS_URL, KEY_SOFT_LEFT, KEY_SOFT_RIGHT } from '../config';

function Menu({ goBack, push }) {
    const restart = () => {
        dispatch(requestStartGame());
    };

    useEffect(() => {
        window.onkeydown = (event) => {
            if (event.key === KEY_SOFT_LEFT) {
                goBack();
            }
            if (event.key === KEY_SOFT_RIGHT) {
                push(OPTIONS_URL);
            }
        };

        return () => {
            window.onkeydown = null;
        };
    });

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
            >
                Back
            </div>
            <div
                block="action"
                onClick={restart}
            >
                Restart
            </div>
            <div block="action">
                <Link to={OPTIONS_URL}>Options</Link>
            </div>
        </div>
    </>);
}

export default connect(null, { goBack, push })(Menu);
