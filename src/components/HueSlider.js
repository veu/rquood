import React from "react";
import { getHues, getInputMode } from "../state/selectors";
import { DraggingOverlay } from "./DraggingOverlay";
import { INPUT_MODE_TOUCH, INPUT_MODE_CLICK } from "../state/reducers/options";
import ClickOverlay from "./ClickOverlay";
import { useStore } from "../state/store";

export default function HueSlider({ index }) {
  const { changeHue, hue, inputMode } = useStore((state) => ({
    changeHue: state.changeHue,
    hue: getHues(state)[index],
    inputMode: getInputMode(state),
  }));
  const style = {
    filter: `hue-rotate(${hue}deg)`,
  };

  function onDragUpdate(_, end) {
    changeHue(index, (end.x * 360) | 0);
  }

  function onClick(pos) {
    changeHue(index, (pos.x * 360) | 0);
  }

  return (
    <div className="slider">
      <div className="slider__square">
        <div className={`square square_type_${index}`} style={style} />
      </div>
      <div className="slider__bar-border">
        {inputMode === INPUT_MODE_TOUCH && (
          <DraggingOverlay onDragUpdate={onDragUpdate} />
        )}
        {inputMode === INPUT_MODE_CLICK && <ClickOverlay onClick={onClick} />}
        <div className="slider__bar" style={{ width: `${hue / 3.6}%` }}></div>
      </div>
    </div>
  );
}
