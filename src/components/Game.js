import React from 'react';
import { useRandomBucket } from '../hooks/useRandomBucket';
import Board from './Board';
import Title from './Title';
import { BOARD_SIZE, SQUARE_TYPES } from '../config';
import Menu from './Menu';

export default function Game(props) {
    const getRandomTypes = useRandomBucket(0, SQUARE_TYPES);

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
                replaceSquares={() => {
                    props.replaceSquares(getRandomTypes(4));
                }}
                updateSelection={props.updateSelection}
            />
        );
    })();

    return (
        <div>
            {top}
            <Menu
                score={props.score}
                streak={props.streak}
                highscore={props.highscore}
                isGameActive={!!props.board}
                startGame={() => props.startGame(getRandomTypes(BOARD_SIZE ** 2))}
            />
        </div>
    );
}
