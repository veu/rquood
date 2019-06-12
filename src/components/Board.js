import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import range from 'ramda/src/range';
import { updateSelection, hideSelection, discardSelection } from '../state/actions';
import { isBoardLocked as getIsBoardLocked, getBoard } from '../state/selectors';
import { BOARD_SIZE } from '../config';
import Square from './Square';
import { GridDraggingOverlay } from './GridDraggingOverlay';

export default function Board() {
    const board = useSelector(getBoard);
    const isBoardLocked = useSelector(getIsBoardLocked);
    const dispatch = useDispatch();

    const squares = range(0, BOARD_SIZE ** 2).map((index) => {
        return (
            <Square
                key={index}
                index={index}
            />
        );
    });

    function handleDragUpdate(start, end) {
        dispatch(updateSelection(board, start, end));
    }

    return (
        <div block="board">
            <GridDraggingOverlay
                gridSize={BOARD_SIZE}
                onDragEnd={() => dispatch(hideSelection())}
                onDragUpdate={handleDragUpdate}
                onDragAbort={() => dispatch(discardSelection())}
                isLocked={isBoardLocked}
            />

            {squares}
        </div>
    );
}
