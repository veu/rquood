import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import range from 'ramda/src/range';
import { Link } from 'react-router-dom';
import { SQUARE_TYPES, TITLE_URL, IS_KAY_OS } from '../config';
import { resetHues, changeInputMode } from '../state/actions';
import HueSlider from './HueSlider';
import { getInputMode } from '../state/selectors';

export default function Options() {
    const inputMode = useSelector(getInputMode);
    const sliders = range(0, SQUARE_TYPES).map((type) => {
        return <HueSlider key={type} index={type} />
    });

    const dispatch = useDispatch();

    return (
        <div block="menu">
            {!IS_KAY_OS && (
                <div block="menu" elem="block">
                    <div block="options-headline">Input Mode</div>
                    <button block="action" onClick={() => dispatch(changeInputMode())}>
                        {inputMode}
                    </button>
                </div>
            )}
            <div block="menu" elem="block">
                <div block="options-headline">Square Colors</div>
                {sliders}
                <button block="action" onClick={() => dispatch(resetHues())}>
                    Reset
                </button>
            </div>
            <div block="action">
                <Link to={TITLE_URL}>Back</Link>
            </div>
        </div>
    );
}
