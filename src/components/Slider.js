import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { getHues } from '../selectors';
import { changeHue } from '../actions';
import { DraggingOverlay } from './DraggingOverlay';

function Slider(props) {
    const ref = useRef();

    const hue = props.hues[props.index];

    function onDragUpdate(_, end) {
        props.changeHue(props.index, end.x * 360 | 0);
    }

    return (
        <div block="slider">
            <div block="slider" elem="square">
                <div
                    block="square"
                    mods={{type: props.index}}
                    style={{filter: `hue-rotate(${hue}deg)`}}>
                </div>
            </div>
            <div block="slider" elem="bar-border"
                onPointerDown={(event) => changeHue(event) }
                ref={ref}
            >
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

export default connect(
    (state) => ({
        hues: getHues(state),
    }),
    (dispatch) => {
        return {
            changeHue: (index, hue) => {
                dispatch(changeHue(index, hue));
            }
        }
    }
)(Slider);
