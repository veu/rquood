import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import range from 'ramda/src/range';
import { SQUARE_TYPES, IS_KAY_OS, KEY_SOFT_LEFT } from '../config';
import { resetHues, changeInputMode } from '../state/actions';
import HueSlider from './HueSlider';
import { getInputMode } from '../state/selectors';

function Options({ goBack }) {
    useEffect(() => {
        window.onkeydown = (event) => {
            if (event.key === KEY_SOFT_LEFT) {
                window.history.back();
            }
        };

        return () => {
            window.onkeydown = null;
        };
    });

    const inputMode = useSelector(getInputMode);
    const sliders = range(0, SQUARE_TYPES).map((type) => {
        return <HueSlider key={type} index={type} />
    });

    const dispatch = useDispatch();

    return (
        <>
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
            </div>
            <div block="menu" mods={{main: true}}>
                <div block="action" onClick={() => goBack()}>
                    Back
                </div>
            </div>
        </>
    );
}

export default connect(null, { goBack })(Options);
