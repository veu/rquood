import range from 'ramda/src/range';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import {
    GAME_URL,
    TUTORIAL_URL,
    KEY_SOFT_LEFT,
    KEY_SOFT_RIGHT,
    BOARD_HEIGHT,
    BOARD_WIDTH,
    OPTIONS_URL
} from '../config';

function Title({ push }) {
    useEffect(() => {
        window.onkeydown = (event) => {
            if (event.key === KEY_SOFT_LEFT) {
                push(GAME_URL);
            }
            if (event.key === KEY_SOFT_RIGHT) {
                push(TUTORIAL_URL);
            }
        };

        return () => {
            window.onkeydown = null;
        };
    });

    const squares = range(0, BOARD_HEIGHT * BOARD_WIDTH).map((index) => {
        return (
            <div block="board" elem="square" key={index}>
                <div
                    block="square"
                    mods={{type: 1}}
                ></div>
            </div>
        );
    });

    return (<>
        <div block="board">
            <div block="board" elem="title">Quood</div>

            {squares}
        </div>

        <div block="menu" mods={{main: true}}>
            <div block="action">
                <Link to={GAME_URL}>Play</Link>
            </div>
            <div block="action">
                <Link to={OPTIONS_URL}>Options</Link>
            </div>
            <div block="action">
                <Link to={TUTORIAL_URL}>Tutorial</Link>
            </div>
        </div>
    </>);
}

export default connect(null, { push })(Title);
