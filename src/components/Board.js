import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import range from 'ramda/src/range';
import { updateSelection, hideSelection, discardSelection } from '../state/actions';
import { isBoardLocked as getIsBoardLocked, getBoard } from '../state/selectors';
import { BOARD_WIDTH, BOARD_HEIGHT_TUTORIAL, BOARD_HEIGHT } from '../config';
import { useClick, useDPad } from '../hooks';
import Square from './Square';

export default function Board({ isTutorial = false }) {
    const dispatch = useDispatch();
    const board = useSelector(getBoard);
    const isBoardLocked = useSelector(getIsBoardLocked);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [cursor, setCursor] = useState({x: 3, y: 3});

    useDPad((dx, dy) => {
        if (isBoardLocked) {
            return;
        }

        const x = (cursor.x + dx + 7) % 7;
        const y = (cursor.y + dy + 7) % 7;

        setCursor({x, y});

        if (start && !(end && x === end.x && y === end.y)) {
            setEnd({x, y});
            dispatch(updateSelection(board, start, {x, y}));
        }
    });

    useClick(() => {
        if (isBoardLocked) {
            return;
        }

        if (!start) {
            setStart(cursor);
            setEnd(cursor);
            dispatch(updateSelection(board, cursor, cursor))
        } else if (cursor.x === start.x && cursor.y === start.y) {
            setStart(null);
            setEnd(null);
            dispatch(discardSelection());
        } else {
            setStart(null);
            setEnd(null);
            dispatch(hideSelection())
        }
    });

    const height = isTutorial ? BOARD_HEIGHT_TUTORIAL : BOARD_HEIGHT;

    const squares = range(0, height * BOARD_WIDTH).map((index) => {
        return (
            <div block="board" elem="square" key={index}>
                <Square
                    cursor={cursor}
                    index={index}
                />
            </div>
        );
    });

    return (
        <div
            block="board"
            mods={{ tutorial: isTutorial }}
        >
            {squares}
        </div>
    );
}
