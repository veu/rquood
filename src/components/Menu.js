import React from "react";
import { Link } from "react-router-dom";
import {
  isGameActive as getIsGameActive,
  getScore,
  getStreakType,
  getStreakCount,
  getHues,
} from "../state/selectors";
import { OPTIONS_URL, TITLE_URL } from "../config";
import BackLink from "./BackLink";
import { useStore } from "../state/store";

function Menu() {
  const { highscore, hues, isGameActive, score, streakCount, streakType } =
    useStore((state) => ({
      highscore: state.highscore,
      hues: getHues(state),
      isGameActive: getIsGameActive(state),
      score: getScore(state),
      streakCount: getStreakCount(state),
      streakType: getStreakType(state),
    }));

  if (!isGameActive) {
    return null;
  }

  const style = {
    filter: `hue-rotate(${hues[streakType]}deg)`,
  };

  function getStats() {
    return (
      <>
        <div className="stat">
          <div className="stat__title">Score</div>
          <div className="stat__value">{score}</div>
        </div>
        <div className="stat">
          <div className="stat__title">Streak</div>
          {streakCount > 0 && (
            <>
              <div className="stat__square">
                <div
                  className={`square square_type_${streakType}`}
                  style={style}
                />
              </div>
              <div className="stat__value">{streakCount}</div>
            </>
          )}
        </div>
        <div className="stat">
          <div className="stat__title">Highscore</div>
          <div className="stat__value">{highscore}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="menu">{getStats()}</div>
      <div className="main-menu">
        <div className="main-menu__action">
          <BackLink to={TITLE_URL} />
        </div>
        <div className="main-menu__action">
          <Link to={OPTIONS_URL}>Options</Link>
        </div>
      </div>
    </>
  );
}

export default Menu;
