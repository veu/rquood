import React from 'react';
import { connect } from 'react-redux';
import range from 'ramda/src/range';
import { Link } from 'react-router-dom';
import { SQUARE_TYPES, TITLE_URL } from '../config';
import { resetHues } from '../state/actions';
import Slider from './Slider';

function Options(props) {
    const sliders = range(0, SQUARE_TYPES).map((type) => {
        return <Slider key={type} index={type} />
    });

    return (
        <div block="menu">
            <div block="menu" elem="block">
                <div block="options-headline">Square Colors</div>
                {sliders}
                <div block="action" onClick={() => props.resetHues()}>
                    Reset
                </div>
            </div>
            <div block="action">
                <Link to={TITLE_URL}>Back</Link>
            </div>
        </div>
    );
}

export default connect(
    () => ({}),
    (dispatch) => {
        return {
            resetHues: () => {
                dispatch(resetHues());
            }
        }
    }
)(Options);
