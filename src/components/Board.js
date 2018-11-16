import React from 'react';
import { connect } from 'react-redux';
import { updateSelection, hideSelection } from '../reducers';
import { BOARD_SIZE } from '../config';
import {DraggingOverlay} from './DraggingOverlay';
import Square from './Square';

function Board(props) {
    const squares = props.board.map((value, index) => {

        return (
            <Square
                key={index}
                index={index}
            />
        );
    });

    function handleDragUpdate(start, end) {
        props.updateSelection(start && {
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
                isLocked={props.selection.hidden}
            />

            {squares}

        </div>
    );
}

export default connect(
    (state) => state,
    (dispatch) => {
        return {
            hideSelection: () => {
                dispatch(hideSelection());
            },
            updateSelection: (diagonal) => {
                dispatch(updateSelection(diagonal));
            }
        }
    }
)(Board);
