import React from 'react';

export default function Menu(props) {
    function getStats() {
        if (!props.isGameActive) {
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
                mods={{highlight: !props.isGameActive}}
                onClick={props.startGame}
            >
                New Game
            </div>
        </div>
    );
}
