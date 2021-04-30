import React from 'react';
import { useSelector, connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { getTutorialMessage } from '../state/selectors';
import { TITLE_URL } from '../config';
import Board from './Board';
import BottomMenu from './BottomMenu';

function Tutorial({ goBack }) {
    const message = useSelector(getTutorialMessage);

    return (<>
        <header>
            <h1>
                Tutorial
            </h1>
        </header>
        <main className="tutorial">
            <Board />
            <div className="menu">
                <div className="message">{message}</div>
            </div>
        </main>
        <footer>
            <BottomMenu
                left={{text: 'Back', url: TITLE_URL, back: true}}
                center={{text: 'SELECT'}}
            />
        </footer>
    </>);
}

export default connect(null, { goBack })(Tutorial);
