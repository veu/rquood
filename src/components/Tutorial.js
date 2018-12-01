import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTutorialMessage } from '../state/selectors';
import { TITLE_URL } from '../config';
import Board from './Board';

function Tutorial(props) {
    return (
        <React.Fragment>
            <Board />
            <div block="menu">
                <div block="message">{props.message}</div>

                <div block="action">
                    <Link to={TITLE_URL}>Back</Link>
                </div>
            </div>
        </React.Fragment>
    );
}

export default connect(
    (state, props) => ({
        message: getTutorialMessage(state, props),
    })
)(Tutorial);
