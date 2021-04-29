import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import range from 'ramda/src/range';
import { updateSelection, hideSelection, discardSelection } from '../state/actions';
import {
    isBoardLocked as getIsBoardLocked,
    getBoard,
    getHeight,
    getWidth
} from '../state/selectors';
import { useClick, useDPad } from '../hooks';
import Square from './Square';

export default function Board() {
    const dispatch = useDispatch();
    const board = useSelector(getBoard);
    const isBoardLocked = useSelector(getIsBoardLocked);
    const height = useSelector(getHeight);
    const width = useSelector(getWidth);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [cursor, setCursor] = useState({
        x: Math.floor(width / 2),
        y: Math.floor(height / 2),
    });
    useEffect(() => {
        setCursor({
            x: Math.floor(width / 2),
            y: Math.floor(height / 2),
        });
    }, [width, height]);


    useDPad((dx, dy) => {
        if (isBoardLocked) {
            return;
        }

        const x = (cursor.x + dx + width) % width;
        const y = (cursor.y + dy + height) % height;

        setCursor({x, y});

        if (start && !(end && x === end.x && y === end.y)) {
            setEnd({x, y});
            dispatch(updateSelection(board, width, start, {x, y}));
        }
    });

    useClick(() => {
        if (isBoardLocked) {
            return;
        }

        if (!start) {
            setStart(cursor);
            setEnd(cursor);
            dispatch(updateSelection(board, width, cursor, cursor))
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

    const squares = range(0, height * width).map((index) => {
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
        <div block="board">
            {squares}
        </div>
    );
}
