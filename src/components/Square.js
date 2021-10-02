import React from 'react';
import { getSquare, getHues } from '../state/selectors';
import {useStore} from "../state/store";

export default function Square({index, isTutorial = false }) {
    const [hues, square] = useStore(state => [getHues(state), getSquare(isTutorial, index)(state)]);
    const style = {
        filter: `hue-rotate(${hues[square.type]}deg)`
    };

    return <button block="square" mods={square} style={style} />;
}
