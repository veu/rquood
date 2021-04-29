import range from 'ramda/src/range';
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    ABOUT_URL,
    GAME_URL,
    TUTORIAL_URL,
    BOARD_HEIGHT,
    BOARD_WIDTH
} from '../config';
import { useSelector } from 'react-redux';
import { getHues } from '../state/selectors';
import BottomMenu from './BottomMenu';

function Title() {
    const history = useHistory();
    const hues = useSelector(getHues);

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
                ></div>
            </div>
        );
    });

    return (<>
        <main>
            <div block="board" mods={{ title: true }}>
                <div block="board" elem="title">Quood</div>
                {squares}
            </div>
        </main>
        <footer>
            <BottomMenu
                left={{text: 'About', url: ABOUT_URL}}
                center={{text: 'START', onClick: () => { history.push(GAME_URL) } }}
                right={{text: 'Tutorial', url: TUTORIAL_URL}}
            />
        </footer>
    </>);
}

export default Title;
