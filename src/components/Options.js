import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import range from 'ramda/src/range';
import { SQUARE_TYPES, GAME_URL } from '../config';
import { resetHues, requestStartGame } from '../state/actions';
import HueSlider from './HueSlider';
import { useKaiOsSoftwareKeys } from '../hooks';
import BackLink from './BackLink';

function Options({ goBack }) {
    const { refLeft, refRight } = useKaiOsSoftwareKeys();
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
                <div block="main-menu" elem="action">
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
