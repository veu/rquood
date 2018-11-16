import React from 'react';
import { connect } from 'react-redux';
import Board from './Board';
import Title from './Title';
import Menu from './Menu';

function Game(props) {
    return (
        <React.Fragment>
            {props.board ? <Board /> : <Title />}

            <Menu />
        </React.Fragment>
    );
}

export default connect(
    (state) => state
)(Game);
