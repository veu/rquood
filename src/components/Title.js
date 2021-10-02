import range from "ramda/src/range";
import React from "react";
import { Link } from "react-router-dom";
import { GAME_URL, TUTORIAL_URL, BOARD_HEIGHT, BOARD_WIDTH } from "../config";
import { getHues } from "../state/selectors";
import { useStore } from "../state/store";

function Title() {
  const hues = useStore(getHues);
  const squareStyle = {
    filter: `hue-rotate(${hues[1]}deg)`,
  };

  const squares = range(0, BOARD_HEIGHT * BOARD_WIDTH).map((index) => {
    return (
      <div className="board__square" key={index}>
        <div className="square square_type_1" style={squareStyle} />
      </div>
    );
  });

  return (
    <>
      <div className="board board_title">
        <div className="board__title">Quood</div>

        {squares}
      </div>

      <div className="main-menu">
        <div className="main-menu__action">
          <Link to={GAME_URL}>Play</Link>
        </div>
        <div className="main-menu__action">
          <Link to={TUTORIAL_URL}>Tutorial</Link>
        </div>
      </div>
    </>
  );
}

export default Title;
