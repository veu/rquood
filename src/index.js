import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage';
import { Switch, Route } from 'react-router';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import './index.css';
import * as serviceWorker from './serviceWorker';
import createReducers from './reducers';
import saga from './sagas';
import Game from './components/Game';
import Title from './components/Title';

function slicePersistedState(paths) {
    return (state) => {
        const persist = {...state};
        delete persist.selection;

        return persist;
    };
}

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();

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
            <Switch>
                <Route exact path="/" render={() => <Title />} />
                <Route exact path="/play" render={() => <Game />} />
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
