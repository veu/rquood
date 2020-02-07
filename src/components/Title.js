import range from 'ramda/src/range';
import React from 'react';
import { Link } from 'react-router-dom';
import {
    GAME_URL,
    TUTORIAL_URL,
    BOARD_HEIGHT,
    BOARD_WIDTH,
    OPTIONS_URL
} from '../config';
import { useKaiOsSoftwareKeys } from '../hooks';

function Title() {
    const { refLeft, refRight } = useKaiOsSoftwareKeys();

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
        <div block="board" mods={{ title: true }}>
            <div block="board" elem="title">Quood</div>

            {squares}
        </div>

        <div block="menu" mods={{main: true}}>
            <div block="action">
                <Link to={GAME_URL} innerRef={refLeft}>Play</Link>
            </div>
            <div block="action">
                <Link to={OPTIONS_URL}>Options</Link>
            </div>
            <div block="action">
                <Link to={TUTORIAL_URL} innerRef={refRight}>Tutorial</Link>
            </div>
        </div>
    </>);
}

export default Title;
