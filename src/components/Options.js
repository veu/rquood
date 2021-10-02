import React from 'react';
import range from 'ramda/src/range';
import { SQUARE_TYPES, GAME_URL } from '../config';
import HueSlider from './HueSlider';
import { getInputMode } from '../state/selectors';
import { INPUT_MODE_TOUCH } from '../state/reducers/options';
import BackLink from './BackLink';
import {useStore} from "../state/store";

function Options() {
    const { changeInputMode, inputMode, startGame, resetHues } = useStore(state => ({
        changeInputMode: state.changeInputMode,
        inputMode: getInputMode(state),
        startGame: state.startGame,
        resetHues: state.resetHues,
    }));
    const sliders = range(0, SQUARE_TYPES).map((type) => {
        return <HueSlider key={type} index={type} />
    });

    return (
        <>
            <div block="menu">
                <div block="menu" elem="block">
                    <div block="options-headline">Input Mode</div>
                    <button block="action" onClick={() => changeInputMode()}>
                        {inputMode === INPUT_MODE_TOUCH ? 'Touch' : 'Click'}
                    </button>
                </div>
                <div block="menu" elem="block">
                    <div block="options-headline">Square Colors</div>
                    {sliders}
                    <button block="action" onClick={() => resetHues()}>
                        Reset
                    </button>
                </div>
            </div>
            <div block="main-menu">
                <div block="main-menu" elem="action">
                    <BackLink to={GAME_URL} />
                </div>
                <div block="main-menu" elem="action">
                    <BackLink to={GAME_URL} onClick={() => startGame()}>
                        Restart
                    </BackLink>
                </div>
            </div>
        </>
    );
}

export default Options;
