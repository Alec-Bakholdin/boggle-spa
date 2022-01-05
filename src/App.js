import React from "react";
import { Switch, Route, BrowserRouter as Router,  } from "react-router-dom"
import BoggleLobby from './features/BoggleLobby/BoggleLobby';
import BoggleHome from "./features/BoggleHome/BoggleHome";
import WebsocketTest from "./features/WebsocketTest/WebsocketTest";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" children={<BoggleHome />} />
                <Route path="/game" children={<BoggleLobby />} />
                <Route path="/websocket" children={< WebsocketTest/>} />
            </Switch>
        </Router>
    );
}

export default App;
