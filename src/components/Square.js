import React from 'react';
import { connect } from 'react-redux';
import { makeGetSquare } from '../selectors';

function Square(props) {
    return (
        <div
            block="board"
            elem="square"
            mods={props.square}>
        </div>
    );
}

export default connect(
    () => {
        const getSquare = makeGetSquare();

        return (state, props) => ({
            square: getSquare(state, props),
        });
    }
)(Square);
