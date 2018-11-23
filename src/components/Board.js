import React from 'react';
import { connect } from 'react-redux';
import { updateSelection, hideSelection, discardSelection } from '../actions';
import { BOARD_SIZE } from '../config';
import {DraggingOverlay} from './DraggingOverlay';
import Square from './Square';
import { range } from 'lodash-es';
import { isBoardLocked, getBoard } from '../selectors';

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
        if (start) {
            props.updateSelection(props.board, start, end)
        } else {
            props.discardSelection();
        }
    }

    return (
        <div block="board">
            <DraggingOverlay
                gridSize={BOARD_SIZE}
                onDragEnd={props.hideSelection}
                onDragUpdate={handleDragUpdate}
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
