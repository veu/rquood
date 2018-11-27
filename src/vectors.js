import { curry } from "lodash-es";

export const add = ({x, y}, {x: x2, y: y2}) => ({x: x + x2, y: y + y2});

export const sub = ({x, y}, {x: x2, y: y2}) => ({x: x - x2, y: y - y2});

export const tween = ({x, y}, {x: x2, y: y2}, r) => ({x: x * r + x2 * (1 - r), y: y * r + y2 * (1 - r)});

export const rotate90 = ({x, y}, times) => times ? rotate90({x: y, y: -x}, times - 1) : {x, y};

export const rotate90Around = curry((center, v, times) => add(rotate90(sub(v, center), times), center));

export const distance = ({x, y}, {x: x2, y: y2}) => Math.hypot(x - x2, y - y2);
