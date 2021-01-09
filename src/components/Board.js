import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import range from 'ramda/src/range';
import { updateSelection, hideSelection, discardSelection } from '../state/actions';
import { isBoardLocked as getIsBoardLocked, getBoard } from '../state/selectors';
import { BOARD_WIDTH, BOARD_HEIGHT_TUTORIAL, BOARD_HEIGHT } from '../config';
import Square from './Square';
import GridClickOverlay from './GridClickOverlay';

export default function Board({ isTutorial = false }) {
    const board = useSelector(getBoard);
    const isBoardLocked = useSelector(getIsBoardLocked);
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
            <GridClickOverlay
                gridWidth={BOARD_WIDTH}
                gridHeight={height}
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
