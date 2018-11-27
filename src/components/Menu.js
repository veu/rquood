import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestStartGame } from '../actions';
import {
    isGameActive,
    getScore,
    getHighscore,
    getStreakType,
    getStreakCount,
    getHues
} from '../selectors';
import { TITLE_URL } from '../config';

function Menu(props) {
    if (!props.isGameActive) {
        return null;
    }

    function getStats() {
        return (
            <React.Fragment>
                <div block="stat">
                    <div block="stat" elem="title">Score</div>
                    <div block="stat" elem="value">{props.score}</div>
                </div>
                <div block="stat">
                    <div block="stat" elem="title">Streak</div>
                    <div block="stat" elem="square" mods={{type: props.streakType}} style={{filter: `hue-rotate(${props.hues[props.streakType]}deg)`}}></div>
                    <div block="stat" elem="value">{props.streakCount}</div>
                </div>
                <div block="stat">
                    <div block="stat" elem="title">Highscore</div>
                    <div block="stat" elem="value">{props.highscore}</div>
                </div>
            </React.Fragment>
        );
    }

    return (
        <div block="menu" mods={{main: true}}>
            {getStats()}

            <div block="action">
                <Link to={TITLE_URL}>Back</Link>
            </div>
            <div
                block="action"
                onClick={props.requestStartGame}
            >
                New Game
            </div>
        </div>
    );
}

export default connect(
    (state) => ({
        highscore: getHighscore(state),
        hues: getHues(state),
        isGameActive: isGameActive(state),
        score: getScore(state),
        streakCount: getStreakCount(state),
        streakType: getStreakType(state),
    }),
    (dispatch) => {
        return {
            requestStartGame: () => {
                dispatch(requestStartGame());
            }
        }
    }
)(Menu);
