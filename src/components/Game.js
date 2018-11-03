import React from 'react';
import { useRandomBucket } from '../hooks/useRandomBucket';
import Board from './Board';
import Title from './Title';

const BOARD_SIZE = 7;
const COLORS = 3;

export default function Game(props) {
    const [getRandomType, getRandomTypes] = useRandomBucket(0, COLORS);

    let top = (() => {
        if (props.board === null) {
            return <Title />;
        }

        return (
            <Board
                board={props.board}
                replaceSquares={(indexes, size) => {
                    props.replaceSquares(indexes.map((index) => ({index, value: getRandomType()})), size);
                }}
            />
        );
    })();

    return (
        <div>
            {top}
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
            <div block="stat">
                <div block="stat" elem="title">Score</div>
                <div block="stat" elem="value">{props.score}</div>
            </div>
        </div>
    );
}
