import range from 'ramda/src/range';
import React from 'react';
import { Link } from 'react-router-dom';
import { BOARD_SIZE, OPTIONS_URL, TUTORIAL_URL } from '../config';

export default function Title(props) {
    const squares = range(0, BOARD_SIZE ** 2).map((index) => {
        return (
            <div
                key={index}
                block="square"
            ></div>
        );
    });

    return (
        <React.Fragment>
            <div block="board">
                <div block="board" elem="title">Quood</div>

                {squares}
            </div>

            <div block="menu" mods={{small: true}}>
                <div block="action">
                    <Link to="/play">Play</Link>
                </div>
                <div block="action">
                    <Link to={OPTIONS_URL}>Options</Link>
                </div>
                <div block="action">
                    <Link to={TUTORIAL_URL}>Tutorial</Link>
                </div>
            </div>
        </React.Fragment>
    );
}
