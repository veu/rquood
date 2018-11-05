import React from 'react';
import { useRandomBucket } from '../hooks/useRandomBucket';
import Board from './Board';
import Title from './Title';
import { BOARD_SIZE, SQUARE_TYPES } from '../config';

export default function Game(props) {
    const [getRandomType, getRandomTypes] = useRandomBucket(0, SQUARE_TYPES);

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
                    props.replaceSquares(
                        [...Array(4)].map(() => getRandomType())
                    );
                }}
                updateSelection={props.updateSelection}
            />
        );
    })();

    return (
        <div>
            {top}
            <div block="stats">
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
            </div>
            <div block="actions">
                <div
                    block="actions"
                    elem="start"
                    mods={{highlight: !props.board}}
                    onClick={() => props.startGame(getRandomTypes(BOARD_SIZE ** 2))}
                >
                    New Game
                </div>
            </div>
        </div>
    );
}
