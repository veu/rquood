import React from 'react';
import { connect } from 'react-redux';
import { range } from 'lodash-es';
import { updateSelection, hideSelection, discardSelection } from '../state/actions';
import { isBoardLocked, getBoard } from '../state/selectors';
import { BOARD_SIZE } from '../config';
import Square from './Square';
import { GridDraggingOverlay } from './GridDraggingOverlay';

function Board(props) {
    const squares = range(BOARD_SIZE ** 2).map((index) => {
        return (
            <Square
                key={index}
                index={index}
            />
        );
    });

    function handleDragUpdate(start, end) {
        props.updateSelection(props.board, start, end);
    }

    return (
        <div block="board">
            <GridDraggingOverlay
                gridSize={BOARD_SIZE}
                onDragEnd={props.hideSelection}
                onDragUpdate={handleDragUpdate}
                onDragAbort={props.discardSelection}
                isLocked={props.isBoardLocked}
            />

            {squares}

        </div>
    );
}

export default connect(
    (state) => ({
        board: getBoard(state),
        isBoardLocked: isBoardLocked(state)
    }),
    (dispatch) => {
        return {
            hideSelection: () => {
                dispatch(hideSelection());
            },
            updateSelection: (board, start, end) => {
                dispatch(updateSelection(board, start, end));
            },
            discardSelection: () => {
                dispatch(discardSelection());
            }
        }
    }
)(Board);
