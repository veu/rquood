import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHues } from '../state/selectors';
import { changeHue } from '../state/actions';
import { DraggingOverlay } from './DraggingOverlay';

export default function Slider({index}) {
    const hues = useSelector(getHues);
    const hue = hues[index];
    const dispatch = useDispatch();

    function onDragUpdate(_, end) {
        dispatch(changeHue(index, end.x * 360 | 0));
    }

    return (
        <div block="slider">
            <div block="slider" elem="square">
                <div
                    block="square"
                    mods={{type: index}}
                    style={{filter: `hue-rotate(${hue}deg)`}}>
                </div>
            </div>
            <div block="slider" elem="bar-border">
                <DraggingOverlay
                    onDragUpdate={onDragUpdate}
                    onDragAbort={() => {}}
                    onDragEnd={() => {}}
                    isLocked={false}
                />
                <div block="slider" elem="bar"
                style={{width: `${hue / 3.6}%`}}>
                </div>
            </div>
        </div>
    );
}
