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
        <div className={`slider${index === cursor ? ' slider_active' : ''}`}>
            <div className="slider__square">
                <div className={`square square_type_${index}`} style={style}></div>
            </div>
            <div className="slider__bar">
                <div className="slider__value"
                    style={{width: `${hue / 3.6}%`}}>
                </div>
            </div>
        </div>
    );
}
