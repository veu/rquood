import React from 'react';
import { connect } from 'react-redux';
import { updateSelection, hideSelection } from '../actions';
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
        props.updateSelection(props.board, start && {
            start,
            end,
        });
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
            updateSelection: (board, diagonal) => {
                dispatch(updateSelection(board, diagonal));
            }
        }
    }
)(Board);
