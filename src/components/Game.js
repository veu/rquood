import React from 'react';
import { useRandomBucket } from '../hooks/useRandomBucket';
import Board from './Board';
import Title from './Title';

const BOARD_SIZE = 7;
const COLORS = 3;

function isCoordinateValid(c) {
    return 0 <= c && c < BOARD_SIZE && c % 1 === 0;
}

function getSelection(board, diagonal) {
    if (diagonal === null) {
        return {squares: [], size: 0};
    }

    const start = diagonal.start.x + diagonal.start.y * BOARD_SIZE;
    const end = diagonal.end.x + diagonal.end.y * BOARD_SIZE;

    if (start === end) {
        return {squares: [start], size: 0};
    }

    const a = {x: start % BOARD_SIZE, y: start / BOARD_SIZE | 0};
    const b = {x: end % BOARD_SIZE, y: end / BOARD_SIZE | 0};
    const center = {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const diff = {x: center.x - a.x, y: center.y - a.y};
    const selection = {squares: [start], size: 2 * Math.hypot(diff.x, diff.y)};

    if (board[start] === board[end]) {
        selection.squares.push(end);
    }

    const c = {x: center.x + diff.y, y: center.y - diff.x};
    const cIndex = c.x + c.y * BOARD_SIZE;

    if (isCoordinateValid(c.x) && isCoordinateValid(c.y) && board[cIndex] === board[start]) {
        selection.squares.push(cIndex);
    }

    const d = {x: center.x - diff.y, y: center.y + diff.x};
    const dIndex = d.x + d.y * BOARD_SIZE;

    if (isCoordinateValid(d.x) && isCoordinateValid(d.y) && board[dIndex] === board[start]) {
        selection.squares.push(dIndex);
    }

    return selection;
}

export default function Game(props) {

    const [getRandomType, getRandomTypes] = useRandomBucket(0, COLORS);

    let top = (() => {
        if (props.board === null) {
            return <Title />;
        }

        return (
            <Board
                board={props.board}
                gridSize={BOARD_SIZE}
                getSelection={(diagonal) => getSelection(props.board, diagonal)}
                replaceSquares={(indexes, size) => {
                    props.replaceSquares(
                        indexes.map((index) => ({
                            index,
                            value: getRandomType(),
                        })),
                        size,
                        props.board[indexes[0]]
                    );
                }}
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
