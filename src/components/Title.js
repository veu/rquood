import React from 'react';

export default function Title(props) {
    const squares = [...Array(7**2)].map((_, index) => {
        return (
            <div
                key={index}
                block="board"
                elem="square"
            ></div>
        );
    });

    return (
        <div block="board">
            <div block="board" elem="board">
                <div block="board" elem="title">Quood</div>
                {squares}
            </div>
        </div>
    );
}
