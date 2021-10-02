import range from 'ramda/src/range';
import React from 'react';
import { Link } from 'react-router-dom';
import {
    GAME_URL,
    TUTORIAL_URL,
    BOARD_HEIGHT,
    BOARD_WIDTH
} from '../config';
import { getHues } from '../state/selectors';
import { useStore } from "../state/store";

function Title() {
    const hues = useStore(getHues);
    const squareStyle = {
        filter: `hue-rotate(${hues[1]}deg)`
    };

    const squares = range(0, BOARD_HEIGHT * BOARD_WIDTH).map((index) => {
        return (
            <div block="board" elem="square" key={index}>
                <div
                    block="square"
                    mods={{type: 1}}
                    style={squareStyle}
                />
            </div>
        );
    });

    return (<>
        <div block="board" mods={{ title: true }}>
            <div block="board" elem="title">Quood</div>

            {squares}
        </div>

        <div block="main-menu">
            <div block="main-menu" elem="action">
                <Link to={GAME_URL}>Play</Link>
            </div>
            <div block="main-menu" elem="action">
                <Link to={TUTORIAL_URL}>Tutorial</Link>
            </div>
        </div>
    </>);
}

export default Title;
