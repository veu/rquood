import React, { useEffect } from "react";
import { isGameActive } from "../state/selectors";
import Board from "./Board";
import Menu from "./Menu";
import { useStore } from "../state/store";

function Game() {
  const { isActive, assureGame, resetSelection } = useStore((state) => ({
    isActive: isGameActive(state),
    assureGame: state.assureGame,
    resetSelection: state.resetSelection,
  }));

  useEffect(() => {
    assureGame();
    resetSelection();
  }, []);

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Board />
      <Menu />
    </>
  );
}

export default Game;
