import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import range from 'ramda/src/range';
import { updateSelection, hideSelection, discardSelection } from '../state/actions';
import { isBoardLocked as getIsBoardLocked, getBoard, getInputMode } from '../state/selectors';
import { BOARD_WIDTH, BOARD_HEIGHT_TUTORIAL, BOARD_HEIGHT } from '../config';
import Square from './Square';
import { GridDraggingOverlay } from './GridDraggingOverlay';
import { INPUT_MODE_TOUCH, INPUT_MODE_CLICK } from '../state/reducers/options';
import GridClickOverlay from './GridClickOverlay';

export default function Board({ isTutorial = false }) {
    const board = useSelector(getBoard);
    const isBoardLocked = useSelector(getIsBoardLocked);
    const inputMode = useSelector(getInputMode);
    const dispatch = useDispatch();

    const height = isTutorial ? BOARD_HEIGHT_TUTORIAL : BOARD_HEIGHT;

    const squares = range(0, height * BOARD_WIDTH).map((index) => {
        return (
            <div block="board" elem="square" key={index}>
                <Square
                    index={index}
                />
            </div>
        );
    });

    return (
        <div block="board" mods={{ tutorial: isTutorial }}>
            {inputMode === INPUT_MODE_TOUCH && <GridDraggingOverlay
                gridWidth={BOARD_WIDTH}
                gridHeight={height}
                onDragEnd={() => dispatch(hideSelection())}
                onDragUpdate={(start, end) => dispatch(updateSelection(board, start, end))}
                onDragAbort={() => dispatch(discardSelection())}
                isLocked={isBoardLocked}
            />}
            {inputMode === INPUT_MODE_CLICK && <GridClickOverlay
                gridWidth={BOARD_WIDTH}
                gridHeight={height}
                onDragEnd={() => dispatch(hideSelection())}
                onDragUpdate={(start, end) => dispatch(updateSelection(board, start, end))}
                onDragAbort={() => dispatch(discardSelection())}
                isLocked={isBoardLocked}
            >
            </GridClickOverlay>}

            {squares}
        </div>
    );
}
