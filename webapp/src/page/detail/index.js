import React from "react";
import ReactDom from "react-dom";

import { Provider } from "react-redux";
import { store, history } from "./store.js";
import { HashRouter as Router } from "react-router-dom";

import Container from "./Main/Container";



ReactDom.render( 
			<Provider store = { store }>
				<Router history={history}>
					<Container />
				</Router>
			</Provider>,
		document.getElementById( "root" )
	);
// ReactDom.render( 
// 			<Provider store = { store }>
// 					<Container />
// 			</Provider>,
// 		document.getElementById( "root" )
// 	);
if( module.hot) {
	module.hot.accept();
}
