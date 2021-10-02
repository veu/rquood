import React, { useEffect } from "react";
import Board from "./Board";
import { TITLE_URL } from "../config";
import BackLink from "./BackLink";
import { useStore } from "../state/store";
import { getTutorialMessage } from "../state/selectors";

function Tutorial() {
  const [endTutorial, message, resetSelection, startTutorial] = useStore(
    (state) => [
      state.endTutorial,
      getTutorialMessage(state),
      state.resetSelection,
      state.startTutorial,
    ]
  );

  useEffect(() => {
    startTutorial();
    resetSelection();
    return endTutorial;
  }, [endTutorial, resetSelection, startTutorial]);

  return (
    <>
      <Board isTutorial={true} />
      <div className="menu">
        <div className="message">{message}</div>
      </div>
      <div className="main-menu">
        <div className="main-menu__action">
          <BackLink to={TITLE_URL} />
        </div>
        <div className="main-menu__action main-menu__action_inactive" />
      </div>
    </>
  );
}

export default Tutorial;
