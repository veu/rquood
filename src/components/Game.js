import React from 'react';
import { connect } from 'react-redux';
import Board from './Board';
import Title from './Title';
import Menu from './Menu';
import { isGameActive } from '../selectors';

function Game(props) {
    return (
        <React.Fragment>
            {props.isGameActive ? <Board /> : <Title />}

            <Menu />
        </React.Fragment>
    );
}

export default connect(
    (state) => ({
        isGameActive: isGameActive(state),
    })
)(Game);
