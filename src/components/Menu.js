import React from 'react';
import { connect } from 'react-redux';
import { requestStartGame } from '../reducers';

function Menu(props) {
    const isGameActive = !!props.board;

    function getStats() {
        if (!isGameActive) {
            return null;
        }

        return (
            <React.Fragment>
                <div block="stat">
                    <div block="stat" elem="title">Score</div>
                    <div block="stat" elem="value">{props.score}</div>
                </div>
                <div block="stat">
                    <div block="stat" elem="title">Streak</div>
                    <div block="stat" elem="square" mods={{type: !!props.streak && props.streak.type}}></div>
                    <div block="stat" elem="value">{props.streak && props.streak.count}</div>
                </div>
                <div block="stat">
                    <div block="stat" elem="title">Highscore</div>
                    <div block="stat" elem="value">{props.highscore}</div>
                </div>
            </React.Fragment>
        );
    }

    return (
        <div block="menu">
            {getStats()}

            <div
                block="action"
                mods={{highlight: !isGameActive}}
                onClick={props.requestStartGame}
            >
                New Game
            </div>
        </div>
    );
}

export default connect(
    (state) => state,
    (dispatch) => {
        return {
            requestStartGame: () => {
                dispatch(requestStartGame());
            }
        }
    }
)(Menu);
