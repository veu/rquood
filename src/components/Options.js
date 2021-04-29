import React, { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import range from 'ramda/src/range';
import { SQUARE_TYPES, GAME_URL } from '../config';
import { changeHue, resetHues, requestStartGame } from '../state/actions';
import { getHues } from '../state/selectors';
import BottomMenu from './BottomMenu';
import HueSlider from './HueSlider';
import { useDPad } from '../hooks';

function Options({ goBack }) {
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

    const sliders = range(0, SQUARE_TYPES).map((type) => {
        return <HueSlider key={type} index={type} cursor={cursor} />;
    });

    const restart = () => {
        dispatch(requestStartGame());
    };

    return (<>
        <header>
            <h1>
                Options
            </h1>
        </header>
        <main>
            <div block="menu">
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
        </main>
        <footer>
            <BottomMenu
                left={{text: 'Back', url: GAME_URL, back: true}}
                center={{
                    text: 'SELECT',
                    onClick: () => {
                        if (cursor === 3) {
                            dispatch(resetHues());
                        }
                    }
                }}
                right={{text: 'Restart', url: GAME_URL, back: true, onClick: restart}}
            />
        </footer>
    </>);
}

export default connect(null, { goBack })(Options);
