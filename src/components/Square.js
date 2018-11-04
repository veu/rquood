import React from 'react';

export default function Square(props) {
    const active = props.selection.squares.includes(props.index);

    return (
        <div
            block="board"
            elem="square"
            mods={{
                type: props.value,
                active,
                inactive: props.selection.squares.length > 0 && !active,
                hidden: props.selection.hidden && active,
                ready: props.selection.squares.length === 4 && active,
            }}>
        </div>
    );
}
