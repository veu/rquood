import React from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import range from 'ramda/src/range';
import { SQUARE_TYPES, IS_KAY_OS } from '../config';
import { resetHues, changeInputMode } from '../state/actions';
import HueSlider from './HueSlider';
import { getInputMode } from '../state/selectors';
import { useKaiOsSoftwareKeys } from '../hooks';

function Options({ goBack }) {
    const { refLeft } = useKaiOsSoftwareKeys();
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
                <div
                    block="action"
                    onClick={() => goBack()}
                    ref={refLeft}
                >
                    Back
                </div>
            </div>
        </>
    );
}

export default connect(null, { goBack })(Options);
