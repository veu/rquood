import React from 'react';
import { connect } from 'react-redux';
import { makeGetSquare, getHues } from '../selectors';

function Square(props) {
    return (
        <div
            block="square"
            mods={props.square}
            style={{filter: `hue-rotate(${props.hues[props.square.type]}deg)`}}>
        </div>
    );
}

export default connect(
    () => {
        const getSquare = makeGetSquare();

        return (state, props) => ({
            hues: getHues(state),
            square: getSquare(state, props),
        });
    }
)(Square);
