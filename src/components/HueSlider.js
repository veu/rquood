import React from 'react';
import { useSelector } from 'react-redux';
import { getHues } from '../state/selectors';

export default function HueSlider({cursor, index}) {
    const hues = useSelector(getHues);
    let hue = hues[index];
    const style = {
        filter: `hue-rotate(${hue}deg)`
    };

    return (
        <div block="slider" mods={{active: index === cursor}}>
            <div block="slider" elem="square">
                <div block="square" mods={{type: index}} style={style}></div>
            </div>
            <div block="slider" elem="bar">
                <div block="slider" elem="value"
                    style={{width: `${hue / 3.6}%`}}>
                </div>
            </div>
        </div>
    );
}
