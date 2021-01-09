import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHues } from '../state/selectors';
import { changeHue } from '../state/actions';
import ClickOverlay from './ClickOverlay';

export default function HueSlider({index}) {
    const hues = useSelector(getHues);
    const hue = hues[index];
    const dispatch = useDispatch();
    const style = {
        filter: `hue-rotate(${hue}deg)`
    };

    function onClick(pos) {
        dispatch(changeHue(index, pos.x * 360 | 0));
    }

    return (
        <div block="slider">
            <div block="slider" elem="square">
                <div block="square" mods={{type: index}} style={style}></div>
            </div>
            <div block="slider" elem="bar-border">
                <ClickOverlay onClick={onClick} />
                <div block="slider" elem="bar"
                style={{width: `${hue / 3.6}%`}}>
                </div>
            </div>
        </div>
    );
}
