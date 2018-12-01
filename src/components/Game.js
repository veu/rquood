import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { requestAssureGame } from '../state/actions';
import { isGameActive } from '../state/selectors';
import Board from './Board';
import Menu from './Menu';

function Game(props) {
    useEffect(() => {
        props.requestAssureGame();
    });

    if (!props.isActive) {
        return null;
    }

    return (
        <React.Fragment>
            <Board />
            <Menu />
        </React.Fragment>
    );
}

export default connect(
    (state) => ({
        isActive: isGameActive(state),
    }),
    (dispatch) => {
        return {
            requestAssureGame: () => {
                dispatch(requestAssureGame());
            }
        }
    }
)(Game);
