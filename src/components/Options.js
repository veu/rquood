import React, { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import range from 'ramda/src/range';
import { SQUARE_TYPES, GAME_URL } from '../config';
import { changeHue, resetHues, requestStartGame } from '../state/actions';
import { getHues } from '../state/selectors';
import HueSlider from './HueSlider';
import { useClick, useDPad, useKaiOsSoftwareKeys } from '../hooks';
import BackLink from './BackLink';

function Options({ goBack }) {
    const {refLeft, refRight} = useKaiOsSoftwareKeys();
    const [cursor, setCursor] = useState(0);
    const dispatch = useDispatch();
    const hues = useSelector(getHues);

    useDPad((dx, dy) => {
       if (dy) {
           setCursor((cursor + dy + 4) % 4);
       } else if (cursor < 3) {
           const hue = Math.max(0, Math.min(360, hues[cursor] + dx * 30));
           dispatch(changeHue(cursor, hue));
       }
    });

    useClick(() => {
        if (cursor === 3) {
            dispatch(resetHues());
        }
    });

    const sliders = range(0, SQUARE_TYPES).map((type) => {
        return <HueSlider key={type} index={type} cursor={cursor} />;
    });

    const restart = () => {
        dispatch(requestStartGame());
    };

    return (
        <>
            <div block="menu">
                <div block="menu" elem="title">
                    Options
                </div>
                <div block="menu" elem="block">
                    <div block="options-headline">Square Colors</div>
                    {sliders}
                    <button
                        block="action"
                        mods={{active: cursor === 3}}
                    >
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
