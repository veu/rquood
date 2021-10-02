import React from "react";
import range from "ramda/src/range";
import {
  isBoardLocked as getIsBoardLocked,
  getInputMode,
} from "../state/selectors";
import { BOARD_WIDTH, BOARD_HEIGHT_TUTORIAL, BOARD_HEIGHT } from "../config";
import Square from "./Square";
import { GridDraggingOverlay } from "./GridDraggingOverlay";
import { INPUT_MODE_TOUCH, INPUT_MODE_CLICK } from "../state/reducers/options";
import GridClickOverlay from "./GridClickOverlay";
import { useStore } from "../state/store";

export default function Board({ isTutorial = false }) {
  const { discardSelection, isBoardLocked, inputMode, match, updateSelection } =
    useStore((state) => ({
      discardSelection: state.discardSelection,
      isBoardLocked: getIsBoardLocked(state),
      inputMode: getInputMode(state),
      match: state.match,
      updateSelection: state.updateSelection,
    }));
  const height = isTutorial ? BOARD_HEIGHT_TUTORIAL : BOARD_HEIGHT;

  const squares = range(0, height * BOARD_WIDTH).map((index) => {
    return (
      <div className="board__square" key={index}>
        <Square index={index} isTutorial={isTutorial} />
      </div>
    );
  });

  return (
    <div className="board">
      {inputMode === INPUT_MODE_TOUCH && (
        <GridDraggingOverlay
          gridWidth={BOARD_WIDTH}
          gridHeight={height}
          onDragEnd={() => match(isTutorial)}
          onDragUpdate={(start, end) => updateSelection(start, end)}
          onDragAbort={() => discardSelection()}
          isLocked={isBoardLocked}
        />
      )}
      {inputMode === INPUT_MODE_CLICK && (
        <GridClickOverlay
          gridWidth={BOARD_WIDTH}
          gridHeight={height}
          onDragEnd={() => match(isTutorial)}
          onDragUpdate={(start, end) => updateSelection(start, end)}
          onDragAbort={() => discardSelection()}
          isLocked={isBoardLocked}
        ></GridClickOverlay>
      )}

      {squares}
    </div>
  );
}
