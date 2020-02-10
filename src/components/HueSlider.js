import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHues, getInputMode } from '../state/selectors';
import { changeHue } from '../state/actions';
import { DraggingOverlay } from './DraggingOverlay';
import { INPUT_MODE_TOUCH, INPUT_MODE_CLICK } from '../state/reducers/options';
import ClickOverlay from './ClickOverlay';

export default function HueSlider({index}) {
    const hues = useSelector(getHues);
    const hue = hues[index];
    const dispatch = useDispatch();
    const inputMode = useSelector(getInputMode);
    const style = {
        filter: `hue-rotate(${hue}deg)`
    };

    function onDragUpdate(_, end) {
        dispatch(changeHue(index, end.x * 360 | 0));
    }

    function onClick(pos) {
        dispatch(changeHue(index, pos.x * 360 | 0));
    }

    return (
        <div block="slider">
            <div block="slider" elem="square">
                <div block="square" mods={{type: index}} style={style}></div>
            </div>
            <div block="slider" elem="bar-border">
                {inputMode === INPUT_MODE_TOUCH && <DraggingOverlay
                    onDragUpdate={onDragUpdate}
                />}
                {inputMode === INPUT_MODE_CLICK && <ClickOverlay
                    onClick={onClick}
                />}
                <div block="slider" elem="bar"
                style={{width: `${hue / 3.6}%`}}>
                </div>
            </div>
        </div>
    );
}
