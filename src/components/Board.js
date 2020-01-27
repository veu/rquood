import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import range from 'ramda/src/range';
import { updateSelection, hideSelection, discardSelection } from '../state/actions';
import { isBoardLocked as getIsBoardLocked, getBoard, getInputMode } from '../state/selectors';
import { BOARD_SIZE } from '../config';
import Square from './Square';
import { GridDraggingOverlay } from './GridDraggingOverlay';
import { INPUT_MODE_TOUCH, INPUT_MODE_CLICK } from '../state/reducers/options';
import GridClickOverlay from './GridClickOverlay';

export default function Board() {
    const board = useSelector(getBoard);
    const isBoardLocked = useSelector(getIsBoardLocked);
    const inputMode = useSelector(getInputMode);
    const dispatch = useDispatch();

    const squares = range(0, BOARD_SIZE ** 2).map((index) => {
        return (
            <div block="board" elem="square" key={index}>
                <Square
                    index={index}
                />
            </div>
        );
    });

    return (
        <div block="board">
            <GridDraggingOverlay
                active={inputMode === INPUT_MODE_TOUCH}
                gridSize={BOARD_SIZE}
                onDragEnd={() => dispatch(hideSelection())}
                onDragUpdate={(start, end) => dispatch(updateSelection(board, start, end))}
                onDragAbort={() => dispatch(discardSelection())}
                isLocked={isBoardLocked}
            />
            <GridClickOverlay
                active={inputMode === INPUT_MODE_CLICK}
                gridSize={BOARD_SIZE}
                onDragEnd={() => dispatch(hideSelection())}
                onDragUpdate={(start, end) => dispatch(updateSelection(board, start, end))}
                onDragAbort={() => dispatch(discardSelection())}
                isLocked={isBoardLocked}
            >
            </GridClickOverlay>

            {squares}
        </div>
    );
}
