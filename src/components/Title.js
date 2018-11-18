import React from 'react';
import { Link } from 'react-router-dom';
import { range } from 'lodash-es';
import { BOARD_SIZE, TUTORIAL_URL } from '../config';

export default function Title(props) {
    const squares = range(BOARD_SIZE ** 2).map((index) => {
        return (
            <div
                key={index}
                block="board"
                elem="square"
            ></div>
        );
    });

    return (
        <React.Fragment>
            <div block="board">
                <div block="board" elem="title">Quood</div>

                {squares}
            </div>

            <div block="menu">
                <div block="action">
                    <Link to="/play">Play</Link>
                </div>
                <div block="action">
                    <Link to={TUTORIAL_URL}>Tutorial</Link>
                </div>
            </div>
        </React.Fragment>
    );
}
