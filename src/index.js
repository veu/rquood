import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Router } from "react-router";
import { createHashHistory } from "history";
import "pepjs";
import "normalize.css";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import Game from "./components/Game";
import Title from "./components/Title";
import Tutorial from "./components/Tutorial";
import { TITLE_URL, GAME_URL, TUTORIAL_URL, OPTIONS_URL } from "./config";
import Options from "./components/Options";

const history = createHashHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Switch>
        <Route exact path={TITLE_URL} render={() => <Title />} />
        <Route exact path={GAME_URL} render={() => <Game />} />
        <Route exact path={TUTORIAL_URL} render={() => <Tutorial />} />
        <Route exact path={OPTIONS_URL} render={() => <Options />} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
