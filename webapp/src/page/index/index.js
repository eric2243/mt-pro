import React from "react";
import ReactDom from "react-dom";

import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";

import { store, history } from "./store";
import Container from "./Main/Container.js";
// import Main from "./Main/Main.js";
import "../../static/rem.js";



ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            <Container />
        </Router>
    </Provider>,
    document.getElementById('root')
);
if( module.hot) {
	module.hot.accept();
}

