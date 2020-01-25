import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage';
import { Switch, Route } from 'react-router';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createHashHistory } from 'history';
import './index.css';
import * as serviceWorker from './serviceWorker';
import createReducers from './state/reducers';
import saga from './sagas';
import Game from './components/Game';
import Title from './components/Title';
import Tutorial from './components/Tutorial';
import { TITLE_URL, GAME_URL, TUTORIAL_URL, OPTIONS_URL } from './config';
import Options from './components/Options';
import CustomProperties from './components/CustomProperties';

function slicePersistedState(paths) {
    return (state) => {
        const persist = {...state};
        delete persist.selection;
        delete persist.tutorial;

        return persist;
    };
}

const sagaMiddleware = createSagaMiddleware();
const history = createHashHistory();

const store = createStore(
    createReducers(history),
    compose(
        persistState('', {slicer: slicePersistedState, key: 'quood'}),
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware
        )
    )
);

sagaMiddleware.run(saga);

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <CustomProperties>
                <Switch>
                    <Route exact path={TITLE_URL} render={() => <Title />} />
                    <Route exact path={GAME_URL} render={() => <Game />} />
                    <Route exact path={TUTORIAL_URL} render={() => <Tutorial />} />
                    <Route exact path={OPTIONS_URL} render={() => <Options />} />
                </Switch>
            </CustomProperties>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
