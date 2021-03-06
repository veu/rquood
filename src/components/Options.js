import React from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import range from 'ramda/src/range';
import { SQUARE_TYPES, IS_KAY_OS, GAME_URL } from '../config';
import { resetHues, changeInputMode, requestStartGame } from '../state/actions';
import HueSlider from './HueSlider';
import { getInputMode } from '../state/selectors';
import { useKaiOsSoftwareKeys } from '../hooks';
import { INPUT_MODE_TOUCH } from '../state/reducers/options';
import BackLink from './BackLink';

function Options({ goBack }) {
    const { refLeft, refRight } = useKaiOsSoftwareKeys();
    const inputMode = useSelector(getInputMode);
    const sliders = range(0, SQUARE_TYPES).map((type) => {
        return <HueSlider key={type} index={type} />
    });

    const dispatch = useDispatch();

    const restart = () => {
        dispatch(requestStartGame());
    };

    return (
        <>
            <div block="menu">
                {!IS_KAY_OS && (
                    <div block="menu" elem="block">
                        <div block="options-headline">Input Mode</div>
                        <button block="action" onClick={() => dispatch(changeInputMode())}>
                            {inputMode === INPUT_MODE_TOUCH ? 'Touch' : 'Click'}
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
            <div block="main-menu">
                <div block="main-menu" elem="action">
                    <BackLink to={GAME_URL} innerRef={refLeft} />
                </div>
                <div block="main-menu" elem="action" mods={{inactive: !IS_KAY_OS}}>
                    SELECT
                </div>
                <div block="main-menu" elem="action">
                    <BackLink to={GAME_URL} innerRef={refRight} onClick={restart}>
                        Restart
                    </BackLink>
                </div>
            </div>
        </>
    );
}

export default connect(null, { goBack })(Options);
