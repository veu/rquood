import React from "react";
import { getSquare, getHues } from "../state/selectors";
import { useStore } from "../state/store";

export default function Square({ index }) {
  const [hues, square] = useStore((state) => [
    getHues(state),
    getSquare(index)(state),
  ]);
  const style = {
    filter: `hue-rotate(${hues[square.type]}deg)`,
  };

  const block = "square";
  const mods = Object.entries(square)
    .filter(([_, value]) => value !== false)
    .map(([name, val]) => `${block}_${name}${val === true ? "" : "_" + val}`);
  const className = [block, ...mods].join(" ");

  return <button className={className} style={style} />;
}
