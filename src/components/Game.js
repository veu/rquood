import React from 'react';
import Board from './Board';
import Title from './Title';
import { BOARD_SIZE } from '../config';
import Menu from './Menu';

export default function Game(props) {
    let top = (() => {
        if (props.board === null) {
            return <Title />;
        }

        return (
            <Board
                board={props.board}
                selection={props.selection}
                gridSize={BOARD_SIZE}
                hideSelection={props.hideSelection}
                updateSelection={props.updateSelection}
            />
        );
    })();

    return (
        <React.Fragment>
            {top}

            <Menu
                score={props.score}
                streak={props.streak}
                highscore={props.highscore}
                isGameActive={!!props.board}
                startGame={props.requestStartGame}
            />
        </React.Fragment>
    );
}
